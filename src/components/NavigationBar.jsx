import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NavigationBar.css';

function NavigationBar() {
  const navigate = useNavigate();

  return (
    <div className="navigation-bar">
      {/* Existing navigation buttons/icons here */}
      <button
        className="feedback-nav-button"
        onClick={() => navigate('/feedback')}
      >
        Feedback
      </button>
      {/* Rest of your nav items like profile icon */}
    </div>
  );
}

export default NavigationBar;
