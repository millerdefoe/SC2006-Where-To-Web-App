import React from "react";
import {ReactComponent as Car} from "../assets/Car.svg"; 
import { ReactComponent as Start } from "../assets/Start.svg";
import { ReactComponent as MapPin} from "../assets/MapPin.svg";
import { ReactComponent as Parking} from "../assets/Parking.svg";
import { ReactComponent as Road} from "../assets/Road.svg";
import { ReactComponent as Merge} from "../assets/Merge.svg";
import { drivingRouteData } from "../context/drivingRouteData";
import SettingsButton from "../components/SettingsButton";
import HomeButton from "../components/HomeButton";
import NavBar from "../components/NavigationBar";
import EndButton from '../components/EndButton';
import MyBookingsButton from "../components/MyBookingsButton"
import DirectionDescription from '../components/DirectionDescription';
import mapImage from "../assets/inputStartLocationMap.png";
import ModeOfTransport from "../components/ModeOfTransport";
import "../styles/DrivingRouteNav.css"; 

function DrivingRouteNav() {
  const iconMap = {
    pin: MapPin,
    parking: Parking,
    road: Road,
    merge: Merge
  };

  return (
    <div className="main-container">
      <HomeButton />
      <SettingsButton />
      <NavBar />
      <ModeOfTransport Icon={Car} />

      <div className="leftContainer4">
        <div className="map-container5">
          <img src={mapImage} alt="Map" className="map-image5" />
          <div className="endButton1-container">
            <EndButton/>
          </div>
        </div>
      </div>

      <div className="rightContainer4">
        <div className="drivingRouteNav-container">
          <div className="driving-direction-wrapper">
            <DirectionDescription
            duration={drivingRouteData.route1.duration}
            icons={drivingRouteData.route1.icons}
            directions={drivingRouteData.route1.directions}
            iconMap={iconMap} 
          />
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default DrivingRouteNav;
