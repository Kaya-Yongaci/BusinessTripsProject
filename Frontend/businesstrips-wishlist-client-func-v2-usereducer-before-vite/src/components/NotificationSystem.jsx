import React, { useState, useEffect } from 'react';

function NotificationSystem() {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = 'info', duration = 5000) => {
    const id = Date.now();
    const notification = { id, message, type, duration };
    
    setNotifications(prev => [...prev, notification]);
    
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  // Example notifications on mount
  useEffect(() => {
    const exampleNotifications = [
      { message: 'Willkommen bei TripManager!', type: 'success' },
    ];

    exampleNotifications.forEach((notif, index) => {
      setTimeout(() => {
        addNotification(notif.message, notif.type);
      }, index * 1000);
    });
  }, []);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return 'ℹ️';
    }
  };

  return (
    <div className="notification-container">
      {notifications.map(notification => (
        <div 
          key={notification.id} 
          className={`notification notification-${notification.type}`}
        >
          <span className="notification-icon">
            {getNotificationIcon(notification.type)}
          </span>
          <span className="notification-message">
            {notification.message}
          </span>
          <button 
            className="notification-close"
            onClick={() => removeNotification(notification.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

export default NotificationSystem;
