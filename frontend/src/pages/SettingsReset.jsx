import React from 'react';
import { useNavigate } from 'react-router-dom';
import FeedbackButton from "../components/FeedbackButton.jsx";

function SettingsReset() {
  const navigate = useNavigate();

  return (
    <div>
      <FeedbackButton />
      <h1>Settings</h1>
      <button>Reset Preferences</button>
    </div>
  );
}

export default SettingsReset;
