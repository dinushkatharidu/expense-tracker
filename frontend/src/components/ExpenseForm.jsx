import { useState, useEffect } from 'react';

const ExpenseForm = ({ onSubmit, editingExpense, onCancel }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        description: editingExpense.description,
        amount: editingExpense.amount,
        category: editingExpense.category,
        date: new Date(editingExpense.date).toISOString().split('T')[0]
      });
    }
  }, [editingExpense]);

  const categories = ['Food', 'Transport', 'Entertainment', 'Bills', 'Shopping', 'Health', 'Other'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    if (!editingExpense) {
      setFormData({
        description: '',
        amount: '',
        category: 'Food',
        date: new Date().toISOString().split('T')[0]
      });
    }
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">
          <i className={`bi ${editingExpense ? 'bi-pencil-square' : 'bi-plus-circle'} me-2`}></i>
          {editingExpense ? 'Edit Expense' : 'Add New Expense'}
        </h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              <i className="bi bi-card-text me-1"></i>
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="e.g., Lunch at cafe"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="amount" className="form-label">
              <i className="bi bi-currency-dollar me-1"></i>
              Amount
            </label>
            <input
              type="number"
              className="form-control"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              <i className="bi bi-tag me-1"></i>
              Category
            </label>
            <select
              className="form-select"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              <i className="bi bi-calendar-event me-1"></i>
              Date
            </label>
            <input
              type="date"
              className="form-control"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              <i className={`bi ${editingExpense ? 'bi-check-circle' : 'bi-plus-lg'} me-2`}></i>
              {editingExpense ? 'Update Expense' : 'Add Expense'}
            </button>
            {editingExpense && (
              <button type="button" onClick={onCancel} className="btn btn-secondary">
                <i className="bi bi-x-circle me-2"></i>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;