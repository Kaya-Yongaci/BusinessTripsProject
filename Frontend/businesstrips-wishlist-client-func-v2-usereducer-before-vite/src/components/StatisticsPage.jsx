import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import Header from './Header';

function StatisticsPage() {
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedMetric, setSelectedMetric] = useState('kosten');

  // Dummy data - in real app this would come from API
  const trips = [
    { id: 1, von: '30.01.2025', bis: '02.02.2025', nach: 'Antalya', land: 'Türkei', kosten: 5000, kategorie: 'Konferenz', transport: 'Flug', monat: 1 },
    { id: 2, von: '29.05.2025', bis: '10.06.2025', nach: 'New Delhi', land: 'Indien', kosten: 3500, kategorie: 'Geschäftlich', transport: 'Flug', monat: 5 },
    { id: 3, von: '26.05.2025', bis: '28.05.2025', nach: 'Stockholm', land: 'Schweden', kosten: 3000, kategorie: 'Schulung', transport: 'Flug', monat: 5 },
    { id: 4, von: '15.03.2025', bis: '18.03.2025', nach: 'Berlin', land: 'Deutschland', kosten: 800, kategorie: 'Kundenbesuch', transport: 'Bahn', monat: 3 },
    { id: 5, von: '22.07.2025', bis: '25.07.2025', nach: 'London', land: 'UK', kosten: 2200, kategorie: 'Konferenz', transport: 'Flug', monat: 7 }
  ];

  const monthlyStats = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
    const monthlyData = months.map((month, index) => {
      const monthTrips = trips.filter(trip => trip.monat === index + 1);
      return {
        month,
        trips: monthTrips.length,
        kosten: monthTrips.reduce((sum, trip) => sum + trip.kosten, 0),
        durchschnitt: monthTrips.length > 0 ? Math.round(monthTrips.reduce((sum, trip) => sum + trip.kosten, 0) / monthTrips.length) : 0
      };
    });
    return monthlyData;
  }, [trips]);

  const categoryStats = useMemo(() => {
    const categories = {};
    trips.forEach(trip => {
      if (!categories[trip.kategorie]) {
        categories[trip.kategorie] = { count: 0, kosten: 0 };
      }
      categories[trip.kategorie].count++;
      categories[trip.kategorie].kosten += trip.kosten;
    });

    return Object.entries(categories).map(([kategorie, data]) => ({
      kategorie,
      trips: data.count,
      kosten: data.kosten,
      durchschnitt: Math.round(data.kosten / data.count)
    }));
  }, [trips]);

  const transportStats = useMemo(() => {
    const transport = {};
    trips.forEach(trip => {
      if (!transport[trip.transport]) {
        transport[trip.transport] = { count: 0, kosten: 0 };
      }
      transport[trip.transport].count++;
      transport[trip.transport].kosten += trip.kosten;
    });

    return Object.entries(transport).map(([transportType, data]) => ({
      transport: transportType,
      trips: data.count,
      kosten: data.kosten,
      percentage: Math.round((data.count / trips.length) * 100)
    }));
  }, [trips]);

  const topDestinations = useMemo(() => {
    const destinations = {};
    trips.forEach(trip => {
      const key = `${trip.nach}, ${trip.land}`;
      if (!destinations[key]) {
        destinations[key] = { count: 0, kosten: 0 };
      }
      destinations[key].count++;
      destinations[key].kosten += trip.kosten;
    });

    return Object.entries(destinations)
      .map(([destination, data]) => ({
        destination,
        trips: data.count,
        kosten: data.kosten
      }))
      .sort((a, b) => b.kosten - a.kosten)
      .slice(0, 5);
  }, [trips]);

  const performanceData = useMemo(() => {
    const totalBudget = 50000;
    const usedBudget = trips.reduce((sum, trip) => sum + trip.kosten, 0);
    const averageCost = Math.round(usedBudget / trips.length);
    const efficiency = Math.round((trips.length / usedBudget) * 1000);

    return [
      { metric: 'Budget Nutzung', value: Math.round((usedBudget / totalBudget) * 100), max: 100 },
      { metric: 'Durchschnitt/Reise', value: Math.round((averageCost / 5000) * 100), max: 100 },
      { metric: 'Reise Effizienz', value: Math.min(efficiency, 100), max: 100 },
      { metric: 'Jahres Aktivität', value: Math.round((trips.length / 20) * 100), max: 100 },
      { metric: 'Budget Kontrolle', value: 85, max: 100 }
    ];
  }, [trips]);

  const COLORS = ['#4a90e2', '#50e3c2', '#f5a623', '#e94b3c', '#9013fe', '#bd10e0'];

  return (
    <div className="statistics-page">
      <Header title="Reise-Statistiken" subtitle={`Detaillierte Analyse für ${selectedYear}`} />
      
      <div className="stats-controls">
        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="stats-select">
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
        </select>
        <select value={selectedMetric} onChange={(e) => setSelectedMetric(e.target.value)} className="stats-select">
          <option value="kosten">Kosten</option>
          <option value="trips">Anzahl Reisen</option>
          <option value="durchschnitt">Durchschnittskosten</option>
        </select>
      </div>

      <div className="stats-overview">
        <div className="stats-card">
          <h3>Gesamt Reisen</h3>
          <div className="stat-number">{trips.length}</div>
          <div className="stat-change positive">+3 vs. Vorjahr</div>
        </div>
        <div className="stats-card">
          <h3>Gesamt Kosten</h3>
          <div className="stat-number">{trips.reduce((sum, trip) => sum + trip.kosten, 0).toLocaleString()}$</div>
          <div className="stat-change negative">+12% vs. Vorjahr</div>
        </div>
        <div className="stats-card">
          <h3>Durchschnitt/Reise</h3>
          <div className="stat-number">{Math.round(trips.reduce((sum, trip) => sum + trip.kosten, 0) / trips.length).toLocaleString()}$</div>
          <div className="stat-change positive">-5% vs. Vorjahr</div>
        </div>
        <div className="stats-card">
          <h3>Länder besucht</h3>
          <div className="stat-number">{new Set(trips.map(trip => trip.land)).size}</div>
          <div className="stat-change positive">+2 vs. Vorjahr</div>
        </div>
      </div>

      <div className="stats-charts">
        <div className="chart-row">
          <div className="chart-container large">
            <h3>Monatliche Entwicklung</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value, name) => [
                  name === 'kosten' ? `${value.toLocaleString()}$` : value,
                  name === 'kosten' ? 'Kosten' : name === 'trips' ? 'Anzahl Reisen' : 'Durchschnitt'
                ]} />
                <Line type="monotone" dataKey={selectedMetric} stroke="#4a90e2" strokeWidth={3} dot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container medium">
            <h3>Performance Radar</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={performanceData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="Performance" dataKey="value" stroke="#4a90e2" fill="#4a90e2" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-row">
          <div className="chart-container medium">
            <h3>Kategorien</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryStats}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="kosten"
                  label={({kategorie, percentage}) => `${kategorie}`}
                >
                  {categoryStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value.toLocaleString()}$`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container medium">
            <h3>Transport Verteilung</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={transportStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="transport" />
                <YAxis />
                <Tooltip formatter={(value, name) => [
                  name === 'kosten' ? `${value.toLocaleString()}$` : value,
                  name === 'kosten' ? 'Kosten' : 'Anzahl Reisen'
                ]} />
                <Bar dataKey="kosten" fill="#50e3c2" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-row">
          <div className="chart-container large">
            <h3>Top Destinationen</h3>
            <div className="destinations-list">
              {topDestinations.map((dest, index) => (
                <div key={index} className="destination-item">
                  <div className="destination-rank">{index + 1}</div>
                  <div className="destination-info">
                    <div className="destination-name">{dest.destination}</div>
                    <div className="destination-stats">
                      {dest.trips} Reisen • {dest.kosten.toLocaleString()}$
                    </div>
                  </div>
                  <div className="destination-bar">
                    <div 
                      className="destination-progress" 
                      style={{ width: `${(dest.kosten / topDestinations[0].kosten) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatisticsPage;
