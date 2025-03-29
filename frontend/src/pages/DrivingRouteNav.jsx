import React from "react";
import SettingsButton from "../components/SettingsButton";
import HomeButton from "../components/HomeButton";
import NavBar from "../components/NavigationBar";
import MyBookingsButton from "../components/MyBookingsButton"
import {ReactComponent as Car} from "../assets/Car.svg"; 
import "../styles/ViewDrivingDirections.css"; 
import ModeOfTransport from "../components/ModeOfTransport";

function DrivingRouteNav() {
  return (
    <div>
      <HomeButton />
        <SettingsButton />
        <NavBar />
        <ModeOfTransport Icon={Car} />
        <MyBookingsButton />
    </div>
  );
}

export default DrivingRouteNav;
