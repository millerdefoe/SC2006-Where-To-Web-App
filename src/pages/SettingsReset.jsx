import React from 'react';
import { useNavigate } from 'react-router-dom';

function SettingsReset() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Settings</h1>
      <button>Reset Preferences</button>
      <br /><br />
      <button onClick={() => navigate('/feedback')}>Give Feedback</button>
    </div>
  );
}

export default SettingsReset;
