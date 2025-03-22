import React from 'react';
import { useNavigate } from 'react-router-dom';

function FastestRoute() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Fastest Route</h1>
      <p>Displaying the fastest route...</p>
      <button onClick={() => navigate('/fastest-route-directions')}>View Directions</button>
    </div>
  );
}

export default FastestRoute;
