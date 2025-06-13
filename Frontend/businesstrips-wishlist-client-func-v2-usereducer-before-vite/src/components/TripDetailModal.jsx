import React from 'react';

function TripDetailModal({ trip, isOpen, onClose, onEdit, onDelete }) {
  if (!isOpen || !trip) return null;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr.split('.').reverse().join('-'));
    return date.toLocaleDateString('de-DE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateDuration = () => {
    const start = new Date(trip.von.split('.').reverse().join('-'));
    const end = new Date(trip.bis.split('.').reverse().join('-'));
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Reisedetails</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="trip-detail-section">
            <h3>🏢 Grundinformationen</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Destination:</span>
                <span className="detail-value">{trip.nach}, {trip.land}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Kategorie:</span>
                <span className="detail-value">{trip.kategorie}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Transport:</span>
                <span className="detail-value">{trip.transport}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Status:</span>
                <span className={`status-badge status-${trip.status.toLowerCase()}`}>
                  {trip.status}
                </span>
              </div>
            </div>
          </div>

          <div className="trip-detail-section">
            <h3>📅 Zeitraum</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Abreise:</span>
                <span className="detail-value">{formatDate(trip.von)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Rückkehr:</span>
                <span className="detail-value">{formatDate(trip.bis)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Dauer:</span>
                <span className="detail-value">{calculateDuration()} Tage</span>
              </div>
            </div>
          </div>

          <div className="trip-detail-section">
            <h3>💰 Kostenübersicht</h3>
            <div className="cost-breakdown">
              <div className="cost-item total">
                <span>Gesamtkosten:</span>
                <span className="cost-amount">{trip.kosten.toLocaleString()}$</span>
              </div>
              <div className="cost-item">
                <span>Pro Tag:</span>
                <span className="cost-amount">
                  {Math.round(trip.kosten / calculateDuration()).toLocaleString()}$
                </span>
              </div>
            </div>
          </div>

          {trip.beschreibung && (
            <div className="trip-detail-section">
              <h3>📝 Beschreibung</h3>
              <p className="trip-description">{trip.beschreibung}</p>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Schließen
          </button>
          <button className="btn-primary" onClick={() => onEdit(trip)}>
            Bearbeiten
          </button>
          <button className="btn-danger" onClick={() => onDelete(trip)}>
            Löschen
          </button>
        </div>
      </div>
    </div>
  );
}

export default TripDetailModal;
