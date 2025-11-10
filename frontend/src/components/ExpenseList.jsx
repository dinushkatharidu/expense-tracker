const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getCategoryIcon = (category) => {
    const icons = {
      Food: 'bi-cup-straw',
      Transport: 'bi-bus-front',
      Entertainment: 'bi-controller',
      Bills: 'bi-receipt',
      Shopping: 'bi-bag-fill',
      Health: 'bi-heart-pulse',
      Other: 'bi-three-dots'
    };
    return icons[category] || 'bi-tag';
  };

  const getCategoryColor = (category) => {
    const colors = {
      Food: 'danger',
      Transport: 'info',
      Entertainment: 'success',
      Bills: 'warning',
      Shopping: 'primary',
      Health: 'danger',
      Other: 'secondary'
    };
    return colors[category] || 'secondary';
  };

  if (expenses.length === 0) {
    return (
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">
            <i className="bi bi-list-ul me-2"></i>
            Your Expenses
          </h5>
        </div>
        <div className="card-body text-center py-5">
          <i className="bi bi-inbox display-1 text-muted"></i>
          <p className="text-muted mt-3">No expenses yet. Add your first expense!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          <i className="bi bi-list-ul me-2"></i>
          Your Expenses
        </h5>
        <span className="badge bg-light text-dark">{expenses.length} items</span>
      </div>
      <div className="card-body p-0">
        <div className="list-group list-group-flush">
          {expenses.map(expense => (
            <div key={expense._id} className="list-group-item">
              <div className="d-flex w-100 justify-content-between align-items-center">
                <div className="d-flex align-items-center flex-grow-1">
                  <span className={`badge bg-${getCategoryColor(expense.category)} me-3`}>
                    <i className={`bi ${getCategoryIcon(expense.category)} me-1`}></i>
                    {expense.category}
                  </span>
                  <div>
                    <h6 className="mb-1">{expense.description}</h6>
                    <small className="text-muted">
                      <i className="bi bi-calendar3 me-1"></i>
                      {formatDate(expense.date)}
                    </small>
                  </div>
                </div>
                
                <div className="d-flex align-items-center gap-3">
                  <h5 className="mb-0 text-primary fw-bold">
                    ${expense.amount.toFixed(2)}
                  </h5>
                  
                  <div className="btn-group" role="group">
                    <button 
                      onClick={() => onEdit(expense)} 
                      className="btn btn-sm btn-outline-primary"
                      title="Edit"
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button 
                      onClick={() => onDelete(expense._id)} 
                      className="btn btn-sm btn-outline-danger"
                      title="Delete"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;