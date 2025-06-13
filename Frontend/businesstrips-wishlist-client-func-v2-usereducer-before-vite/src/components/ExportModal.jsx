import React, { useState } from 'react';

function ExportModal({ isOpen, onClose, trips = [] }) {
  const [exportFormat, setExportFormat] = useState('csv');
  const [exportOptions, setExportOptions] = useState({
    includeHeaders: true,
    dateFormat: 'dd.mm.yyyy',
    separator: ';',
    encoding: 'utf-8'
  });
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate export
      
      if (exportFormat === 'csv') {
        exportToCSV();
      } else if (exportFormat === 'pdf') {
        exportToPDF();
      } else if (exportFormat === 'excel') {
        exportToExcel();
      }
      
      alert(`Export als ${exportFormat.toUpperCase()} erfolgreich!`);
      onClose();
    } catch (error) {
      alert('Fehler beim Export!');
    } finally {
      setIsExporting(false);
    }
  };

  const exportToCSV = () => {
    const headers = ['Von', 'Bis', 'Destination', 'Land', 'Kosten', 'Kategorie', 'Transport', 'Status'];
    const csvContent = [
      exportOptions.includeHeaders ? headers.join(exportOptions.separator) : '',
      ...trips.map(trip => [
        trip.von || '',
        trip.bis || '',
        trip.nach || '',
        trip.land || '',
        trip.kosten || 0,
        trip.kategorie || '',
        trip.transport || '',
        trip.status || ''
      ].join(exportOptions.separator))
    ].filter(Boolean).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `reisen_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const exportToPDF = () => {
    console.log('PDF Export - würde PDF generieren');
  };

  const exportToExcel = () => {
    console.log('Excel Export - würde Excel-Datei generieren');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content export-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>📊 Daten exportieren</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="export-section">
            <h3>Format auswählen</h3>
            <div className="format-options">
              <label className="format-option">
                <input
                  type="radio"
                  value="csv"
                  checked={exportFormat === 'csv'}
                  onChange={(e) => setExportFormat(e.target.value)}
                />
                <div className="format-card">
                  <div className="format-icon">📄</div>
                  <div className="format-name">CSV</div>
                  <div className="format-desc">Kompatibel mit Excel, Numbers</div>
                </div>
              </label>
              
              <label className="format-option">
                <input
                  type="radio"
                  value="excel"
                  checked={exportFormat === 'excel'}
                  onChange={(e) => setExportFormat(e.target.value)}
                />
                <div className="format-card">
                  <div className="format-icon">📊</div>
                  <div className="format-name">Excel</div>
                  <div className="format-desc">Formatierte Tabelle</div>
                </div>
              </label>
              
              <label className="format-option">
                <input
                  type="radio"
                  value="pdf"
                  checked={exportFormat === 'pdf'}
                  onChange={(e) => setExportFormat(e.target.value)}
                />
                <div className="format-card">
                  <div className="format-icon">📋</div>
                  <div className="format-name">PDF</div>
                  <div className="format-desc">Druckfreundlich</div>
                </div>
              </label>
            </div>
          </div>

          {exportFormat === 'csv' && (
            <div className="export-section">
              <h3>CSV Optionen</h3>
              <div className="options-grid">
                <label className="option-item">
                  <input
                    type="checkbox"
                    checked={exportOptions.includeHeaders}
                    onChange={(e) => setExportOptions(prev => ({ ...prev, includeHeaders: e.target.checked }))}
                  />
                  Spaltenüberschriften einschließen
                </label>
                
                <div className="option-item">
                  <label>Trennzeichen:</label>
                  <select
                    value={exportOptions.separator}
                    onChange={(e) => setExportOptions(prev => ({ ...prev, separator: e.target.value }))}
                    className="option-select"
                  >
                    <option value=";">Semikolon (;)</option>
                    <option value=",">Komma (,)</option>
                    <option value="\t">Tab</option>
                  </select>
                </div>
                
                <div className="option-item">
                  <label>Datumsformat:</label>
                  <select
                    value={exportOptions.dateFormat}
                    onChange={(e) => setExportOptions(prev => ({ ...prev, dateFormat: e.target.value }))}
                    className="option-select"
                  >
                    <option value="dd.mm.yyyy">DD.MM.YYYY</option>
                    <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                    <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <div className="export-section">
            <h3>Datenvorschau</h3>
            <div className="data-preview">
              <div className="preview-stats">
                <span>📊 {trips.length} Reisen werden exportiert</span>
                <span>💰 Gesamtkosten: {trips.reduce((sum, trip) => sum + (trip.kosten || 0), 0).toLocaleString()}$</span>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose} disabled={isExporting}>
            Abbrechen
          </button>
          <button className="btn-primary" onClick={handleExport} disabled={isExporting}>
            {isExporting ? 'Exportiere...' : `Als ${exportFormat.toUpperCase()} exportieren`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExportModal;
