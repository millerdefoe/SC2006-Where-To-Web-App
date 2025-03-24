import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome! Select an option below:</p>
      <Link to="/input-start"><button>Start Navigation</button></Link>
      <Link to="/carpark-availability"><button>Check Carpark Availability</button></Link>
      <Link to="/settings-reset"><button>Settings</button></Link>
    </div>
  );
};

export default Home;
