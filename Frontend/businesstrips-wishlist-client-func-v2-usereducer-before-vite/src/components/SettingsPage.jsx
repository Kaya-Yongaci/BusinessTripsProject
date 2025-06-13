import React, { useState } from 'react';
import Header from './Header';

function SettingsPage() {
  const [settings, setSettings] = useState({
    profile: {
      firstName: 'Max',
      lastName: 'Mustermann',
      email: 'max.mustermann@company.com',
      phone: '+49 123 456789',
      department: 'IT',
      employeeId: 'EMP001',
      defaultCurrency: 'USD',
      language: 'de'
    },
    preferences: {
      emailNotifications: true,
      pushNotifications: false,
      weeklyReports: true,
      monthlyReports: true,
      budgetAlerts: true,
      darkMode: false,
      autoBackup: true,
      twoFactorAuth: false
    },
    budget: {
      yearlyBudget: 50000,
      warningThreshold: 80,
      approvalRequired: true,
      maxTripCost: 10000,
      defaultApprover: 'manager@company.com'
    },
    privacy: {
      shareWithTeam: true,
      publicProfile: false,
      analytics: true,
      cookies: true
    }
  });

  const [activeTab, setActiveTab] = useState('profile');
  const [hasChanges, setHasChanges] = useState(false);

  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    console.log('Saving settings:', settings);
    alert('Einstellungen wurden gespeichert!');
    setHasChanges(false);
  };

  const handleReset = () => {
    if (window.confirm('Möchten Sie alle Änderungen verwerfen?')) {
      window.location.reload();
    }
  };

  const tabs = [
    { id: 'profile', name: 'Profil', icon: '👤' },
    { id: 'preferences', name: 'Präferenzen', icon: '⚙️' },
    { id: 'budget', name: 'Budget', icon: '💰' },
    { id: 'privacy', name: 'Datenschutz', icon: '🔒' }
  ];

  return (
    <div className="settings-page">
      <Header title="Einstellungen" subtitle="Personalisieren Sie Ihre Arbeitsumgebung" />
      
      <div className="settings-container">
        <div className="settings-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-name">{tab.name}</span>
            </button>
          ))}
        </div>

        <div className="settings-content">
          {activeTab === 'profile' && (
            <div className="settings-section">
              <h3>Persönliche Informationen</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Vorname</label>
                  <input
                    type="text"
                    value={settings.profile.firstName}
                    onChange={(e) => handleInputChange('profile', 'firstName', e.target.value)}
                    className="settings-input"
                  />
                </div>
                <div className="form-group">
                  <label>Nachname</label>
                  <input
                    type="text"
                    value={settings.profile.lastName}
                    onChange={(e) => handleInputChange('profile', 'lastName', e.target.value)}
                    className="settings-input"
                  />
                </div>
                <div className="form-group">
                  <label>E-Mail</label>
                  <input
                    type="email"
                    value={settings.profile.email}
                    onChange={(e) => handleInputChange('profile', 'email', e.target.value)}
                    className="settings-input"
                  />
                </div>
                <div className="form-group">
                  <label>Telefon</label>
                  <input
                    type="tel"
                    value={settings.profile.phone}
                    onChange={(e) => handleInputChange('profile', 'phone', e.target.value)}
                    className="settings-input"
                  />
                </div>
                <div className="form-group">
                  <label>Abteilung</label>
                  <select
                    value={settings.profile.department}
                    onChange={(e) => handleInputChange('profile', 'department', e.target.value)}
                    className="settings-input"
                  >
                    <option value="IT">IT</option>
                    <option value="Sales">Vertrieb</option>
                    <option value="Marketing">Marketing</option>
                    <option value="HR">Personalwesen</option>
                    <option value="Finance">Finanzen</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Mitarbeiter-ID</label>
                  <input
                    type="text"
                    value={settings.profile.employeeId}
                    onChange={(e) => handleInputChange('profile', 'employeeId', e.target.value)}
                    className="settings-input"
                  />
                </div>
                <div className="form-group">
                  <label>Standard-Währung</label>
                  <select
                    value={settings.profile.defaultCurrency}
                    onChange={(e) => handleInputChange('profile', 'defaultCurrency', e.target.value)}
                    className="settings-input"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="CHF">CHF</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Sprache</label>
                  <select
                    value={settings.profile.language}
                    onChange={(e) => handleInputChange('profile', 'language', e.target.value)}
                    className="settings-input"
                  >
                    <option value="de">Deutsch</option>
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                    <option value="es">Español</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="settings-section">
              <h3>Benachrichtigungen</h3>
              <div className="toggle-group">
                <div className="toggle-item">
                  <div className="toggle-info">
                    <div className="toggle-title">E-Mail Benachrichtigungen</div>
                    <div className="toggle-desc">Erhalten Sie wichtige Updates per E-Mail</div>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.preferences.emailNotifications}
                      onChange={(e) => handleInputChange('preferences', 'emailNotifications', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="toggle-item">
                  <div className="toggle-info">
                    <div className="toggle-title">Push-Benachrichtigungen</div>
                    <div className="toggle-desc">Sofortige Benachrichtigungen im Browser</div>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.preferences.pushNotifications}
                      onChange={(e) => handleInputChange('preferences', 'pushNotifications', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="toggle-item">
                  <div className="toggle-info">
                    <div className="toggle-title">Wöchentliche Berichte</div>
                    <div className="toggle-desc">Zusammenfassung Ihrer Reiseaktivitäten</div>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.preferences.weeklyReports}
                      onChange={(e) => handleInputChange('preferences', 'weeklyReports', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="toggle-item">
                  <div className="toggle-info">
                    <div className="toggle-title">Budget-Warnungen</div>
                    <div className="toggle-desc">Benachrichtigungen bei Budgetüberschreitungen</div>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.preferences.budgetAlerts}
                      onChange={(e) => handleInputChange('preferences', 'budgetAlerts', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <h3>Darstellung</h3>
              <div className="toggle-group">
                <div className="toggle-item">
                  <div className="toggle-info">
                    <div className="toggle-title">Dark Mode</div>
                    <div className="toggle-desc">Dunkles Design für bessere Lesbarkeit</div>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.preferences.darkMode}
                      onChange={(e) => handleInputChange('preferences', 'darkMode', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="toggle-item">
                  <div className="toggle-info">
                    <div className="toggle-title">Automatisches Backup</div>
                    <div className="toggle-desc">Regelmäßige Sicherung Ihrer Daten</div>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.preferences.autoBackup}
                      onChange={(e) => handleInputChange('preferences', 'autoBackup', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'budget' && (
            <div className="settings-section">
              <h3>Budget-Einstellungen</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Jahresbudget (USD)</label>
                  <input
                    type="number"
                    value={settings.budget.yearlyBudget}
                    onChange={(e) => handleInputChange('budget', 'yearlyBudget', parseInt(e.target.value))}
                    className="settings-input"
                    min="0"
                  />
                </div>
                <div className="form-group">
                  <label>Warnschwelle (%)</label>
                  <input
                    type="number"
                    value={settings.budget.warningThreshold}
                    onChange={(e) => handleInputChange('budget', 'warningThreshold', parseInt(e.target.value))}
                    className="settings-input"
                    min="0"
                    max="100"
                  />
                </div>
                <div className="form-group">
                  <label>Max. Reisekosten (USD)</label>
                  <input
                    type="number"
                    value={settings.budget.maxTripCost}
                    onChange={(e) => handleInputChange('budget', 'maxTripCost', parseInt(e.target.value))}
                    className="settings-input"
                    min="0"
                  />
                </div>
                <div className="form-group">
                  <label>Standard-Genehmiger</label>
                  <input
                    type="email"
                    value={settings.budget.defaultApprover}
                    onChange={(e) => handleInputChange('budget', 'defaultApprover', e.target.value)}
                    className="settings-input"
                  />
                </div>
              </div>
              
              <div className="toggle-group">
                <div className="toggle-item">
                  <div className="toggle-info">
                    <div className="toggle-title">Genehmigung erforderlich</div>
                    <div className="toggle-desc">Reisen müssen vor Buchung genehmigt werden</div>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.budget.approvalRequired}
                      onChange={(e) => handleInputChange('budget', 'approvalRequired', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="settings-section">
              <h3>Datenschutz & Sicherheit</h3>
              <div className="toggle-group">
                <div className="toggle-item">
                  <div className="toggle-info">
                    <div className="toggle-title">Mit Team teilen</div>
                    <div className="toggle-desc">Teamkollegen können Ihre Reisepläne einsehen</div>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.privacy.shareWithTeam}
                      onChange={(e) => handleInputChange('privacy', 'shareWithTeam', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="toggle-item">
                  <div className="toggle-info">
                    <div className="toggle-title">Öffentliches Profil</div>
                    <div className="toggle-desc">Profil für andere Nutzer sichtbar machen</div>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.privacy.publicProfile}
                      onChange={(e) => handleInputChange('privacy', 'publicProfile', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="toggle-item">
                  <div className="toggle-info">
                    <div className="toggle-title">Analytics zulassen</div>
                    <div className="toggle-desc">Hilft uns, die App zu verbessern</div>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.privacy.analytics}
                      onChange={(e) => handleInputChange('privacy', 'analytics', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="security-section">
                <h4>🔐 Sicherheit</h4>
                <div className="security-actions">
                  <button className="security-btn">Passwort ändern</button>
                  <button className="security-btn">Zwei-Faktor-Authentifizierung einrichten</button>
                  <button className="security-btn">Aktive Sitzungen anzeigen</button>
                  <button className="security-btn danger">Konto löschen</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {hasChanges && (
        <div className="settings-actions">
          <button className="btn-secondary" onClick={handleReset}>
            Verwerfen
          </button>
          <button className="btn-primary" onClick={handleSave}>
            Änderungen speichern
          </button>
        </div>
      )}
    </div>
  );
}

export default SettingsPage;
