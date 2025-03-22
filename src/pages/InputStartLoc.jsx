import React from 'react';
import { useNavigate } from 'react-router-dom';

function InputStartLoc() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Enter Your Starting Location</h1>
      <input type="text" placeholder="Enter Start Location" />
      <button onClick={() => navigate('/input-end')}>Next: Enter Destination</button>
    </div>
  );
}

export default InputStartLoc;
