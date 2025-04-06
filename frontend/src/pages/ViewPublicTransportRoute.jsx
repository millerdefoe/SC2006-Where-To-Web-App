import React, { useState } from 'react';
import { ReactComponent as Bus } from "../assets/Bus.svg";
import { ReactComponent as Train } from "../assets/Train.svg";
import { ReactComponent as Walking } from "../assets/Walking.svg";
import { ReactComponent as TransportArrow } from "../assets/TransportArrow.svg";
import { routeData } from "../context/routeData.js";
import SettingsButton from "../components/SettingsButton";
import HomeButton from "../components/HomeButton";
import NavBar from "../components/NavigationBar";
import StartButton from "../components/StartButton"; 
import ModeOfTransport from "../components/ModeOfTransport";
import CongestionLevelButton from '../components/CongestionLevelButton';
import RouteSelection from '../components/RouteSelection';
import DirectionDescription from '../components/DirectionDescription';
import Badge from "../components/Badge";
import mapImage from "../assets/inputStartLocationMap.png";
import "../styles/ViewPublicTransportRoute.css";
import "../styles/common.css";

function ViewPublicTransportRoute() {
  const [selectedRoute, setSelectedRoute] = useState("fastest");

  // Icon name → SVG component mapping (for rendering)
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

      <div className="leftContainer2">
        <div className="map-container3">
          <img src={mapImage} alt="Map" className="map-image3" />
        </div>

        <div className="rowContainer2">
          <CongestionLevelButton />

          <RouteSelection
            title={routeData.fastest.title}
            duration={routeData.fastest.duration}
            icons={routeData.fastest.icons}
            onSelect={() => setSelectedRoute("fastest")}
            isSelected={selectedRoute === "fastest"}
            iconMap={iconMap}
          />

          <RouteSelection
            title={routeData.leastCongested.title}
            duration={routeData.leastCongested.duration}
            icons={routeData.leastCongested.icons}
            onSelect={() => setSelectedRoute("leastCongested")}
            isSelected={selectedRoute === "leastCongested"}
            iconMap={iconMap}
          />
        </div>
      </div>

      <div className="rightContainer2">
        <div className="directions-container">
          <DirectionDescription
            duration={routeData[selectedRoute].duration}
            icons={routeData[selectedRoute].icons}
            directions={routeData[selectedRoute].directions}
            iconMap={iconMap}
          />

          <div className="startButton-container">
            <StartButton
              duration={routeData[selectedRoute].duration}
              route={routeData[selectedRoute].icons}
              directions={routeData[selectedRoute].directions}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewPublicTransportRoute;
