import React from "react";
import "../styles/inputStartLocation.css";
import "../styles/common.css";
import mapImage from "../assets/inputStartLocationMap.png";
import settingsImage from "../assets/settingsIconImage.png";

function InputStartLocation(){
    return (
        <div className="main-container">
            <div className="homeIcon-container">
                <div className="typography" style={{color: "#000"}}>Where To!</div>
            </div>

            <div className="map-container">
                <img src={mapImage} alt="Map" className="map-image"></img>
            </div>

            <div className="settingsIcon-container">
                <img src={settingsImage} alt="Settings Icon" className="settings-icon"/>
                <div className="settingsicon-image"></div>
            </div>

            <div className="locationRetreval-container">
                <div className="locationRetrieval-header">Input Start Location</div>
                <div className="separator"></div>
                <div className="locationRetrieval-button">Retrieve From GPS</div>
                <div className="separator"></div>
                <input type="text" placeholder="Search" className="locationRetrievalSearch-bar"></input>
            </div>

            <div className="greyRectangle-container">
                <div className="typography" style={{color: "#000"}}>XXX Location</div>
            </div>
        </div>
    );
}

export default InputStartLocation; 