import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPage from '../components/LoginPage';

const Settings = () => {
  const navigate = useNavigate();

  // For login popup
  const [showLogin, setShowLogin] = useState(false);

  // For showing result message
  const [status, setStatus] = useState('default'); // 'default', 'saved', 'failed'

  const handleResetPreferences = () => {
    // Simulate save logic
    const success = Math.random() < 0.7; // 70% chance to simulate success
    if (success) {
      setStatus('saved');
    } else {
      setStatus('failed');
    }
  };

  return (
    <div className="relative min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Settings</h1>

      <button
        onClick={() => setShowLogin(true)}
        className="absolute top-4 right-4 text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
      >
        Profile
      </button>

      {showLogin && <LoginPage onClose={() => setShowLogin(false)} />}

      {status === 'default' && (
        <>
          <button
            onClick={handleResetPreferences}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Reset Preferences
          </button>
          <br /><br />
          <button
            onClick={() => navigate('/feedback')}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Give Feedback
          </button>
        </>
      )}

      {status === 'saved' && (
        <div className="mt-6 text-green-700 font-semibold">
          <h2 className="text-xl">Settings Saved</h2>
          <p>Your settings have been successfully saved.</p>
        </div>
      )}

      {status === 'failed' && (
        <div className="mt-6 text-red-700 font-semibold">
          <h2 className="text-xl">Settings Save Failed</h2>
          <p>There was an error saving your settings.</p>
        </div>
      )}
    </div>
  );
};

export default Settings;
