import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '🏠' },
    { name: 'Budget', path: '/budget', icon: '💰' },
    { name: 'Neue Reise', path: '/neue-reise', icon: '✈️' },
    { name: 'Meine Reisen', path: '/meine-reisen', icon: '📋' },
    { name: 'Kalender', path: '/kalender', icon: '📅' },
    { name: 'Statistiken', path: '/statistiken', icon: '📊' },
    { name: 'Profil', path: '/profil', icon: '👤' },
    { name: 'Einstellungen', path: '/einstellungen', icon: '⚙️' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">🧳</span>
        <span className="logo-text">TripManager</span>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.path}
            className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-text">{item.name}</span>
          </button>
        ))}
      </nav>
      
      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">👤</div>
          <div className="user-details">
            <div className="user-name">Max Mustermann</div>
            <div className="user-role">Business Traveler</div>
          </div>
        </div>
        
        <button className="logout-button" onClick={() => navigate('/')}>
          <span className="sidebar-icon">🚪</span>
          <span className="sidebar-text">Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
