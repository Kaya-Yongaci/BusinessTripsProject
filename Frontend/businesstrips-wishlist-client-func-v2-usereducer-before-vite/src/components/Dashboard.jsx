import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

function Dashboard() {
  const navigate = useNavigate();
  const [totalBudget] = useState(50000);
  const [usedBudget] = useState(8035);
  const [nextTrip, setNextTrip] = useState(null);

  useEffect(() => {
    // Simulate loading next trip
    setNextTrip({
      destination: 'Stockholm',
      startDate: '26.05.2025',
      endDate: '28.05.2025',
      cost: '3\'000$'
    });
  }, []);

  const budgetPercentage = Math.round((usedBudget / totalBudget) * 100);
  const remainingBudget = totalBudget - usedBudget;

  const budgetData = [
    { name: 'Used', value: usedBudget, color: '#ff4444' },
    { name: 'Available', value: remainingBudget, color: '#00dd00' }
  ];

  return (
    <div className="dashboard">
      <Header title="Dashboard" subtitle="Übersicht Ihrer Geschäftsreisen" />
      
      <div className="dashboard-grid">
        <div className="budget-card">
          <h3>Budget Übersicht</h3>
          <div className="budget-chart">
            <ResponsiveContainer width={250} height={250}>
              <PieChart>
                <Pie
                  data={budgetData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  dataKey="value"
                  startAngle={90}
                  endAngle={450}
                >
                  {budgetData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="budget-percentage">{budgetPercentage}%</div>
          </div>
          <div className="budget-info">
            <p>Verbraucht: {usedBudget.toLocaleString()}$</p>
            <p>Verfügbar: {remainingBudget.toLocaleString()}$</p>
          </div>
        </div>

        <div className="next-trip-card">
          <h3>Neue Reise planen</h3>
          <div className="new-trip-content">
            <p>Planen Sie Ihre nächste Geschäftsreise</p>
            <button 
              className="book-button"
              onClick={() => navigate('/neue-reise')}
            >
              Jetzt Buchen
            </button>
          </div>
        </div>

        <div className="upcoming-trip-card">
          <h3>Nächste Reise</h3>
          {nextTrip ? (
            <div className="trip-details">
              <div className="trip-info-grid">
                <div className="trip-info-item">
                  <span className="label">Von:</span>
                  <span className="value">{nextTrip.startDate}</span>
                </div>
                <div className="trip-info-item">
                  <span className="label">Bis:</span>
                  <span className="value">{nextTrip.endDate}</span>
                </div>
                <div className="trip-info-item">
                  <span className="label">Wohin:</span>
                  <span className="value">{nextTrip.destination}</span>
                </div>
                <div className="trip-info-item">
                  <span className="label">Kosten:</span>
                  <span className="value">{nextTrip.cost}</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="no-trips">Keine geplanten Reisen</p>
          )}
        </div>

        <div className="quick-stats-card">
          <h3>Schnellübersicht</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">12</span>
              <span className="stat-label">Reisen 2025</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">3</span>
              <span className="stat-label">Länder besucht</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">45</span>
              <span className="stat-label">Reisetage</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
