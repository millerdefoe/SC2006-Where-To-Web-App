import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FeedbackButton from "../components/Feedback";
import '../styles/Settings.css';

const SettingsPage = () => {
  const navigate = useNavigate();

  const [carparkLimit, setCarparkLimit] = useState("No limit");
  const [walkingDistance, setWalkingDistance] = useState("No limit");
  const [gpsAutoDetect, setGpsAutoDetect] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("userSettings"));
    if (saved) {
      setCarparkLimit(saved.carparkLimit || "No limit");
      setWalkingDistance(saved.walkingDistance || "No limit");
      setGpsAutoDetect(saved.gpsAutoDetect !== undefined ? saved.gpsAutoDetect : true);
    }
  }, []);

  const handleSave = () => {
    try {
      localStorage.setItem("userSettings", JSON.stringify({
        carparkLimit,
        walkingDistance,
        gpsAutoDetect
      }));
      setMessage("Settings saved successfully ✅");
    } catch (error) {
      setMessage("Failed to save settings ❌");
    }

    setTimeout(() => setMessage(""), 3000);
  };

  const handleReset = () => {
    const defaultSettings = {
      carparkLimit: "No limit",
      walkingDistance: "No limit",
      gpsAutoDetect: true
    };
    setCarparkLimit(defaultSettings.carparkLimit);
    setWalkingDistance(defaultSettings.walkingDistance);
    setGpsAutoDetect(defaultSettings.gpsAutoDetect);
    localStorage.setItem("userSettings", JSON.stringify(defaultSettings));
    setMessage("Settings reset to default 🔄");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <div className="header-left">
          <button className="back-button" onClick={() => navigate(-1)}>←</button>
        </div>
        <div className="header-right">
          <button className="profile-button" onClick={() => navigate('/profile')}>👤</button>
        </div>
      </div>

      <h1 className="settings-title">SETTINGS</h1>
      <p className="settings-subtitle">CONFIGURE YOUR PREFERENCES HERE</p>

      {message && <div className="settings-message">{message}</div>}

      <div className="settings-group">
        <label>Carpark Pricing Limit</label>
        <select value={carparkLimit} onChange={(e) => setCarparkLimit(e.target.value)}>
          <option value="$0">$0</option>
          <option value="<$1/hour">&lt;$1/hour</option>
          <option value="<$2/hour">&lt;$2/hour</option>
          <option value="<$3/hour">&lt;$3/hour</option>
          <option value="No limit">No limit</option>
        </select>
      </div>

      <div className="settings-group">
        <label>Maximum walking distance to Bus/MRT</label>
        <select value={walkingDistance} onChange={(e) => setWalkingDistance(e.target.value)}>
          <option value="200m">200m</option>
          <option value="500m">500m</option>
          <option value="1km">1km</option>
          <option value="No limit">No limit</option>
        </select>
      </div>

      <div className="settings-group switch-group">
        <label>GPS Auto Detect</label>
        <label className="switch">
          <input type="checkbox" checked={gpsAutoDetect} onChange={() => setGpsAutoDetect(!gpsAutoDetect)} />
          <span className="slider round"></span>
        </label>
      </div>

      <div className="button-group">
        <button className="save-button" onClick={handleSave}>Save</button>
        <button className="reset-button" onClick={handleReset}>Reset</button>
      </div>

      <FeedbackButton />
    </div>
  );
};

export default SettingsPage;
