import React from "react";
import { useNavigate } from "react-router-dom";
import mapImage from "../assets/inputStartLocationMap.png";
import SettingsButton from "../components/SettingsButton";
import HomeButton from "../components/HomeButton";
import HomeButton1 from "../components/HomeButton1";
import DrivingButton from '../components/DrivingButton';
import "../styles/InputTPTMode.css"; 
import "../styles/common.css";
import TransportButton from "../components/TransportButton";

function InputTPTMode() {
  const navigate = useNavigate();

  const handleSelectMode = (mode) => {
    localStorage.setItem("tptMode", mode);
    if (mode === "DRIVE") {
      navigate("/view-driving-route");
    } else if (mode === "TRANSIT") {
      navigate("/view-public-route");
    }
  };

  return (
    <div className="main-container">
        <SettingsButton/> 
        <HomeButton1/>

        <div className="leftContainer">
          <div className="map-container2">
             <img src={mapImage} alt="Map" className="map-image2"/>
          </div>
        </div>

        <div className="rightContainer">
          <div className="greyRectangle-container">My Location</div>
          <div className="rowContainer">
            <div className="greySquare-container">
              By Car
              <DrivingButton/>
            </div>
            <div className="greySquare-container">
              By MRT
              <TransportButton/>
            </div>
          </div>
          <div className="greyRectangle-container">XXX Location</div>

        </div>
    </div>
  );
}

export default InputTPTMode;
