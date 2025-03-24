import React from 'react';
import { useNavigate } from 'react-router-dom';

function InputEndLoc() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Enter Your Destination</h1>
      <input type="text" placeholder="Enter Destination" />
      <button onClick={() => navigate('/input-transport-mode')}>Next: Select Transport Mode</button>
    </div>
  );
}

export default InputEndLoc;
