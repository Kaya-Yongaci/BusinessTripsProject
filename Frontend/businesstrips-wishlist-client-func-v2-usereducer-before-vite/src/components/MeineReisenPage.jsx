import React, { useState, useMemo } from 'react';
import Header from './Header';
import TripDetailModal from './TripDetailModal';
import ExportModal from './ExportModal';

function MeineReisenPage() {
  const [trips] = useState([
    { 
      id: 1, 
      von: '30.01.2025', 
      bis: '02.02.2025', 
      nach: 'Antalya', 
      land: 'Türkei',
      kosten: 5000, 
      status: 'Geplant',
      kategorie: 'Konferenz',
      transport: 'Flug'
    },
    { 
      id: 2, 
      von: '29.05.2025', 
      bis: '10.06.2025', 
      nach: 'New Delhi', 
      land: 'Indien',
      kosten: 3500, 
      status: 'Bestätigt',
      kategorie: 'Geschäftlich',
      transport: 'Flug'
    },
    { 
      id: 3, 
      von: '26.05.2025', 
      bis: '28.05.2025', 
      nach: 'Stockholm', 
      land: 'Schweden',
      kosten: 3000, 
      status: 'Abgeschlossen',
      kategorie: 'Schulung',
      transport: 'Flug'
    },
    { 
      id: 4, 
      von: '15.03.2025', 
      bis: '18.03.2025', 
      nach: 'Berlin', 
      land: 'Deutschland',
      kosten: 800, 
      status: 'Geplant',
      kategorie: 'Kundenbesuch',
      transport: 'Bahn'
    },
    { 
      id: 5, 
      von: '22.07.2025', 
      bis: '25.07.2025', 
      nach: 'London', 
      land: 'UK',
      kosten: 2200, 
      status: 'Geplant',
      kategorie: 'Konferenz',
      transport: 'Flug'
    }
  ]);

  const [filters, setFilters] = useState({
    von: '',
    bis: '',
    nach: '',
    status: '',
    kategorie: '',
    sortBy: 'von',
    sortOrder: 'asc'
  });

  const [selectedTrips, setSelectedTrips] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedTripForDetail, setSelectedTripForDetail] = useState(null);

  const statusOptions = ['Alle', 'Geplant', 'Bestätigt', 'Abgeschlossen', 'Storniert'];
  const kategorieOptions = ['Alle', 'Geschäftlich', 'Konferenz', 'Schulung', 'Kundenbesuch'];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSort = (column) => {
    setFilters(prev => ({
      ...prev,
      sortBy: column,
      sortOrder: prev.sortBy === column && prev.sortOrder === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectTrip = (tripId) => {
    setSelectedTrips(prev => 
      prev.includes(tripId) 
        ? prev.filter(id => id !== tripId)
        : [...prev, tripId]
    );
  };

  const handleSelectAll = () => {
    setSelectedTrips(
      selectedTrips.length === filteredTrips.length 
        ? [] 
        : filteredTrips.map(trip => trip.id)
    );
  };

  const filteredTrips = useMemo(() => {
    let filtered = trips.filter(trip => {
      const matchesDestination = !filters.nach || 
        trip.nach.toLowerCase().includes(filters.nach.toLowerCase()) ||
        trip.land.toLowerCase().includes(filters.nach.toLowerCase());
      
      const matchesStatus = !filters.status || filters.status === 'Alle' || 
        trip.status === filters.status;
      
      const matchesKategorie = !filters.kategorie || filters.kategorie === 'Alle' || 
        trip.kategorie === filters.kategorie;

      const matchesVon = !filters.von || 
        new Date(trip.von.split('.').reverse().join('-')) >= new Date(filters.von);
      
      const matchesBis = !filters.bis || 
        new Date(trip.bis.split('.').reverse().join('-')) <= new Date(filters.bis);

      return matchesDestination && matchesStatus && matchesKategorie && matchesVon && matchesBis;
    });

    // Sortierung
    filtered.sort((a, b) => {
      let aValue = a[filters.sortBy];
      let bValue = b[filters.sortBy];

      if (filters.sortBy === 'von' || filters.sortBy === 'bis') {
        aValue = new Date(aValue.split('.').reverse().join('-'));
        bValue = new Date(bValue.split('.').reverse().join('-'));
      } else if (filters.sortBy === 'kosten') {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      }

      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [trips, filters]);

  const totalCosts = filteredTrips.reduce((sum, trip) => sum + trip.kosten, 0);

  const clearFilters = () => {
    setFilters({
      von: '',
      bis: '',
      nach: '',
      status: '',
      kategorie: '',
      sortBy: 'von',
      sortOrder: 'asc'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Geplant': return '#ffc107';
      case 'Bestätigt': return '#28a745';
      case 'Abgeschlossen': return '#6c757d';
      case 'Storniert': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const handleViewTrip = (trip) => {
    setSelectedTripForDetail(trip);
    setShowDetailModal(true);
  };

  const handleEditTrip = (trip) => {
    console.log('Edit trip:', trip);
    alert('Bearbeiten-Funktion wird implementiert');
  };

  const handleDeleteTrip = (trip) => {
    if (window.confirm(`Möchten Sie die Reise nach ${trip.nach} wirklich löschen?`)) {
      console.log('Delete trip:', trip);
      alert('Löschen-Funktion wird implementiert');
    }
  };

  return (
    <div className="meine-reisen-page">
      <Header title="Meine Reisen" subtitle={`${filteredTrips.length} von ${trips.length} Reisen`} />
      
      <div className="trips-controls">
        <button 
          className="filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? '🔽' : '▶️'} Filter & Suche
        </button>
        
        <button 
          className="export-button"
          onClick={() => setShowExportModal(true)}
        >
          📊 Exportieren
        </button>

        {showFilters && (
          <div className="filters-panel">
            <div className="filter-row">
              <div className="filter-group">
                <label>Von Datum</label>
                <input 
                  type="date" 
                  name="von"
                  value={filters.von}
                  onChange={handleFilterChange}
                  className="filter-input"
                />
              </div>
              <div className="filter-group">
                <label>Bis Datum</label>
                <input 
                  type="date" 
                  name="bis"
                  value={filters.bis}
                  onChange={handleFilterChange}
                  className="filter-input"
                />
              </div>
              <div className="filter-group">
                <label>Destination/Land</label>
                <input 
                  type="text" 
                  name="nach"
                  value={filters.nach}
                  onChange={handleFilterChange}
                  className="filter-input"
                  placeholder="Suche nach Ort oder Land..."
                />
              </div>
            </div>
            
            <div className="filter-row">
              <div className="filter-group">
                <label>Status</label>
                <select 
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="filter-input"
                >
                  {statusOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="filter-group">
                <label>Kategorie</label>
                <select 
                  name="kategorie"
                  value={filters.kategorie}
                  onChange={handleFilterChange}
                  className="filter-input"
                >
                  {kategorieOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="filter-actions">
                <button className="clear-filters" onClick={clearFilters}>
                  Filter zurücksetzen
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="trips-table-container">
        <div className="table-header">
          <div className="bulk-actions">
            <input
              type="checkbox"
              checked={selectedTrips.length === filteredTrips.length && filteredTrips.length > 0}
              onChange={handleSelectAll}
              className="select-all-checkbox"
            />
            <span>Alle auswählen</span>
            {selectedTrips.length > 0 && (
              <button className="bulk-action-btn">
                {selectedTrips.length} ausgewählte Reisen bearbeiten
              </button>
            )}
          </div>
        </div>

        <table className="trips-table">
          <thead>
            <tr>
              <th></th>
              <th 
                className="sortable" 
                onClick={() => handleSort('von')}
              >
                Von {filters.sortBy === 'von' && (filters.sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="sortable" 
                onClick={() => handleSort('bis')}
              >
                Bis {filters.sortBy === 'bis' && (filters.sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="sortable" 
                onClick={() => handleSort('nach')}
              >
                Destination {filters.sortBy === 'nach' && (filters.sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th>Land</th>
              <th 
                className="sortable" 
                onClick={() => handleSort('kosten')}
              >
                Kosten {filters.sortBy === 'kosten' && (filters.sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="sortable" 
                onClick={() => handleSort('status')}
              >
                Status {filters.sortBy === 'status' && (filters.sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th>Kategorie</th>
              <th>Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrips.map((trip) => (
              <tr key={trip.id} className={selectedTrips.includes(trip.id) ? 'selected' : ''}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedTrips.includes(trip.id)}
                    onChange={() => handleSelectTrip(trip.id)}
                    className="trip-checkbox"
                  />
                </td>
                <td>{trip.von}</td>
                <td>{trip.bis}</td>
                <td>{trip.nach}</td>
                <td>{trip.land}</td>
                <td className="cost-cell">{trip.kosten.toLocaleString()}$</td>
                <td>
                  <span 
                    className="status-badge" 
                    style={{ backgroundColor: getStatusColor(trip.status) }}
                  >
                    {trip.status}
                  </span>
                </td>
                <td>{trip.kategorie}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="action-btn edit" 
                      onClick={() => handleEditTrip(trip)}
                      title="Bearbeiten"
                    >
                      ✏️
                    </button>
                    <button 
                      className="action-btn delete" 
                      onClick={() => handleDeleteTrip(trip)}
                      title="Löschen"
                    >
                      🗑️
                    </button>
                    <button 
                      className="action-btn view" 
                      onClick={() => handleViewTrip(trip)}
                      title="Details anzeigen"
                    >
                      👁️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredTrips.length === 0 && (
              <tr>
                <td colSpan="9" className="no-data">
                  Keine Reisen gefunden. Passen Sie Ihre Filter an oder erstellen Sie eine neue Reise.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="trips-summary">
        <div className="summary-stats">
          <div className="summary-item">
            <span className="summary-label">Gefilterte Reisen:</span>
            <span className="summary-value">{filteredTrips.length}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Gesamtkosten:</span>
            <span className="summary-value cost">{totalCosts.toLocaleString()}$</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Durchschnitt pro Reise:</span>
            <span className="summary-value">
              {filteredTrips.length > 0 ? Math.round(totalCosts / filteredTrips.length).toLocaleString() : 0}$
            </span>
          </div>
        </div>
      </div>

      <TripDetailModal
        trip={selectedTripForDetail}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        onEdit={handleEditTrip}
        onDelete={handleDeleteTrip}
      />

      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        trips={filteredTrips}
      />
    </div>
  );
}

export default MeineReisenPage;
