import React from 'react';

function LoadingSpinner({ size = 'medium', message = 'Laden...', overlay = false }) {
  const sizeClass = `spinner-${size}`;
  
  const spinner = (
    <div className={`loading-spinner ${sizeClass}`}>
      <div className="spinner"></div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );

  if (overlay) {
    return (
      <div className="loading-overlay">
        {spinner}
      </div>
    );
  }

  return spinner;
}

export default LoadingSpinner;
