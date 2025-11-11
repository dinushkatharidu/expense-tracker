import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import ExpenseForm from '../ExpenseForm';

describe('ExpenseForm Component', () => {
  
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ========== RENDERING TESTS ==========
  
  test('should render all form fields', () => {
    render(<ExpenseForm onSubmit={vi.fn()} />);
    
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add expense/i })).toBeInTheDocument();
  });

  test('should show "Add New Expense" title by default', () => {
    render(<ExpenseForm onSubmit={vi.fn()} />);
    expect(screen.getByText(/add new expense/i)).toBeInTheDocument();
  });

  test('should show "Add Expense" button by default', () => {
    render(<ExpenseForm onSubmit={vi.fn()} />);
    expect(screen.getByRole('button', { name: /add expense/i })).toBeInTheDocument();
  });

  // ========== INPUT TESTS ==========
  
  test('should accept text input in description field', async () => {
    const user = userEvent.setup();
    render(<ExpenseForm onSubmit={vi.fn()} />);
    
    const descriptionInput = screen.getByLabelText(/description/i);
    await user.type(descriptionInput, 'Coffee and breakfast');
    
    expect(descriptionInput).toHaveValue('Coffee and breakfast');
  });

  test('should accept numeric input in amount field', async () => {
    const user = userEvent.setup();
    render(<ExpenseForm onSubmit={vi.fn()} />);
    
    const amountInput = screen.getByLabelText(/amount/i);
    await user.type(amountInput, '45.75');
    
    expect(amountInput).toHaveValue(45.75);
  });

  test('should allow selecting different categories', async () => {
    const user = userEvent.setup();
    render(<ExpenseForm onSubmit={vi.fn()} />);
    
    const categorySelect = screen.getByLabelText(/category/i);
    
    await user.selectOptions(categorySelect, 'Transport');
    expect(categorySelect).toHaveValue('Transport');
    
    await user.selectOptions(categorySelect, 'Entertainment');
    expect(categorySelect).toHaveValue('Entertainment');
  });

  test('should allow selecting a date', async () => {
    const user = userEvent.setup();
    render(<ExpenseForm onSubmit={vi.fn()} />);
    
    const dateInput = screen.getByLabelText(/date/i);
    await user.clear(dateInput);
    await user.type(dateInput, '2025-11-10');
    
    expect(dateInput).toHaveValue('2025-11-10');
  });

  test('should have Food as default category', () => {
    render(<ExpenseForm onSubmit={vi.fn()} />);
    
    const categorySelect = screen.getByLabelText(/category/i);
    expect(categorySelect).toHaveValue('Food');
  });

  // ========== FORM SUBMISSION TESTS ==========
  
  test('should call onSubmit with form data when submitted', async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn();
    render(<ExpenseForm onSubmit={mockSubmit} />);
    
    await user.type(screen.getByLabelText(/description/i), 'Lunch at restaurant');
    await user.type(screen.getByLabelText(/amount/i), '35.50');
    await user.selectOptions(screen.getByLabelText(/category/i), 'Food');
    
    const submitButton = screen.getByRole('button', { name: /add expense/i });
    await user.click(submitButton);
    
    expect(mockSubmit).toHaveBeenCalledTimes(1);
    
    const callArgs = mockSubmit.mock.calls[0][0];
    expect(callArgs.description).toBe('Lunch at restaurant');
    expect(callArgs.category).toBe('Food');
    expect(parseFloat(callArgs.amount)).toBe(35.5);
    expect(callArgs.date).toBeDefined();
  });

  test('should clear form fields after successful submission', async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn();
    render(<ExpenseForm onSubmit={mockSubmit} />);
    
    const descriptionInput = screen.getByLabelText(/description/i);
    const amountInput = screen.getByLabelText(/amount/i);
    
    await user.type(descriptionInput, 'Test Expense');
    await user.type(amountInput, '50');
    
    await user.click(screen.getByRole('button', { name: /add expense/i }));
    
    await waitFor(() => {
      expect(descriptionInput).toHaveValue('');
      expect(amountInput).toHaveValue(null);
    });
  });

  test('should not clear form when in edit mode', async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn();
    const editingExpense = {
      _id: '123',
      description: 'Old Expense',
      amount: 100,
      category: 'Food',
      date: '2025-11-10'
    };
    
    render(<ExpenseForm onSubmit={mockSubmit} editingExpense={editingExpense} />);
    
    const descriptionInput = screen.getByLabelText(/description/i);
    
    await user.click(screen.getByRole('button', { name: /update expense/i }));
    
    expect(descriptionInput).toHaveValue('Old Expense');
  });

  // ========== EDIT MODE TESTS ==========
  
  test('should show "Edit Expense" title when editing', () => {
    const editingExpense = {
      _id: '123',
      description: 'Old Expense',
      amount: 100,
      category: 'Food',
      date: '2025-11-10'
    };
    
    render(<ExpenseForm onSubmit={vi.fn()} editingExpense={editingExpense} />);
    expect(screen.getByText(/edit expense/i)).toBeInTheDocument();
  });

  test('should show "Update Expense" button when editing', () => {
    const editingExpense = {
      _id: '123',
      description: 'Old Expense',
      amount: 100,
      category: 'Food',
      date: '2025-11-10'
    };
    
    render(<ExpenseForm onSubmit={vi.fn()} editingExpense={editingExpense} />);
    expect(screen.getByRole('button', { name: /update expense/i })).toBeInTheDocument();
  });

  test('should populate fields with editing expense data', () => {
    const editingExpense = {
      _id: '123',
      description: 'Pizza Delivery',
      amount: 45.99,
      category: 'Food',
      date: '2025-11-10'
    };
    
    render(<ExpenseForm onSubmit={vi.fn()} editingExpense={editingExpense} />);
    
    expect(screen.getByLabelText(/description/i)).toHaveValue('Pizza Delivery');
    expect(screen.getByLabelText(/amount/i)).toHaveValue(45.99);
    expect(screen.getByLabelText(/category/i)).toHaveValue('Food');
  });

  test('should update fields when editingExpense prop changes', () => {
    const { rerender } = render(<ExpenseForm onSubmit={vi.fn()} />);
    
    expect(screen.getByLabelText(/description/i)).toHaveValue('');
    
    const editingExpense = {
      _id: '456',
      description: 'Updated Expense',
      amount: 75,
      category: 'Transport',
      date: '2025-11-10'
    };
    
    rerender(<ExpenseForm onSubmit={vi.fn()} editingExpense={editingExpense} />);
    
    expect(screen.getByLabelText(/description/i)).toHaveValue('Updated Expense');
    expect(screen.getByLabelText(/amount/i)).toHaveValue(75);
    expect(screen.getByLabelText(/category/i)).toHaveValue('Transport');
  });

  // ========== CANCEL BUTTON TESTS ==========
  
  test('should show cancel button in edit mode', () => {
    const editingExpense = {
      _id: '123',
      description: 'Test',
      amount: 10,
      category: 'Food',
      date: '2025-11-10'
    };
    
    render(
      <ExpenseForm 
        onSubmit={vi.fn()} 
        editingExpense={editingExpense}
        onCancel={vi.fn()}
      />
    );
    
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  test('should NOT show cancel button in add mode', () => {
    render(<ExpenseForm onSubmit={vi.fn()} />);
    expect(screen.queryByRole('button', { name: /cancel/i })).not.toBeInTheDocument();
  });

  test('should call onCancel when cancel button is clicked', async () => {
    const user = userEvent.setup();
    const mockCancel = vi.fn();
    const editingExpense = {
      _id: '123',
      description: 'Test',
      amount: 10,
      category: 'Food',
      date: '2025-11-10'
    };
    
    render(
      <ExpenseForm 
        onSubmit={vi.fn()} 
        editingExpense={editingExpense}
        onCancel={mockCancel}
      />
    );
    
    await user.click(screen.getByRole('button', { name: /cancel/i }));
    expect(mockCancel).toHaveBeenCalledTimes(1);
  });

  // ========== CATEGORY OPTIONS TESTS ==========
  
  test('should have all category options available', () => {
    render(<ExpenseForm onSubmit={vi.fn()} />);
    
    const categorySelect = screen.getByLabelText(/category/i);
    const options = Array.from(categorySelect.options).map(option => option.value);
    
    expect(options).toContain('Food');
    expect(options).toContain('Transport');
    expect(options).toContain('Entertainment');
    expect(options).toContain('Bills');
    expect(options).toContain('Shopping');
    expect(options).toContain('Health');
    expect(options).toContain('Other');
  });

  // ========== EDGE CASES ==========
  
  test('should handle empty form submission', async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn();
    render(<ExpenseForm onSubmit={mockSubmit} />);
    
    await user.click(screen.getByRole('button', { name: /add expense/i }));
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  test('should handle special characters in description', async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn();
    render(<ExpenseForm onSubmit={mockSubmit} />);
    
    await user.type(screen.getByLabelText(/description/i), 'Café & Restaurant $$$');
    await user.type(screen.getByLabelText(/amount/i), '25');
    await user.click(screen.getByRole('button', { name: /add expense/i }));
    
    expect(mockSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        description: 'Café & Restaurant $$$'
      })
    );
  });

  test('should handle decimal amounts', async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn();
    render(<ExpenseForm onSubmit={mockSubmit} />);
    
    await user.type(screen.getByLabelText(/description/i), 'Test');
    await user.type(screen.getByLabelText(/amount/i), '99.99');
    await user.click(screen.getByRole('button', { name: /add expense/i }));
    
    const callArgs = mockSubmit.mock.calls[0][0];
    expect(parseFloat(callArgs.amount)).toBe(99.99);
  });

});