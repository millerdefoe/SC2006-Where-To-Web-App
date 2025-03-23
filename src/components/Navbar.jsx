import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/input-start">Start Location</NavLink></li>
        <li><NavLink to="/carpark-availability">Carpark Availability</NavLink></li>
        <li><NavLink to="/settings-reset">Settings</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navbar;
