import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Header from './Header';

function BudgetPage() {
  const [selectedYear, setSelectedYear] = useState('2025');
  
  const monthlyExpenses = [
    { month: 'Jan', amount: 4500, trips: 2 },
    { month: 'Feb', amount: 3200, trips: 1 },
    { month: 'Mar', amount: 5800, trips: 3 },
    { month: 'Apr', amount: 2100, trips: 1 },
    { month: 'Mai', amount: 8000, trips: 4 },
    { month: 'Jun', amount: 3500, trips: 2 },
    { month: 'Jul', amount: 6200, trips: 3 },
    { month: 'Aug', amount: 4800, trips: 2 },
    { month: 'Sep', amount: 7500, trips: 4 },
    { month: 'Okt', amount: 3900, trips: 2 },
    { month: 'Nov', amount: 5200, trips: 3 },
    { month: 'Dez', amount: 4100, trips: 2 }
  ];

  const categoryBreakdown = [
    { name: 'Flüge', value: 25000, color: '#ff6b6b' },
    { name: 'Hotels', value: 15000, color: '#4ecdc4' },
    { name: 'Transport', value: 8000, color: '#45b7d1' },
    { name: 'Verpflegung', value: 6000, color: '#96ceb4' },
    { name: 'Sonstiges', value: 4000, color: '#ffeaa7' }
  ];

  const totalBudget = 50000;
  const totalSpent = categoryBreakdown.reduce((sum, item) => sum + item.value, 0);
  const remainingBudget = totalBudget - totalSpent;
  const budgetUsedPercentage = Math.round((totalSpent / totalBudget) * 100);

  const overallBudgetData = [
    { name: 'Ausgegeben', value: totalSpent, color: '#ff6b6b' },
    { name: 'Verfügbar', value: remainingBudget, color: '#4ecdc4' }
  ];

  return (
    <div className="budget-page">
      <Header title="Gesamtbudget" subtitle={`Budgetübersicht für ${selectedYear}`} />
      
      <div className="budget-controls">
        <select 
          value={selectedYear} 
          onChange={(e) => setSelectedYear(e.target.value)}
          className="year-selector"
        >
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
        </select>
      </div>

      <div className="budget-overview">
        <div className="budget-summary-cards">
          <div className="budget-summary-card">
            <h3>Gesamtbudget</h3>
            <span className="budget-amount">{totalBudget.toLocaleString()}$</span>
          </div>
          <div className="budget-summary-card spent">
            <h3>Ausgegeben</h3>
            <span className="budget-amount">{totalSpent.toLocaleString()}$</span>
          </div>
          <div className="budget-summary-card remaining">
            <h3>Verfügbar</h3>
            <span className="budget-amount">{remainingBudget.toLocaleString()}$</span>
          </div>
          <div className="budget-summary-card percentage">
            <h3>Verbrauch</h3>
            <span className="budget-amount">{budgetUsedPercentage}%</span>
          </div>
        </div>
      </div>

      <div className="budget-charts">
        <div className="chart-section">
          <h3>Monatliche Ausgaben</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={monthlyExpenses}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}$`, 'Ausgaben']} />
                <Bar dataKey="amount" fill="#4a90e2" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-section">
          <h3>Ausgaben nach Kategorien</h3>
          <div className="category-chart-container">
            <div className="pie-chart">
              <ResponsiveContainer width={300} height={300}>
                <PieChart>
                  <Pie
                    data={categoryBreakdown}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                  >
                    {categoryBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value.toLocaleString()}$`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="category-legend">
              {categoryBreakdown.map((category, index) => (
                <div key={index} className="legend-item">
                  <div 
                    className="legend-color" 
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="legend-label">{category.name}</span>
                  <span className="legend-value">{category.value.toLocaleString()}$</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="chart-section">
          <h3>Budget vs. Ausgaben</h3>
          <div className="budget-comparison">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={[{ name: 'Budget', budget: totalBudget, spent: totalSpent }]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `${value.toLocaleString()}$`} />
                <Bar dataKey="budget" fill="#e0e0e0" name="Gesamtbudget" />
                <Bar dataKey="spent" fill="#ff6b6b" name="Ausgegeben" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BudgetPage;
