import React from 'react';

const LoadingSkeleton: React.FC = () => (
  <div className="col-lg-3 col-md-5 col-sm-12">
    <div className="card text-center mb-3 loading-skeleton-card">
      <div className="card-body">
        <p className="card-text placeholder-glow">
          <span className="placeholder col-12 mb-2"></span>
          <span className="placeholder col-12 mb-2"></span>
          <span className="placeholder col-10 mb-2"></span>
          <span className="placeholder col-9 mb-2"></span>
          <span className="placeholder col-8 mb-2"></span>
        </p>
      </div>
    </div>
    <div className="card mb-3 loading-skeleton-card">
      <div className="card-body">
        <p className="card-text placeholder-glow">
          <span className="placeholder col-12 mb-2"></span>
          <span className="placeholder col-12 mb-2"></span>
          <span className="placeholder col-10 mb-2"></span>
          <span className="placeholder col-12 mb-2"></span>
          <span className="placeholder col-9 mb-2"></span>
        </p>
      </div>
    </div>
  </div>
);

export default LoadingSkeleton;
