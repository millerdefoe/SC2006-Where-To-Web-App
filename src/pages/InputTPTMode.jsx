import React from 'react';
import { useNavigate } from 'react-router-dom';

function InputTPTMode() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Select Transport Mode</h1>
      <button onClick={() => navigate('/fastest-route')}>Fastest Route</button>
      <button onClick={() => navigate('/least-congested-route')}>Least Congested Route</button>
    </div>
  );
}

export default InputTPTMode;
