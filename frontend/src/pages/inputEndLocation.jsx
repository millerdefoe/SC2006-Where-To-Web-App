import React from "react";
import "../styles/inputEndLocation.css";
import mapImage from "../assets/inputStartLocationMap.png";
import SettingsButton from "../components/SettingsButton";

function InputEndLocation(){
    return (
        <div className="home-container">
            <div className="homeicon-container">
                <div className="homeicon-typography">Where to!</div>
            </div>

            <div className="map-container">
                <img src={mapImage} alt="Map" className="map-image"></img>
            </div>

            <SettingsButton /> 

            <div className="search-container">
                <input type="text" placeholder="Search....." className="search-bar"></input>
            </div>

        </div>
    );
}

export default InputEndLocation; 