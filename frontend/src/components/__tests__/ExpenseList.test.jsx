import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import ExpenseList from '../ExpenseList';

describe('ExpenseList Component', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ========== EMPTY STATE TESTS ==========
  
  test('should show empty state message when no expenses', () => {
    render(<ExpenseList expenses={[]} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText(/no expenses yet/i)).toBeInTheDocument();
  });

  test('should show helpful message in empty state', () => {
    render(<ExpenseList expenses={[]} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText(/add your first expense/i)).toBeInTheDocument();
  });

  test('should render card with header even when empty', () => {
    render(<ExpenseList expenses={[]} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText(/your expenses/i)).toBeInTheDocument();
  });

  // ========== RENDERING TESTS ==========
  
  test('should display all expenses from props', () => {
    const mockExpenses = [
      {
        _id: '1',
        description: 'Breakfast',
        amount: 12.50,
        category: 'Food',
        date: '2025-11-10T00:00:00.000Z'
      },
      {
        _id: '2',
        description: 'Bus Ticket',
        amount: 5.00,
        category: 'Transport',
        date: '2025-11-10T00:00:00.000Z'
      },
      {
        _id: '3',
        description: 'Movie',
        amount: 15.00,
        category: 'Entertainment',
        date: '2025-11-10T00:00:00.000Z'
      }
    ];
    
    render(<ExpenseList expenses={mockExpenses} onEdit={vi.fn()} onDelete={vi.fn()} />);
    
    expect(screen.getByText('Breakfast')).toBeInTheDocument();
    expect(screen.getByText('Bus Ticket')).toBeInTheDocument();
    expect(screen.getByText('Movie')).toBeInTheDocument();
  });

  test('should display expense amounts correctly', () => {
    const mockExpenses = [
      {
        _id: '1',
        description: 'Lunch',
        amount: 25.50,
        category: 'Food',
        date: '2025-11-10'
      }
    ];
    
    render(<ExpenseList expenses={mockExpenses} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('$25.50')).toBeInTheDocument();
  });

  test('should format amounts with two decimal places', () => {
    const mockExpenses = [
      {
        _id: '1',
        description: 'Test',
        amount: 10,
        category: 'Food',
        date: '2025-11-10'
      }
    ];
    
    render(<ExpenseList expenses={mockExpenses} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('$10.00')).toBeInTheDocument();
  });

  // ========== CATEGORY TESTS ==========
  
  test('should show category badges for each expense', () => {
    const mockExpenses = [
      {
        _id: '1',
        description: 'Lunch',
        amount: 25,
        category: 'Food',
        date: '2025-11-10'
      },
      {
        _id: '2',
        description: 'Taxi',
        amount: 15,
        category: 'Transport',
        date: '2025-11-10'
      }
    ];
    
    render(<ExpenseList expenses={mockExpenses} onEdit={vi.fn()} onDelete={vi.fn()} />);
    
    expect(screen.getByText('Food')).toBeInTheDocument();
    expect(screen.getByText('Transport')).toBeInTheDocument();
  });

  test('should display all category types correctly', () => {
    const mockExpenses = [
      { _id: '1', description: 'A', amount: 10, category: 'Food', date: '2025-11-10' },
      { _id: '2', description: 'B', amount: 10, category: 'Transport', date: '2025-11-10' },
      { _id: '3', description: 'C', amount: 10, category: 'Entertainment', date: '2025-11-10' },
      { _id: '4', description: 'D', amount: 10, category: 'Bills', date: '2025-11-10' },
      { _id: '5', description: 'E', amount: 10, category: 'Shopping', date: '2025-11-10' },
      { _id: '6', description: 'F', amount: 10, category: 'Health', date: '2025-11-10' },
      { _id: '7', description: 'G', amount: 10, category: 'Other', date: '2025-11-10' }
    ];
    
    render(<ExpenseList expenses={mockExpenses} onEdit={vi.fn()} onDelete={vi.fn()} />);
    
    expect(screen.getByText('Food')).toBeInTheDocument();
    expect(screen.getByText('Transport')).toBeInTheDocument();
    expect(screen.getByText('Entertainment')).toBeInTheDocument();
    expect(screen.getByText('Bills')).toBeInTheDocument();
    expect(screen.getByText('Shopping')).toBeInTheDocument();
    expect(screen.getByText('Health')).toBeInTheDocument();
    expect(screen.getByText('Other')).toBeInTheDocument();
  });

  // ========== COUNT TESTS ==========
  
  test('should show correct expense count in header', () => {
    const mockExpenses = [
      { _id: '1', description: 'A', amount: 10, category: 'Food', date: '2025-11-10' },
      { _id: '2', description: 'B', amount: 20, category: 'Food', date: '2025-11-10' },
      { _id: '3', description: 'C', amount: 30, category: 'Food', date: '2025-11-10' }
    ];
    
    render(<ExpenseList expenses={mockExpenses} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('3 items')).toBeInTheDocument();
  });

  // ========== DATE FORMATTING TESTS ==========
  
  test('should format dates correctly', () => {
    const mockExpense = {
      _id: '1',
      description: 'Test',
      amount: 10,
      category: 'Food',
      date: '2025-11-10T00:00:00.000Z'
    };
    
    render(<ExpenseList expenses={[mockExpense]} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText(/Nov 10, 2025/i)).toBeInTheDocument();
  });

  test('should format different dates correctly', () => {
    const mockExpenses = [
      {
        _id: '1',
        description: 'January',
        amount: 10,
        category: 'Food',
        date: '2025-01-15T00:00:00.000Z'
      },
      {
        _id: '2',
        description: 'December',
        amount: 10,
        category: 'Food',
        date: '2025-12-25T00:00:00.000Z'
      }
    ];
    
    render(<ExpenseList expenses={mockExpenses} onEdit={vi.fn()} onDelete={vi.fn()} />);
    
    expect(screen.getByText(/Jan 15, 2025/i)).toBeInTheDocument();
    expect(screen.getByText(/Dec 25, 2025/i)).toBeInTheDocument();
  });

  // ========== EDIT BUTTON TESTS ==========
  
  test('should call onEdit with expense data when edit button clicked', async () => {
    const user = userEvent.setup();
    const mockEdit = vi.fn();
    const mockExpense = {
      _id: '123',
      description: 'Test Expense',
      amount: 50,
      category: 'Food',
      date: '2025-11-10'
    };
    
    render(<ExpenseList expenses={[mockExpense]} onEdit={mockEdit} onDelete={vi.fn()} />);
    
    const editButtons = screen.getAllByTitle('Edit');
    await user.click(editButtons[0]);
    
    expect(mockEdit).toHaveBeenCalledTimes(1);
    expect(mockEdit).toHaveBeenCalledWith(mockExpense);
  });

  test('should have edit button for each expense', () => {
    const mockExpenses = [
      { _id: '1', description: 'A', amount: 10, category: 'Food', date: '2025-11-10' },
      { _id: '2', description: 'B', amount: 20, category: 'Food', date: '2025-11-10' }
    ];
    
    render(<ExpenseList expenses={mockExpenses} onEdit={vi.fn()} onDelete={vi.fn()} />);
    
    const editButtons = screen.getAllByTitle('Edit');
    expect(editButtons).toHaveLength(2);
  });

  // ========== DELETE BUTTON TESTS ==========
  
  test('should call onDelete with expense ID when delete button clicked', async () => {
    const user = userEvent.setup();
    const mockDelete = vi.fn();
    const mockExpense = {
      _id: 'abc123',
      description: 'To Delete',
      amount: 75,
      category: 'Shopping',
      date: '2025-11-10'
    };
    
    render(<ExpenseList expenses={[mockExpense]} onEdit={vi.fn()} onDelete={mockDelete} />);
    
    const deleteButtons = screen.getAllByTitle('Delete');
    await user.click(deleteButtons[0]);
    
    expect(mockDelete).toHaveBeenCalledTimes(1);
    expect(mockDelete).toHaveBeenCalledWith('abc123');
  });

  test('should have delete button for each expense', () => {
    const mockExpenses = [
      { _id: '1', description: 'A', amount: 10, category: 'Food', date: '2025-11-10' },
      { _id: '2', description: 'B', amount: 20, category: 'Food', date: '2025-11-10' }
    ];
    
    render(<ExpenseList expenses={mockExpenses} onEdit={vi.fn()} onDelete={vi.fn()} />);
    
    const deleteButtons = screen.getAllByTitle('Delete');
    expect(deleteButtons).toHaveLength(2);
  });

  test('should call onDelete with correct ID for multiple expenses', async () => {
    const user = userEvent.setup();
    const mockDelete = vi.fn();
    const mockExpenses = [
      { _id: 'id-1', description: 'First', amount: 10, category: 'Food', date: '2025-11-10' },
      { _id: 'id-2', description: 'Second', amount: 20, category: 'Food', date: '2025-11-10' },
      { _id: 'id-3', description: 'Third', amount: 30, category: 'Food', date: '2025-11-10' }
    ];
    
    render(<ExpenseList expenses={mockExpenses} onEdit={vi.fn()} onDelete={mockDelete} />);
    
    const deleteButtons = screen.getAllByTitle('Delete');
    await user.click(deleteButtons[1]);
    
    expect(mockDelete).toHaveBeenCalledWith('id-2');
  });

  // ========== MULTIPLE EXPENSES TESTS ==========
  
  test('should render large list of expenses correctly', () => {
    const mockExpenses = Array.from({ length: 50 }, (_, i) => ({
      _id: `id-${i}`,
      description: `Expense ${i + 1}`,
      amount: (i + 1) * 10,
      category: 'Food',
      date: '2025-11-10'
    }));
    
    render(<ExpenseList expenses={mockExpenses} onEdit={vi.fn()} onDelete={vi.fn()} />);
    
    expect(screen.getByText('50 items')).toBeInTheDocument();
    expect(screen.getByText('Expense 1')).toBeInTheDocument();
    expect(screen.getByText('Expense 50')).toBeInTheDocument();
  });

  // ========== EDGE CASES ==========
  
  test('should handle expenses with long descriptions', () => {
    const mockExpense = {
      _id: '1',
      description: 'This is a very long expense description that might wrap to multiple lines',
      amount: 100,
      category: 'Food',
      date: '2025-11-10'
    };
    
    render(<ExpenseList expenses={[mockExpense]} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText(/This is a very long expense description/i)).toBeInTheDocument();
  });

  test('should handle expenses with zero amount', () => {
    const mockExpense = {
      _id: '1',
      description: 'Free item',
      amount: 0,
      category: 'Other',
      date: '2025-11-10'
    };
    
    render(<ExpenseList expenses={[mockExpense]} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('$0.00')).toBeInTheDocument();
  });

  test('should handle expenses with large amounts', () => {
    const mockExpense = {
      _id: '1',
      description: 'Expensive purchase',
      amount: 9999.99,
      category: 'Shopping',
      date: '2025-11-10'
    };
    
    render(<ExpenseList expenses={[mockExpense]} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('$9999.99')).toBeInTheDocument();
  });

  test('should handle special characters in description', () => {
    const mockExpense = {
      _id: '1',
      description: 'Café & Restaurant $$$',
      amount: 50,
      category: 'Food',
      date: '2025-11-10'
    };
    
    render(<ExpenseList expenses={[mockExpense]} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('Café & Restaurant $$$')).toBeInTheDocument();
  });

});