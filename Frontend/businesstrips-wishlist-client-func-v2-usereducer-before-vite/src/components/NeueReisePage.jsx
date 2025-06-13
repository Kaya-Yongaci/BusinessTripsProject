import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

function NeueReisePage() {
  const navigate = useNavigate();
  const [tripData, setTripData] = useState({
    von: '',
    bis: '',
    wohin: '',
    grund: '',
    kosten: '',
    transport: 'Flug',
    hotel: '',
    kategorie: 'Geschäftlich'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const transportOptions = ['Flug', 'Bahn', 'Auto', 'Bus'];
  const kategorieOptions = ['Geschäftlich', 'Konferenz', 'Schulung', 'Kundenbesuch'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTripData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!tripData.von) newErrors.von = 'Startdatum ist erforderlich';
    if (!tripData.bis) newErrors.bis = 'Enddatum ist erforderlich';
    if (!tripData.wohin) newErrors.wohin = 'Destination ist erforderlich';
    if (!tripData.grund) newErrors.grund = 'Grund der Reise ist erforderlich';
    if (!tripData.kosten) newErrors.kosten = 'Geschätzte Kosten sind erforderlich';
    
    if (tripData.von && tripData.bis && new Date(tripData.von) >= new Date(tripData.bis)) {
      newErrors.bis = 'Enddatum muss nach dem Startdatum liegen';
    }
    
    if (tripData.kosten && (isNaN(tripData.kosten) || parseFloat(tripData.kosten) <= 0)) {
      newErrors.kosten = 'Bitte geben Sie einen gültigen Betrag ein';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Trip data:', tripData);
      alert('Reise wurde erfolgreich gebucht!');
      navigate('/meine-reisen');
    } catch (error) {
      alert('Fehler beim Buchen der Reise. Bitte versuchen Sie es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setTripData({
      von: '',
      bis: '',
      wohin: '',
      grund: '',
      kosten: '',
      transport: 'Flug',
      hotel: '',
      kategorie: 'Geschäftlich'
    });
    setErrors({});
  };

  return (
    <div className="neue-reise-page">
      <Header title="Neue Reise" subtitle="Planen Sie Ihre nächste Geschäftsreise" />
      
      <div className="trip-form-container">
        <form onSubmit={handleSubmit} className="trip-form">
          <div className="form-section">
            <h3>Reisedaten</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Von *</label>
                <input
                  type="date"
                  name="von"
                  value={tripData.von}
                  onChange={handleInputChange}
                  className={`form-input ${errors.von ? 'error' : ''}`}
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.von && <span className="error-message">{errors.von}</span>}
              </div>
              <div className="form-group">
                <label>Bis *</label>
                <input
                  type="date"
                  name="bis"
                  value={tripData.bis}
                  onChange={handleInputChange}
                  className={`form-input ${errors.bis ? 'error' : ''}`}
                  min={tripData.von || new Date().toISOString().split('T')[0]}
                />
                {errors.bis && <span className="error-message">{errors.bis}</span>}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Wohin *</label>
                <input
                  type="text"
                  name="wohin"
                  value={tripData.wohin}
                  onChange={handleInputChange}
                  className={`form-input ${errors.wohin ? 'error' : ''}`}
                  placeholder="z.B. Stockholm, Schweden"
                />
                {errors.wohin && <span className="error-message">{errors.wohin}</span>}
              </div>
              <div className="form-group">
                <label>Kategorie</label>
                <select
                  name="kategorie"
                  value={tripData.kategorie}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  {kategorieOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Reisedetails</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Grund der Reise *</label>
                <textarea
                  name="grund"
                  value={tripData.grund}
                  onChange={handleInputChange}
                  className={`form-input textarea ${errors.grund ? 'error' : ''}`}
                  placeholder="Beschreiben Sie den Zweck Ihrer Reise..."
                  rows="3"
                />
                {errors.grund && <span className="error-message">{errors.grund}</span>}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Transport</label>
                <select
                  name="transport"
                  value={tripData.transport}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  {transportOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Hotel/Unterkunft</label>
                <input
                  type="text"
                  name="hotel"
                  value={tripData.hotel}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Name der Unterkunft (optional)"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Kosten</h3>
            <div className="form-row">
              <div className="form-group full-width">
                <label>Geschätzte Gesamtkosten * (in USD)</label>
                <input
                  type="number"
                  name="kosten"
                  value={tripData.kosten}
                  onChange={handleInputChange}
                  className={`form-input ${errors.kosten ? 'error' : ''}`}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
                {errors.kosten && <span className="error-message">{errors.kosten}</span>}
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="reset-button"
              onClick={handleReset}
              disabled={isSubmitting}
            >
              Zurücksetzen
            </button>
            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Wird gebucht...' : 'Reise Buchen'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NeueReisePage;
