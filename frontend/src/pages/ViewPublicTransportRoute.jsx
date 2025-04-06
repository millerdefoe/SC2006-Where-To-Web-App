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
import mapImage from "../assets/inputStartLocationMap.png";
import "../styles/ViewPublicTransportRoute.css";
import "../styles/common.css";

function ViewPublicTransportRoute() {
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0); // 0 = least congested, 1 = fastest

  //replace routeData with api
  const routeData = [
    {
      routeType: "leastCongested",
      duration: "1200s",
      polyline: { encodedPolyline: "xyz789" },
      steps: [
        { travelMode: "WALK", instructions: "Walk to MRT station" },
        { travelMode: "SUBWAY", MRTStopLine: "EWL", instructions: "Take EWL MRT to City Hall" },
        { travelMode: "WALK", instructions: "Walk to Bus Stop" },
        { travelMode: "BUS", ServiceNumberOrLine: "185", instructions: "Board Bus 185 to Jurong West" },
        { travelMode: "WALK", instructions: "Walk to destination" }
      ]
    },
    {
      routeType: "fastest",
      duration: "960s",
      polyline: { encodedPolyline: "abc123" },
      steps: [
        { travelMode: "WALK", instructions: "Walk to MRT station" },
        { travelMode: "SUBWAY", MRTStopLine: "TEL", instructions: "Take TEL MRT to Stevens" },
        { travelMode: "WALK", instructions: "Walk to Bus Stop" },
        { travelMode: "BUS", ServiceNumberOrLine: "52", instructions: "Board Bus 52 to Bukit Timah" },
        { travelMode: "WALK", instructions: "Walk to destination" }
      ]
    }
  ];

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
            routeData={routeData[0]}
            onSelect={() => setSelectedRouteIndex(0)}
            isSelected={selectedRouteIndex === 0}
          />

          <RouteSelection
            routeData={routeData[1]}
            onSelect={() => setSelectedRouteIndex(1)}
            isSelected={selectedRouteIndex === 1}
          />
        </div>
      </div>

      <div className="rightContainer2">
        <div className="directions-container">
          <DirectionDescription routeData={routeData[selectedRouteIndex]} />

          <div className="startButton-container">
            <StartButton routeData={routeData[selectedRouteIndex]} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewPublicTransportRoute;
