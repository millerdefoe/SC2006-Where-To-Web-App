import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginPage from '../components/LoginPage';

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="relative min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">Home Page</h1>
      <p className="mb-4 text-gray-700">Welcome! Select an option below:</p>

      <div className="space-x-4">
        <Link to="/input-start">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Start Navigation
          </button>
        </Link>
        <Link to="/carpark-availability">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Check Carpark Availability
          </button>
        </Link>
        <Link to="/settings-reset">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Settings
          </button>
        </Link>
      </div>

      <button
        onClick={() => setShowLogin(true)}
        className="absolute top-4 right-4 text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
      >
        Profile
      </button>

      {showLogin && <LoginPage onClose={() => setShowLogin(false)} />}
    </div>
  );
};

export default Home;
