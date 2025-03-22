import React from "react";
import { useNavigate } from "react-router-dom";
import SettingsButton from "../components/SettingsButton";
import HomeButton from "../components/HomeButton";
import {ReactComponent as Car} from "../assets/Car.svg"; 
import "../styles/ViewDrivingRoute.css";  

const ViewDrivingRoute = () => {

    return (
      <div>
        <HomeButton />
        <SettingsButton />
        <div className="transport-container">
          <span className="transport-label">Mode of Transport:</span>
          <div className="car-icon-container">
            <Car className="car-icon" />
          </div>
        </div>
      </div>
    );
};

export default ViewDrivingRoute;
