import { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Statistics from './components/Statistics';
import { 
  getAllExpenses, 
  createExpense, 
  updateExpense, 
  deleteExpense, 
  getStats 
} from './services/api';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [stats, setStats] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExpenses();
    fetchStats();
  }, []);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const data = await getAllExpenses();
      setExpenses(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch expenses. Make sure backend is running!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await getStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  const handleAddExpense = async (expenseData) => {
    try {
      await createExpense(expenseData);
      fetchExpenses();
      fetchStats();
    } catch (err) {
      alert('Failed to add expense');
      console.error(err);
    }
  };

  const handleUpdateExpense = async (expenseData) => {
    try {
      await updateExpense(editingExpense._id, expenseData);
      setEditingExpense(null);
      fetchExpenses();
      fetchStats();
    } catch (err) {
      alert('Failed to update expense');
      console.error(err);
    }
  };

  const handleDeleteExpense = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await deleteExpense(id);
        fetchExpenses();
        fetchStats();
      } catch (err) {
        alert('Failed to delete expense');
        console.error(err);
      }
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Header */}
      <nav className="navbar navbar-dark bg-gradient py-3 mb-4 shadow-sm">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">
            <i className="bi bi-wallet2 me-2"></i>
            Expense Tracker
          </span>
          <span className="text-white">
            <i className="bi bi-person-circle me-2"></i>
            Welcome, {localStorage.getItem('username') || 'User'}
          </span>
        </div>
      </nav>

      <div className="container-fluid px-4">
        <div className="row g-4">
          {/* Left Column - Form & Stats */}
          <div className="col-lg-4">
            <ExpenseForm 
              onSubmit={editingExpense ? handleUpdateExpense : handleAddExpense}
              editingExpense={editingExpense}
              onCancel={handleCancelEdit}
            />
            <Statistics stats={stats} />
          </div>

          {/* Right Column - Expense List */}
          <div className="col-lg-8">
            <ExpenseList 
              expenses={expenses}
              onEdit={handleEdit}
              onDelete={handleDeleteExpense}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;