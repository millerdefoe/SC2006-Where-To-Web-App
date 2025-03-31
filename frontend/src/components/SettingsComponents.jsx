import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/SettingsComponents.css"; 

const SettingsComponents = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Get current path
  
    return (
      <div className="sidebar-container">
        <button className="where-to-button" onClick={() => navigate("/end-location")}>
          Where to...
        </button>
  
        <div className="nav-links">
          <div
            className={`nav-item ${location.pathname === "/settings" ? "active" : ""}`}
            onClick={() => navigate("/settings")}
          >
            Settings
          </div>
          <div
            className={`nav-item ${location.pathname === "/profile-log-in" ? "active" : ""}`}
            onClick={() => navigate("/profile-log-in")}
          >
            Profile
          </div>
          <div
            className={`nav-item ${location.pathname === "/feedback" ? "active" : ""}`}
            onClick={() => navigate("/feedback")}
          >
            Feedback
          </div>
        </div>
      </div>
  );
};

export default SettingsComponents;
