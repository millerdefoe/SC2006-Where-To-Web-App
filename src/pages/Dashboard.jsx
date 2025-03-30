import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    navigate('/settings?status=saved'); // change 'saved' to 'failed' if needed
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <button className="settings-button" onClick={handleSettingsClick}>
        ⚙️ Settings
      </button>
    </div>
  );
};

export default Dashboard;