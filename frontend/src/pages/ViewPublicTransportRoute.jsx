import React, { useState } from 'react';
import { ReactComponent as Bus } from "../assets/Bus.svg";
import { ReactComponent as Train } from "../assets/Train.svg";
import { ReactComponent as Walking } from "../assets/Walking.svg";
import { ReactComponent as TransportArrow } from "../assets/TransportArrow.svg";
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

  const routeData = {
    fastest: {
      title: "Fastest Route",
      duration: "25 mins",
      icons: [
        { type: "svg", component: Walking },
        { type: "svg", component: TransportArrow },
        { type: "svg", component: Bus },
        { type: "badge", label: "48", isBus: true },
        { type: "svg", component: TransportArrow },
        { type: "svg", component: Walking },
        { type: "svg", component: TransportArrow },
        { type: "svg", component: Train },
        { type: "badge", label: "TEL" },
        { type: "svg", component: TransportArrow },
        { type: "svg", component: Walking }
      ],
      directions: (
        <div>
          <p>Input Directions for Fastest Route</p>
        </div>
      ),
      
    },
    leastCongested: {
      title: "Less Congested Route",
      duration: "30 mins",
      icons: [
        { type: "svg", component: Walking },
        { type: "svg", component: TransportArrow },
        { type: "svg", component: Bus },
        { type: "badge", label: "14", isBus: true },
        { type: "svg", component: TransportArrow },
        { type: "svg", component: Train },
        { type: "badge", label: "DTL" },
        { type: "svg", component: TransportArrow },
        { type: "svg", component: Walking },
        { type: "svg", component: TransportArrow },
        { type: "svg", component: Train },
        { type: "badge", label: "NEL" },
      ],
      directions: (
        <div>
          <p>Input Directions for Less Congested Route</p>
        </div>
      ),
    },
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
          />

          <RouteSelection
            title={routeData.leastCongested.title}
            duration={routeData.leastCongested.duration}
            icons={routeData.leastCongested.icons}
            onSelect={() => setSelectedRoute("leastCongested")}
            isSelected={selectedRoute === "leastCongested"}
          />
        </div>
      </div>

      <div className="rightContainer2">
        <div className="directions-container">
          <DirectionDescription
            duration={routeData[selectedRoute].duration}
            icons={routeData[selectedRoute].icons}
            directions={routeData[selectedRoute].directions}
          />

          <div className="startButton-container">
            <StartButton/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewPublicTransportRoute;
