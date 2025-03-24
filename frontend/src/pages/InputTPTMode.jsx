import React from 'react';
import { useNavigate } from 'react-router-dom';
import mapImage from "../assets/inputStartLocationMap.png";
import SettingsButton from "../components/SettingsButton";
import HomeButton from "../components/HomeButton";
import DrivingButton from '../components/DrivingButton';
import "../styles/InputTPTMode.css"; 
import "../styles/Common.css";

function InputTPTMode() {
  const navigate = useNavigate();

  return (
    <div className="main-container">
      <HomeButton/>
      <SettingsButton/>

      <div className="leftContainer">
          <div className="map-container">
              <img src={mapImage} alt="Map" className="map-image"/>
          </div>
      </div>
      
      <div className="rightContainer">
        <button onClick={() => navigate('/fastest-route')}>Fastest Route</button>
        <button onClick={() => navigate('/least-congested-route')}>Least Congested Route</button>
      </div>
      
    </div>
  );
}

export default InputTPTMode;
