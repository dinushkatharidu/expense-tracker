const Statistics = ({ stats }) => {
  if (!stats) {
    return (
      <div className="card shadow-sm">
        <div className="card-body text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

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

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-success text-white">
        <h5 className="mb-0">
          <i className="bi bi-graph-up me-2"></i>
          Summary
        </h5>
      </div>
      <div className="card-body">
        {/* Total Stats */}
        <div className="alert alert-success mb-3" role="alert">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6 className="alert-heading mb-1">
                <i className="bi bi-cash-stack me-2"></i>
                Total Spent
              </h6>
              <small className="text-muted">{stats.count} transactions</small>
            </div>
            <h3 className="mb-0 fw-bold">LKR {stats.total}</h3>
          </div>
        </div>

        {/* Category Breakdown */}
        <h6 className="mb-3">
          <i className="bi bi-pie-chart me-2"></i>
          By Category
        </h6>
        
        {Object.keys(stats.byCategory).length === 0 ? (
          <p className="text-muted text-center">No expenses yet</p>
        ) : (
          <div className="list-group list-group-flush">
            {Object.entries(stats.byCategory).map(([category, amount]) => (
              <div key={category} className="list-group-item px-0">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <span className={`badge bg-${getCategoryColor(category)} me-2`}>
                      <i className={`bi ${getCategoryIcon(category)}`}></i>
                    </span>
                    <span>{category}</span>
                  </div>
                  <span className="fw-bold text-dark">${amount.toFixed(2)}</span>
                </div>
                
                {/* Progress Bar */}
                <div className="progress mt-2" style={{ height: '6px' }}>
                  <div 
                    className={`progress-bar bg-${getCategoryColor(category)}`}
                    role="progressbar" 
                    style={{ width: `${(amount / stats.total) * 100}%` }}
                    aria-valuenow={(amount / stats.total) * 100}
                    aria-valuemin="0" 
                    aria-valuemax="100"
                  ></div>
                </div>
                <small className="text-muted">
                  {((amount / stats.total) * 100).toFixed(1)}% of total
                </small>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Statistics;