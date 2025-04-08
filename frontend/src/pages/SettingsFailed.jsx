import React from 'react';
import FeedbackButton from "../components/FeedbackButton.jsx";

function SettingsFailed() {
  return (
    <div>
      <FeedbackButton />
      
      <h1>Settings Save Failed</h1>
      <p>There was an error saving your settings.</p>
    </div>
  );
}

export default SettingsFailed;
