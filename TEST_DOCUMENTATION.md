# 🧪 Test Documentation - Expense Tracker

Comprehensive testing documentation for the Expense Tracker MERN application.

---

## 📊 Test Summary

| Component | Tests | Status | Coverage |
|-----------|-------|--------|----------|
| **Backend API** | 17 | ✅ Passing | 92.5% |
| **ExpenseForm** | 22 | ✅ Passing | 95.8% |
| **ExpenseList** | 21 | ✅ Passing | 98.2% |
| **Statistics** | 29 | ✅ Passing | 100% |
| **TOTAL** | **89** | **✅ All Passing** | **94.2%** |

**Test Quality Metrics:**
- Total Test Cases: 89
- Passing: 89 (100%)
- Failing: 0 (0%)
- Code Coverage: 94.2%
- Last Run: November 10, 2025
- Test Runner: Vitest (Frontend), Jest (Backend)

---

## 🎯 Testing Strategy

### Test Pyramid

```
        /\
       /  \
      / E2E \         (Future: 5 tests)
     /______\
    /        \
   / API/INT  \       (17 tests)
  /__________\
 /            \
/ UNIT TESTS  \      (72 tests)
/______________\
```

**Current Focus:**
- ✅ Unit Tests: 72 tests (Frontend components)
- ✅ Integration Tests: 17 tests (API endpoints)
- 🔄 E2E Tests: Planned for future

---

## 🔧 Backend Tests (17 Tests)

### Test Suite: API Routes (`backend/__tests__/api.test.js`)

#### 1. CREATE Operations (4 tests)

| Test | Description | Status |
|------|-------------|--------|
| ✅ | Should create a new expense successfully | Passing |
| ✅ | Should fail without required description | Passing |
| ✅ | Should fail with negative amount | Passing |
| ✅ | Should fail with invalid category | Passing |

**Example Test:**
```javascript
test('POST /api/expenses - should create expense', async () => {
  const newExpense = {
    description: 'API Test Lunch',
    amount: 35.75,
    category: 'Food',
    date: '2025-11-10'
  };
  
  const response = await request(app)
    .post('/api/expenses')
    .send(newExpense);
  
  expect(response.status).toBe(201);
  expect(response.body.description).toBe('API Test Lunch');
});
```

#### 2. READ Operations (5 tests)

| Test | Description | Status |
|------|-------------|--------|
| ✅ | Should return empty array when no expenses | Passing |
| ✅ | Should return all expenses | Passing |
| ✅ | Should return expenses sorted by date (newest first) | Passing |
| ✅ | Should return single expense by ID | Passing |
| ✅ | Should return 404 for non-existent ID | Passing |

#### 3. UPDATE Operations (3 tests)

| Test | Description | Status |
|------|-------------|--------|
| ✅ | Should update expense successfully | Passing |
| ✅ | Should update only provided fields | Passing |
| ✅ | Should return 404 for non-existent ID | Passing |

#### 4. DELETE Operations (2 tests)

| Test | Description | Status |
|------|-------------|--------|
| ✅ | Should delete expense successfully | Passing |
| ✅ | Should return 404 for non-existent ID | Passing |

#### 5. STATISTICS Operations (2 tests)

| Test | Description | Status |
|------|-------------|--------|
| ✅ | Should return correct statistics | Passing |
| ✅ | Should return zero stats when no expenses | Passing |

#### 6. INTEGRATION Tests (1 test)

| Test | Description | Status |
|------|-------------|--------|
| ✅ | Complete lifecycle: Create → Read → Update → Delete | Passing |

---

## 🎨 Frontend Tests (72 Tests)

### Test Suite 1: ExpenseForm Component (22 tests)

**File:** `frontend/src/components/__tests__/ExpenseForm.test.jsx`

#### Rendering Tests (3 tests)

| Test | Description | Status |
|------|-------------|--------|
| ✅ | Should render all form fields | Passing |
| ✅ | Should show "Add New Expense" title by default | Passing |
| ✅ | Should show "Add Expense" button by default | Passing |

#### Input Tests (5 tests)

| Test | Description | Status |
|------|-------------|--------|
| ✅ | Should accept text input in description field | Passing |
| ✅ | Should accept numeric input in amount field | Passing |
| ✅ | Should allow selecting different categories | Passing |
| ✅ | Should allow selecting a date | Passing |
| ✅ | Should have Food as default category | Passing |

#### Form Submission Tests (3 tests)

| Test | Description | Status |
|------|-------------|--------|
| ✅ | Should call onSubmit with form data when submitted | Passing |
| ✅ | Should clear form fields after successful submission | Passing |
| ✅ | Should not clear form when in edit mode | Passing |

#### Edit Mode Tests (4 tests)

| Test | Description | Status |
|------|-------------|--------|
| ✅ | Should show "Edit Expense" title when editing | Passing |
| ✅ | Should show "Update Expense" button when editing | Passing |
| ✅ | Should populate fields with editing expense data | Passing |
| ✅ | Should update fields when editingExpense prop changes | Passing |

#### Cancel Button Tests (3 tests)

| Test | Description | Status |
|------|-------------|--------|
| ✅ | Should show cancel button in edit mode | Passing |
| ✅ | Should NOT show cancel button in add mode | Passing |
| ✅ | Should call onCancel when cancel button is clicked | Passing |

#### Edge Cases (4 tests)

| Test | Description | Status |
|------|-------------|--------|
| ✅ | Should have all category options available | Passing |
| ✅ | Should handle empty form submission | Passing |
| ✅ | Should handle special characters in description | Passing |
| ✅ | Should handle decimal amounts | Passing |

---

### Test Suite 2: ExpenseList Component (21 tests)

**File:** `frontend/src/components/__tests__/ExpenseList.test.jsx`

#### Empty State Tests (3 tests)

| Test | Description | Status |
|------|-------------|--------|
| ✅ | Should show empty state message when no expenses | Passing |
| ✅ | Should show helpful message in empty state | Passing |
| ✅ | Should render card with header even when empty | Passing |

#### Rendering Tests (4 tests)

| Test | Description | Status |
|------|-------------|--------|
| ✅ | Should display all expenses from props | Passing |
| ✅ | Should display expense amounts correctly | Passing |
| ✅ | Should format amounts with two decimal places | Passing |
| ✅ | Should show category badges for each expense | Passing |

#### Date Formatting Tests (2 tests)

| Test | Description | Status |
|------|-------------|--------|
| ✅ | Should format dates correctly | Passing |
| ✅ | Should format different dates correctly | Passing |

#### Button Tests (4 tests)

| Test | Description | Status |
|------|-------------|--------|
| ✅ | Should call onEdit with expense data when edit button clicked | Passing |
| ✅ | Should have edit button for each expense | Passing |
| ✅ | Should call onDelete with expense ID when delete button clicked | Passing |
| ✅ | Should have delete button for each expense | Passing |

#### Edge Cases (8 tests)

| Test | Description | Status |
|------|-------------|--------|
| ✅ | Should show correct expense count in header | Passing |
| ✅ | Should call onDelete with correct ID for multiple expenses | Passing |
| ✅ | Should render large list of expenses correctly | Passing |
| ✅ | Should handle expenses with long descriptions | Passing |
| ✅ | Should handle expenses with zero amount | Passing |
| ✅ | Should handle expenses with large amounts | Passing |
| ✅ | Should handle special characters in description | Passing |
| ✅ | Should display all category types correctly | Passing |

---

### Test Suite 3: Statistics Component (29 tests)

**File:** `frontend/src/components/__tests__/Statistics.test.jsx`

#### Loading State Tests (2 tests)

| Test | Description | Status |
|------|-------------|--------|
| ✅ | Should show loading spinner when stats is null | Passing |
| ✅ | Should show loading spinner when stats is undefined | Passing |

#### Total Amount Tests (4 tests)

| Test | Description | Status |
|------|-------------|--------|
| ✅ | Should display total amount correctly | Passing |
| ✅ | Should display zero total when no expenses | Passing |
| ✅ | Should display large amounts correctly | Passing |
| ✅ | Should display "Total Spent" label | Passing |

#### Transaction Count Tests (4 tests)

| Test | Description | Status |
|------|-------------|--------|
| ✅ | Should display transaction count | Passing |
| ✅ | Should display zero transactions | Passing |
| ✅ | Should display one transaction | Passing |
| ✅ | Should display large transaction count | Passing |

#### Category Breakdown Tests (6 tests)

| Test | Description | Status |
|------|-------------|--------|
| ✅ | Should show "No expenses yet" when no categories | Passing |
| ✅ | Should show "By Category" header even when empty | Passing |
| ✅ | Should display single category correctly | Passing |
| ✅ | Should display multiple categories | Passing |
| ✅ | Should display all possible categories | Passing |
| ✅ | Should format category amounts with two decimals | Passing |

#### Percentage Tests (5 tests)

| Test | Description | Status |
|------|-------------|--------|
| ✅ | Should calculate and display percentages correctly | Passing |
| ✅ | Should show 100% for single category | Passing |
| ✅ | Should handle small percentages | Passing |
| ✅ | Should round percentages to one decimal place | Passing |
| ✅ | Should handle uneven percentage distribution | Passing |

#### Edge Cases Tests (6 tests)

| Test | Description | Status |
|------|-------------|--------|
| ✅ | Should render progress bars for categories | Passing |
| ✅ | Should handle very small amounts | Passing |
| ✅ | Should handle category with zero amount | Passing |
| ✅ | Should handle many categories with small amounts | Passing |
| ✅ | Should handle stats object with missing properties gracefully | Passing |
| ✅ | Should display category icons/dots | Passing |

#### Accessibility Tests (2 tests)

| Test | Description | Status |
|------|-------------|--------|
| ✅ | Should display "Summary" header | Passing |
| ✅ | Should have proper structure for accessibility | Passing |

---

## 🏃 Running Tests

### Backend Tests

```bash
# Navigate to backend
cd backend

# Run all tests once
npm run test:once

# Run tests in watch mode
npm test

# Run with coverage report
npm run test:coverage
```

**Expected Output:**
```
 PASS  __tests__/api.test.js
  💰 Expense Tracker API Tests
    POST /api/expenses - Create Expense
      ✓ Should create a new expense successfully (145ms)
      ✓ Should fail without description (89ms)
      ✓ Should fail with negative amount (75ms)
      ✓ Should fail with invalid category (82ms)
    ...

Test Suites: 1 passed, 1 total
Tests:       17 passed, 17 total
Time:        3.456s
```

### Frontend Tests

```bash
# Navigate to frontend
cd frontend

# Run all tests once
npm run test:run

# Run tests in watch mode
npm test

# Run with UI
npm run test:ui

# Run with coverage
npm run test:coverage
```

**Expected Output:**
```
 ✓ src/components/__tests__/ExpenseForm.test.jsx (22 tests)
 ✓ src/components/__tests__/ExpenseList.test.jsx (21 tests)
 ✓ src/components/__tests__/Statistics.test.jsx (29 tests)

 Test Files  3 passed (3)
      Tests  72 passed (72)
   Duration  8.24s
```

---

## 📈 Coverage Report

### Backend Coverage

```
----------------------|---------|----------|---------|---------|
File                  | % Stmts | % Branch | % Funcs | % Lines |
----------------------|---------|----------|---------|---------|
All files             |   92.5  |   85.7   |   100   |   91.8  |
 models               |   100   |   100    |   100   |   100   |
  Expense.js          |   100   |   100    |   100   |   100   |
 routes               |   90.2  |   82.3   |   100   |   89.5  |
  expenses.js         |   90.2  |   82.3   |   100   |   89.5  |
----------------------|---------|----------|---------|---------|
```

### Frontend Coverage

```
----------------------|---------|----------|---------|---------|
File                  | % Stmts | % Branch | % Funcs | % Lines |
----------------------|---------|----------|---------|---------|
All files             |   96.1  |   91.3   |   100   |   95.8  |
 components           |   95.8  |   90.5   |   100   |   95.2  |
  ExpenseForm.jsx     |   95.8  |   88.9   |   100   |   95.2  |
  ExpenseList.jsx     |   98.2  |   92.3   |   100   |   98.0  |
  Statistics.jsx      |   100   |   100    |   100   |   100   |
 services             |   100   |   100    |   100   |   100   |
  api.js              |   100   |   100    |   100   |   100   |
----------------------|---------|----------|---------|---------|
```

**Overall Coverage: 94.2%** ✅ (Exceeds 80% industry standard)

---

## 🔍 Test Tools & Libraries

### Backend Testing Stack

```json
{
  "jest": "^29.7.0",
  "supertest": "^6.3.3",
  "mongodb-memory-server": "^9.1.3"
}
```

**Purpose:**
- **Jest**: Testing framework for Node.js
- **Supertest**: HTTP assertion library
- **MongoDB Memory Server**: In-memory database for testing

### Frontend Testing Stack

```json
{
  "vitest": "^4.0.8",
  "@testing-library/react": "^14.1.2",
  "@testing-library/jest-dom": "^6.1.5",
  "@testing-library/user-event": "^14.5.1",
  "jsdom": "^23.0.1"
}
```

**Purpose:**
- **Vitest**: Fast unit test framework for Vite
- **React Testing Library**: Test React components
- **Jest-DOM**: Custom matchers for DOM elements
- **User Event**: Simulate user interactions
- **jsdom**: DOM implementation for Node.js

---

## 🎯 Test Patterns Used

### 1. AAA Pattern (Arrange-Act-Assert)

```javascript
test('example test', () => {
  // ARRANGE - Set up test data
  const input = 'test data';
  
  // ACT - Perform action
  const result = myFunction(input);
  
  // ASSERT - Verify result
  expect(result).toBe('expected output');
});
```

### 2. Given-When-Then Pattern

```javascript
test('should calculate total when expenses exist', () => {
  // GIVEN - Initial state
  const expenses = [{ amount: 10 }, { amount: 20 }];
  
  // WHEN - Action occurs
  const total = calculateTotal(expenses);
  
  // THEN - Expected outcome
  expect(total).toBe(30);
});
```

### 3. Test Isolation

Each test is independent and doesn't rely on other tests:

```javascript
beforeEach(() => {
  // Reset state before each test
  vi.clearAllMocks();
});

afterEach(() => {
  // Clean up after each test
  cleanup();
});
```

---

## 🐛 Common Test Scenarios

### Testing Form Submission

```javascript
test('should submit form with valid data', async () => {
  const user = userEvent.setup();
  const mockSubmit = vi.fn();
  
  render(<ExpenseForm onSubmit={mockSubmit} />);
  
  await user.type(screen.getByLabelText(/description/i), 'Lunch');
  await user.type(screen.getByLabelText(/amount/i), '25.50');
  await user.click(screen.getByRole('button', { name: /add/i }));
  
  expect(mockSubmit).toHaveBeenCalledTimes(1);
});
```

### Testing API Calls

```javascript
test('should create expense via API', async () => {
  const newExpense = {
    description: 'Test',
    amount: 100,
    category: 'Food',
    date: '2025-11-10'
  };
  
  const response = await request(app)
    .post('/api/expenses')
    .send(newExpense);
  
  expect(response.status).toBe(201);
  expect(response.body).toHaveProperty('_id');
});
```

### Testing Conditional Rendering

```javascript
test('should show empty state when no data', () => {
  render(<ExpenseList expenses={[]} />);
  expect(screen.getByText(/no expenses yet/i)).toBeInTheDocument();
});

test('should show list when data exists', () => {
  const expenses = [{ _id: '1', description: 'Test', amount: 10 }];
  render(<ExpenseList expenses={expenses} />);
  expect(screen.getByText('Test')).toBeInTheDocument();
});
```

---

## 📝 Testing Best Practices

### ✅ DO's

1. **Write descriptive test names**
   ```javascript
   ✅ test('should display error message when amount is negative')
   ❌ test('test1')
   ```

2. **Test user behavior, not implementation**
   ```javascript
   ✅ expect(screen.getByText('$25.50')).toBeInTheDocument()
   ❌ expect(component.state.amount).toBe(25.50)
   ```

3. **Keep tests isolated**
   ```javascript
   ✅ Each test clears mocks and resets state
   ❌ Tests depend on execution order
   ```

4. **Test edge cases**
   ```javascript
   ✅ Test empty strings, null, undefined, negative numbers
   ❌ Only test happy path
   ```

5. **Use meaningful assertions**
   ```javascript
   ✅ expect(response.status).toBe(201)
   ❌ expect(response).toBeTruthy()
   ```

### ❌ DON'Ts

1. **Don't test third-party libraries**
2. **Don't make tests dependent on each other**
3. **Don't test implementation details**
4. **Don't use timeouts unless necessary**
5. **Don't skip writing tests for new features**

---

## 🔄 Continuous Integration

### GitHub Actions Workflow (Example)

```yaml
name: Run Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install Backend Dependencies
        run: cd backend && npm install
      
      - name: Run Backend Tests
        run: cd backend && npm run test:once
      
      - name: Install Frontend Dependencies
        run: cd frontend && npm install
      
      - name: Run Frontend Tests
        run: cd frontend && npm run test:run
      
      - name: Upload Coverage
        uses: codecov/codecov-action@v3
```

---

## 📊 Test Metrics

### Quality Indicators

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Code Coverage | ≥80% | 94.2% | ✅ Excellent |
| Test Pass Rate | 100% | 100% | ✅ Perfect |
| Test Execution Time | <15s | 12s | ✅ Fast |
| Flaky Tests | 0 | 0 | ✅ Stable |

### Test Distribution

```
Backend Tests:  19% (17 tests)
Frontend Tests: 81% (72 tests)
───────────────────────────────
Total:         100% (89 tests)
```

---

## 🚀 Future Testing Plans

### Planned Test Additions

1. **E2E Tests (Cypress/Playwright)**
   - Complete user workflows
   - Cross-browser testing
   - Mobile responsive tests

2. **Performance Tests**
   - Load testing (1000+ expenses)
   - API response time tests
   - Memory leak detection

3. **Accessibility Tests**
   - WCAG 2.1 compliance
   - Screen reader compatibility
   - Keyboard navigation

4. **Security Tests**
   - Input sanitization
   - SQL injection prevention
   - XSS attack prevention

---

## 📚 Resources

### Documentation

- [Jest Documentation](https://jestjs.io/)
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://testingjavascript.com/)

### Tutorials

- [Kent C. Dodds - Testing JavaScript](https://testingjavascript.com/)
- [Official React Testing Docs](https://reactjs.org/docs/testing.html)
- [Node.js Testing Best Practices](https://github.com/goldbergyoni/nodebestpractices#8-testing-and-overall-quality-practices)

---

## 👤 Test Author

**Dinushka Tharidu**
- GitHub: [@dinushkatharidu](https://github.com/dinushkatharidu)
- Email: asdinushkatharidu@gmail.com

---

## 📄 License

This test documentation is part of the Expense Tracker project and is licensed under the MIT License.

---

**Last Updated:** November 10, 2025
**Test Framework Versions:** Jest 29.7.0, Vitest 4.0.8
**Node Version:** 18.x
**Test Status:** ✅ All Passing (89/89)

---

