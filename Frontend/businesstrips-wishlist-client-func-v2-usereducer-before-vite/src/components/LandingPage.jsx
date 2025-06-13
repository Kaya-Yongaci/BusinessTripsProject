import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="landing-header">
        <div className="logo">TripManager</div>
      </div>
      <div className="landing-content">
        <h1>Reisen einfach verwalten</h1>
        <button className="cta-button" onClick={() => navigate('/login')}>
          Los legen
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
