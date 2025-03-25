import React from "react";
import { ReactComponent as Car } from "../assets/Car.svg";
import SettingsButton from "../components/SettingsButton";
import HomeButton from "../components/HomeButton";
import NavBar from "../components/NavigationBar";
import "../styles/ViewCarParks.css";

function ViewCarParks() {
  return (
    <div>
      <SettingsButton/>
      <HomeButton/>
      <div className="wrapper-container">
        <NavBar />
        <div className="mode-of-transport-container">
          <span className="transport-label">Mode of Transport:</span>
          <div className="car-icon-container">
            <Car className="car-icon" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default ViewCarParks;
