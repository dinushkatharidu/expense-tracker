const request = require('supertest');
const { 
  createTestApp, 
  connectTestDB, 
  disconnectTestDB, 
  clearTestData 
} = require('../test-utils/testServer');

const app = createTestApp();

// Setup: Run before all tests
beforeAll(async () => {
  await connectTestDB();
  console.log('🚀 Starting API tests...\n');
});

// Cleanup: Run after all tests
afterAll(async () => {
  await clearTestData();
  await disconnectTestDB();
  console.log('\n✅ All tests completed!');
});

// Clear data before each test
beforeEach(async () => {
  await clearTestData();
});

// ==================== TEST SUITE ====================

describe('💰 Expense Tracker API Tests', () => {

  // ========== CREATE TESTS ==========
  
  describe('POST /api/expenses - Create Expense', () => {
    
    test('✅ Should create a new expense successfully', async () => {
      // ARRANGE - Prepare test data
      const newExpense = {
        description: 'Test Lunch',
        amount: 25.50,
        category: 'Food',
        date: '2025-11-10'
      };
      
      // ACT - Make API request
      const response = await request(app)
        .post('/api/expenses')
        .send(newExpense);
      
      // ASSERT - Check response
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('_id');
      expect(response.body.description).toBe('Test Lunch');
      expect(response.body.amount).toBe(25.50);
      expect(response.body.category).toBe('Food');
      
      console.log('   ✓ Expense created with ID:', response.body._id);
    });

    test('❌ Should fail without description', async () => {
      // ARRANGE - Missing description
      const invalidExpense = {
        amount: 25.50,
        category: 'Food',
        date: '2025-11-10'
      };
      
      // ACT
      const response = await request(app)
        .post('/api/expenses')
        .send(invalidExpense);
      
      // ASSERT
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
      
      console.log('   ✓ Validation error caught:', response.body.message);
    });

    test('❌ Should fail with negative amount', async () => {
      // ARRANGE
      const invalidExpense = {
        description: 'Invalid',
        amount: -10,
        category: 'Food',
        date: '2025-11-10'
      };
      
      // ACT
      const response = await request(app)
        .post('/api/expenses')
        .send(invalidExpense);
      
      // ASSERT
      expect(response.status).toBe(400);
      
      console.log('   ✓ Negative amount rejected');
    });

    test('❌ Should fail with invalid category', async () => {
      // ARRANGE
      const invalidExpense = {
        description: 'Test',
        amount: 10,
        category: 'InvalidCategory',
        date: '2025-11-10'
      };
      
      // ACT
      const response = await request(app)
        .post('/api/expenses')
        .send(invalidExpense);
      
      // ASSERT
      expect(response.status).toBe(400);
      
      console.log('   ✓ Invalid category rejected');
    });

  });

  // ========== READ TESTS ==========
  
  describe('GET /api/expenses - Get All Expenses', () => {
    
    test('✅ Should return empty array when no expenses', async () => {
      // ACT
      const response = await request(app).get('/api/expenses');
      
      // ASSERT
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(0);
      
      console.log('   ✓ Empty array returned');
    });

    test('✅ Should return all expenses', async () => {
      // ARRANGE - Create test expenses
      const expenses = [
        { description: 'Breakfast', amount: 15, category: 'Food', date: '2025-11-10' },
        { description: 'Bus', amount: 5, category: 'Transport', date: '2025-11-10' },
        { description: 'Movie', amount: 20, category: 'Entertainment', date: '2025-11-10' }
      ];
      
      for (const expense of expenses) {
        await request(app).post('/api/expenses').send(expense);
      }
      
      // ACT
      const response = await request(app).get('/api/expenses');
      
      // ASSERT
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(3);
      
      console.log(`   ✓ Retrieved ${response.body.length} expenses`);
    });

    test('✅ Should return expenses sorted by date (newest first)', async () => {
      // ARRANGE
      await request(app).post('/api/expenses').send({
        description: 'Old', amount: 10, category: 'Food', date: '2025-11-08'
      });
      await request(app).post('/api/expenses').send({
        description: 'New', amount: 20, category: 'Food', date: '2025-11-10'
      });
      
      // ACT
      const response = await request(app).get('/api/expenses');
      
      // ASSERT
      expect(response.body[0].description).toBe('New');
      
      console.log('   ✓ Expenses sorted correctly');
    });

  });

  describe('GET /api/expenses/:id - Get Single Expense', () => {
    
    test('✅ Should return expense by ID', async () => {
      // ARRANGE - Create expense
      const createResponse = await request(app)
        .post('/api/expenses')
        .send({ description: 'Test', amount: 30, category: 'Food', date: '2025-11-10' });
      
      const expenseId = createResponse.body._id;
      
      // ACT
      const response = await request(app).get(`/api/expenses/${expenseId}`);
      
      // ASSERT
      expect(response.status).toBe(200);
      expect(response.body._id).toBe(expenseId);
      expect(response.body.description).toBe('Test');
      
      console.log('   ✓ Expense retrieved by ID');
    });

    test('❌ Should return 404 for non-existent ID', async () => {
      // ARRANGE - Fake MongoDB ObjectId
      const fakeId = '507f1f77bcf86cd799439011';
      
      // ACT
      const response = await request(app).get(`/api/expenses/${fakeId}`);
      
      // ASSERT
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Expense not found');
      
      console.log('   ✓ 404 returned for missing expense');
    });

  });

  // ========== UPDATE TESTS ==========
  
  describe('PUT /api/expenses/:id - Update Expense', () => {
    
    test('✅ Should update expense successfully', async () => {
      // ARRANGE - Create expense
      const createResponse = await request(app)
        .post('/api/expenses')
        .send({ description: 'Old Description', amount: 50, category: 'Food', date: '2025-11-10' });
      
      const expenseId = createResponse.body._id;
      
      // ACT - Update expense
      const response = await request(app)
        .put(`/api/expenses/${expenseId}`)
        .send({
          description: 'Updated Description',
          amount: 75
        });
      
      // ASSERT
      expect(response.status).toBe(200);
      expect(response.body.description).toBe('Updated Description');
      expect(response.body.amount).toBe(75);
      expect(response.body.category).toBe('Food'); // Should keep old value
      
      console.log('   ✓ Expense updated successfully');
    });

    test('✅ Should update only provided fields', async () => {
      // ARRANGE
      const createResponse = await request(app)
        .post('/api/expenses')
        .send({ description: 'Test', amount: 100, category: 'Food', date: '2025-11-10' });
      
      const expenseId = createResponse.body._id;
      
      // ACT - Update only amount
      const response = await request(app)
        .put(`/api/expenses/${expenseId}`)
        .send({ amount: 150 });
      
      // ASSERT
      expect(response.body.amount).toBe(150);
      expect(response.body.description).toBe('Test'); // Unchanged
      
      console.log('   ✓ Partial update working');
    });

    test('❌ Should return 404 for non-existent ID', async () => {
      // ARRANGE
      const fakeId = '507f1f77bcf86cd799439011';
      
      // ACT
      const response = await request(app)
        .put(`/api/expenses/${fakeId}`)
        .send({ amount: 100 });
      
      // ASSERT
      expect(response.status).toBe(404);
      
      console.log('   ✓ 404 returned for update of missing expense');
    });

  });

  // ========== DELETE TESTS ==========
  
  describe('DELETE /api/expenses/:id - Delete Expense', () => {
    
    test('✅ Should delete expense successfully', async () => {
      // ARRANGE - Create expense
      const createResponse = await request(app)
        .post('/api/expenses')
        .send({ description: 'To Delete', amount: 25, category: 'Food', date: '2025-11-10' });
      
      const expenseId = createResponse.body._id;
      
      // ACT - Delete expense
      const deleteResponse = await request(app).delete(`/api/expenses/${expenseId}`);
      
      // ASSERT
      expect(deleteResponse.status).toBe(200);
      expect(deleteResponse.body.message).toBe('Expense deleted successfully');
      
      // Verify it's deleted
      const getResponse = await request(app).get(`/api/expenses/${expenseId}`);
      expect(getResponse.status).toBe(404);
      
      console.log('   ✓ Expense deleted and verified');
    });

    test('❌ Should return 404 for non-existent ID', async () => {
      // ARRANGE
      const fakeId = '507f1f77bcf86cd799439011';
      
      // ACT
      const response = await request(app).delete(`/api/expenses/${fakeId}`);
      
      // ASSERT
      expect(response.status).toBe(404);
      
      console.log('   ✓ 404 returned for delete of missing expense');
    });

  });

  // ========== STATISTICS TESTS ==========
  
  describe('GET /api/expenses/stats/summary - Get Statistics', () => {
    
    test('✅ Should return correct statistics', async () => {
      // ARRANGE - Create multiple expenses
      await request(app).post('/api/expenses').send({
        description: 'Food 1', amount: 25, category: 'Food', date: '2025-11-10'
      });
      await request(app).post('/api/expenses').send({
        description: 'Food 2', amount: 35, category: 'Food', date: '2025-11-10'
      });
      await request(app).post('/api/expenses').send({
        description: 'Transport', amount: 40, category: 'Transport', date: '2025-11-10'
      });
      
      // ACT
      const response = await request(app).get('/api/expenses/stats/summary');
      
      // ASSERT
      expect(response.status).toBe(200);
      expect(response.body.total).toBe('100.00');
      expect(response.body.count).toBe(3);
      expect(response.body.byCategory.Food).toBe(60);
      expect(response.body.byCategory.Transport).toBe(40);
      
      console.log('   ✓ Statistics calculated correctly');
      console.log('     Total:', response.body.total);
      console.log('     Count:', response.body.count);
    });

    test('✅ Should return zero stats when no expenses', async () => {
      // ACT
      const response = await request(app).get('/api/expenses/stats/summary');
      
      // ASSERT
      expect(response.status).toBe(200);
      expect(response.body.total).toBe('0.00');
      expect(response.body.count).toBe(0);
      
      console.log('   ✓ Zero stats for empty database');
    });

  });

  // ========== INTEGRATION TESTS ==========
  
  describe('🔄 Full CRUD Flow', () => {
    
    test('✅ Complete lifecycle: Create → Read → Update → Delete', async () => {
      console.log('\n   🔄 Testing complete CRUD flow...');
      
      // 1. CREATE
      const createResponse = await request(app)
        .post('/api/expenses')
        .send({ description: 'Flow Test', amount: 100, category: 'Food', date: '2025-11-10' });
      
      expect(createResponse.status).toBe(201);
      const expenseId = createResponse.body._id;
      console.log('     1. ✓ Created expense:', expenseId);
      
      // 2. READ
      const readResponse = await request(app).get(`/api/expenses/${expenseId}`);
      expect(readResponse.status).toBe(200);
      expect(readResponse.body.description).toBe('Flow Test');
      console.log('     2. ✓ Read expense');
      
      // 3. UPDATE
      const updateResponse = await request(app)
        .put(`/api/expenses/${expenseId}`)
        .send({ description: 'Updated Flow Test', amount: 150 });
      
      expect(updateResponse.status).toBe(200);
      expect(updateResponse.body.description).toBe('Updated Flow Test');
      expect(updateResponse.body.amount).toBe(150);
      console.log('     3. ✓ Updated expense');
      
      // 4. DELETE
      const deleteResponse = await request(app).delete(`/api/expenses/${expenseId}`);
      expect(deleteResponse.status).toBe(200);
      console.log('     4. ✓ Deleted expense');
      
      // 5. VERIFY DELETION
      const verifyResponse = await request(app).get(`/api/expenses/${expenseId}`);
      expect(verifyResponse.status).toBe(404);
      console.log('     5. ✓ Verified deletion\n');
    });

  });

});