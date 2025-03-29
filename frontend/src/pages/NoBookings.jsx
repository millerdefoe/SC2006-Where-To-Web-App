import React from 'react';
import SettingsButton from "../components/SettingsButton";
import HomeButton from "../components/HomeButton";
import NavBar from "../components/NavigationBar";
import ModeOfTransport from "../components/ModeOfTransport";
import {ReactComponent as Car} from "../assets/Car.svg";
import {ReactComponent as Ghost} from "../assets/Ghost.svg";
import "../styles/NoBookings.css";

function MyBookings() {

  return (
    <div className="noBookingsPage-container">
      <HomeButton />
      <SettingsButton />
      <NavBar />
      <ModeOfTransport Icon={Car} />
      <div className="noBookingsPage-typography">My Bookings</div>
      <div className="ghost-container">
        <Ghost className="ghost-icon" />
      </div>
      <p className="ghost-typography">No bookings...</p>
    </ div>
    );
}

export default MyBookings;