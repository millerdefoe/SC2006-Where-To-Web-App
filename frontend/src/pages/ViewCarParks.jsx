import React from "react";
import { ReactComponent as Car } from "../assets/Car.svg";
import SettingsButton from "../components/SettingsButton";
import HomeButton from "../components/HomeButton";
import NavBar from "../components/NavigationBar";
import ModeOfTransport from "../components/ModeOfTransport";
import "../styles/ViewCarParks.css";

function ViewCarParks() {
  return (
    <div>
      <SettingsButton/>
      <HomeButton/>
      <NavBar/>
      <ModeOfTransport Icon={Car}/>
    </div>
  );
}
export default ViewCarParks;
