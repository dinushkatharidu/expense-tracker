const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const expenseRoutes = require('../routes/expenses');

// Create test app
const createTestApp = () => {
  const app = express();
  
  // Middleware
  app.use(cors());
  app.use(express.json());
  
  // Routes
  app.use('/api/expenses', expenseRoutes);
  
  return app;
};

// Connect to MongoDB (test database)
const connectTestDB = async () => {
  try {
    // Use a separate test database
    const testDbUri = process.env.MONGODB_URI.replace('expenseTracker', 'expenseTracker_test');
    await mongoose.connect(testDbUri);
    console.log('✅ Connected to TEST database');
  } catch (error) {
    console.error('❌ Test DB connection error:', error);
    throw error;
  }
};

// Disconnect from MongoDB
const disconnectTestDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('✅ Disconnected from TEST database');
  } catch (error) {
    console.error('❌ Test DB disconnect error:', error);
  }
};

// Clear all test data
const clearTestData = async () => {
  try {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
    console.log('✅ Test data cleared');
  } catch (error) {
    console.error('❌ Error clearing test data:', error);
  }
};

module.exports = {
  createTestApp,
  connectTestDB,
  disconnectTestDB,
  clearTestData
};