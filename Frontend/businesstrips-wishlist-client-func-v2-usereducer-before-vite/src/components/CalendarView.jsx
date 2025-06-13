import React, { useState, useMemo } from 'react';
import Header from './Header';

function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // month, week, year

  const trips = [
    { id: 1, von: '30.01.2025', bis: '02.02.2025', nach: 'Antalya', status: 'Geplant', color: '#4a90e2' },
    { id: 2, von: '29.05.2025', bis: '10.06.2025', nach: 'New Delhi', status: 'Bestätigt', color: '#28a745' },
    { id: 3, von: '26.05.2025', bis: '28.05.2025', nach: 'Stockholm', status: 'Abgeschlossen', color: '#6c757d' },
    { id: 4, von: '15.03.2025', bis: '18.03.2025', nach: 'Berlin', status: 'Geplant', color: '#4a90e2' },
    { id: 5, von: '22.07.2025', bis: '25.07.2025', nach: 'London', status: 'Geplant', color: '#4a90e2' }
  ];

  const monthNames = [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
  ];

  const weekDays = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Previous month's days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const day = new Date(year, month, -i);
      days.push({ date: day, isCurrentMonth: false });
    }
    
    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push({ date, isCurrentMonth: true });
    }
    
    // Next month's days to fill the grid
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);
      days.push({ date, isCurrentMonth: false });
    }
    
    return days;
  };

  const getTripsForDate = (date) => {
    const dateStr = date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
    return trips.filter(trip => {
      const startDate = new Date(trip.von.split('.').reverse().join('-'));
      const endDate = new Date(trip.bis.split('.').reverse().join('-'));
      return date >= startDate && date <= endDate;
    });
  };

  const calendarDays = useMemo(() => getDaysInMonth(currentDate), [currentDate]);

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="calendar-view">
      <Header title="Reisekalender" subtitle="Übersicht Ihrer geplanten Geschäftsreisen" />
      
      <div className="calendar-controls">
        <div className="calendar-navigation">
          <button className="nav-btn" onClick={() => navigateMonth(-1)}>‹</button>
          <h2 className="calendar-title">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button className="nav-btn" onClick={() => navigateMonth(1)}>›</button>
        </div>
        
        <div className="calendar-actions">
          <button className="btn-secondary" onClick={goToToday}>Heute</button>
          <div className="view-mode-selector">
            <button 
              className={`view-btn ${viewMode === 'month' ? 'active' : ''}`}
              onClick={() => setViewMode('month')}
            >
              Monat
            </button>
            <button 
              className={`view-btn ${viewMode === 'week' ? 'active' : ''}`}
              onClick={() => setViewMode('week')}
            >
              Woche
            </button>
            <button 
              className={`view-btn ${viewMode === 'year' ? 'active' : ''}`}
              onClick={() => setViewMode('year')}
            >
              Jahr
            </button>
          </div>
        </div>
      </div>

      <div className="calendar-container">
        <div className="calendar-header">
          {weekDays.map(day => (
            <div key={day} className="calendar-weekday">
              {day}
            </div>
          ))}
        </div>
        
        <div className="calendar-grid">
          {calendarDays.map((dayInfo, index) => {
            const tripsForDay = getTripsForDate(dayInfo.date);
            const isToday = dayInfo.date.toDateString() === new Date().toDateString();
            
            return (
              <div 
                key={index} 
                className={`calendar-day ${!dayInfo.isCurrentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''}`}
              >
                <div className="day-number">
                  {dayInfo.date.getDate()}
                </div>
                <div className="day-trips">
                  {tripsForDay.map(trip => (
                    <div 
                      key={trip.id}
                      className="trip-indicator"
                      style={{ backgroundColor: trip.color }}
                      title={`${trip.nach} (${trip.status})`}
                    >
                      <span className="trip-destination">{trip.nach}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="calendar-legend">
        <h3>Legende</h3>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#4a90e2' }}></div>
            <span>Geplant</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#28a745' }}></div>
            <span>Bestätigt</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#6c757d' }}></div>
            <span>Abgeschlossen</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#dc3545' }}></div>
            <span>Storniert</span>
          </div>
        </div>
      </div>

      <div className="upcoming-trips">
        <h3>Nächste Reisen</h3>
        <div className="trip-list">
          {trips
            .filter(trip => new Date(trip.von.split('.').reverse().join('-')) >= new Date())
            .sort((a, b) => new Date(a.von.split('.').reverse().join('-')) - new Date(b.von.split('.').reverse().join('-')))
            .slice(0, 3)
            .map(trip => (
              <div key={trip.id} className="upcoming-trip-item">
                <div className="trip-date">
                  <span className="trip-day">{trip.von.split('.')[0]}</span>
                  <span className="trip-month">{monthNames[parseInt(trip.von.split('.')[1]) - 1]?.substring(0, 3)}</span>
                </div>
                <div className="trip-info">
                  <h4>{trip.nach}</h4>
                  <p>{trip.von} - {trip.bis}</p>
                </div>
                <div className="trip-status">
                  <span className={`status-badge status-${trip.status.toLowerCase()}`}>
                    {trip.status}
                  </span>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default CalendarView;
