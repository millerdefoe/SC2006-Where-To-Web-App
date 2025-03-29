import React from 'react';
import { ReactComponent as Bus } from "../assets/Bus.svg";
import SettingsButton from "../components/SettingsButton";
import HomeButton from "../components/HomeButton";
import NavBar from "../components/NavigationBar";
import ModeOfTransport from "../components/ModeOfTransport";
import mapImage from "../assets/inputStartLocationMap.png";
import "../styles/TPTRouteNav.css";
import "../styles/common.css";

function TPTRouteNav() {
  return (
    <div className="main-container">
      <HomeButton/>
      <SettingsButton/>
      <NavBar />
      <ModeOfTransport Icon={Bus} />

      <div className="leftContainer3">
        <div className="map-container4">
          <img src={mapImage} alt="Map" className="map-image4" />
        </div>
      </div>

      <div className="rightContainer3">
        <div className="routeNav-container"></div>
      </div>
      
    </div>
  );
}

export default TPTRouteNav;
