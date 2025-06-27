import React, { useState, useEffect } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { downloadCSV } from '../utils/exportHelpers';

const Settings = () => {
  const { expenses, clearAllExpenses } = useExpenses();
  const [settings, setSettings] = useState({
    darkMode: localStorage.getItem('darkMode') === 'true',
    dateFormat: 'dd-MM-yyyy',
    notification: true,
    backupFrequency: 'weekly'
  });
  const [importData, setImportData] = useState(null);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'false');
    }
  }, [settings.darkMode]);

  const handleSettingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleExport = () => {
    downloadCSV(expenses);
    setFeedback('Data exported successfully!');
    setTimeout(() => setFeedback(''), 3000);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          setImportData(data);
          setFeedback('File loaded successfully. Click "Confirm Import" to proceed.');
        } catch (error) {
          setFeedback('Invalid file format. Please upload a valid JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  const confirmImport = () => {
    setFeedback('Data imported successfully!');
    setTimeout(() => setFeedback(''), 3000);
    setImportData(null);
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to delete ALL expenses? This cannot be undone.')) {
      clearAllExpenses();
      setFeedback('All expenses cleared successfully!');
      setTimeout(() => setFeedback(''), 3000);
    }
  };

  return (
    <div className="settings-container">
      <h2>Application Settings</h2>
      
      {feedback && <div className="feedback-message">{feedback}</div>}

      <div className="settings-section">
        <h3>Appearance</h3>
        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              name="darkMode"
              checked={settings.darkMode}
              onChange={handleSettingChange}
            />
            Dark Mode
          </label>
        </div>
        
        <div className="setting-item">
          <label>Primary Color</label>
          <input 
            type="color" 
            value="#4a6fa5" 
            onChange={() => {}} 
            disabled
          />
          <small>(Pro feature - coming soon)</small>
        </div>
      </div>

      <div className="settings-section">
        <h3>Data Format</h3>
        <div className="setting-item">
          <label>Currency</label>
          <input type="text" value="Indian Rupee (₹)" disabled />
        </div>
        
        <div className="setting-item">
          <label>Date Format</label>
          <select
            name="dateFormat"
            value={settings.dateFormat}
            onChange={handleSettingChange}
          >
            <option value="dd-MM-yyyy">DD-MM-YYYY</option>
            <option value="MM-dd-yyyy">MM-DD-YYYY</option>
            <option value="yyyy-MM-dd">YYYY-MM-DD</option>
          </select>
        </div>
      </div>

      <div className="settings-section">
        <h3>Data Management</h3>
        <div className="setting-item">
          <button className="btn-export" onClick={handleExport}>
            Export All Data (CSV)
          </button>
        </div>
        
        <div className="setting-item">
          <label className="btn-import">
            Import Data (JSON)
            <input 
              type="file" 
              accept=".json" 
              onChange={handleImport}
              style={{ display: 'none' }}
            />
          </label>
          {importData && (
            <button className="btn-confirm" onClick={confirmImport}>
              Confirm Import
            </button>
          )}
        </div>
        
        <div className="setting-item danger-zone">
          <h4>Danger Zone</h4>
          <button className="btn-clear" onClick={handleClearData}>
            Clear All Expenses
          </button>
          <small>This will permanently delete all your expense records</small>
        </div>
      </div>

      <div className="settings-section">
        <h3>Notifications</h3>
        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              name="notification"
              checked={settings.notification}
              onChange={handleSettingChange}
            />
            Enable Notifications
          </label>
        </div>
        
        <div className="setting-item">
          <label>Backup Frequency</label>
          <select
            name="backupFrequency"
            value={settings.backupFrequency}
            onChange={handleSettingChange}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Settings;
