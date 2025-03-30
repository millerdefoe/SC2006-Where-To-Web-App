import React from 'react';
import { useNavigate } from 'react-router-dom';
import {ReactComponent as Bus} from "../assets/Bus.svg";
import SettingsButton from "../components/SettingsButton";
import HomeButton from "../components/HomeButton";
import NavBar from "../components/NavigationBar";
import ModeOfTransport from "../components/ModeOfTransport";
import CongestionLevelButton from '../components/CongestionLevelButton';
import RouteSelection from '../components/RouteSelection';
import mapImage from "../assets/inputStartLocationMap.png";
import "../styles/viewPublicTransportRoute.css";
import "../styles/common.css";

function ViewPublicTransportRoute() {
  const navigate = useNavigate();

  return (
    <div className="main-container">
      <HomeButton />
      <SettingsButton />
      <NavBar />
      <ModeOfTransport Icon={Bus} />

      <div className="leftContainer2">
        <div className="map-container3">
          <img src={mapImage} alt="Map" className="map-image3"/>
        </div>
        <div className="rowContainer2">
          <CongestionLevelButton/>
          <RouteSelection/>
          <RouteSelection/>

        </div>
      </div>

      <div className="rightContainer2">
        <div className="directions-container"></div>
      </div>
    </div>
  );
}

export default ViewPublicTransportRoute;
