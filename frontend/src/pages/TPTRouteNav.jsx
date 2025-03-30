import React from 'react';
import { useLocation } from "react-router-dom";
import { ReactComponent as Bus } from "../assets/Bus.svg";
import { ReactComponent as Train } from "../assets/Train.svg";
import { ReactComponent as Walking } from "../assets/Walking.svg";
import { ReactComponent as TransportArrow } from "../assets/TransportArrow.svg";
import SettingsButton from "../components/SettingsButton";
import HomeButton from "../components/HomeButton";
import NavBar from "../components/NavigationBar";
import ModeOfTransport from "../components/ModeOfTransport";
import EndButton from '../components/EndButton';
import mapImage from "../assets/inputStartLocationMap.png";
import DirectionDescription from '../components/DirectionDescription';
import "../styles/TPTRouteNav.css";
import "../styles/common.css";

function TPTRouteNav() {
  const location = useLocation();
  const { duration, route, directions } = location.state || {};

  const iconMap = {
    bus: Bus,
    train: Train,
    walking: Walking,
    arrow: TransportArrow
  };

  return (
    <div className="main-container">
      <HomeButton />
      <SettingsButton />
      <NavBar />
      <ModeOfTransport Icon={Bus} />

      <div className="leftContainer3">
        <div className="map-container4">
          <img src={mapImage} alt="Map" className="map-image4" />
          <div className="endButton-container">
            <EndButton/>
          </div>
        </div>
      </div>

      <div className="rightContainer3">
        <div className="routeNav-container">
          <DirectionDescription
            duration={duration}
            icons={route}
            directions={directions}
            iconMap={iconMap} 
          />
        </div>
      </div>
    </div>
  );
}

export default TPTRouteNav;
