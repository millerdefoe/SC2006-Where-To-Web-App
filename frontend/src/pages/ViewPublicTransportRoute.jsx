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
  const [selectedRoute, setSelectedRoute] = useState("fastest");

  const routeData = {
    fastest: {
      legs: [
        {
          title: "Fastest Route",
          duration: "960s", // 16 mins
          polyline: {
            encodedPolyline: "abc123" // fake polyline
          },
          steps: [
            {
              travelMode: "WALK",
              staticDuration: "60s"
            },
            {
              travelMode: "TRANSIT",
              transitDetails: {
                transitLine: {
                  name: "48",
                  vehicle: {
                    type: "BUS"
                  }
                }
              },
              staticDuration: "420s"
            },
            {
              travelMode: "WALK",
              staticDuration: "120s"
            }
          ]
        }
      ]
    },
  
    leastCongested: {
      legs: [
        {
          title: "Least Congested",
          duration: "1200s", // 20 mins
          polyline: {
            encodedPolyline: "xyz789"
          },
          steps: [
            {
              travelMode: "WALK",
              staticDuration: "90s"
            },
            {
              travelMode: "TRANSIT",
              transitDetails: {
                transitLine: {
                  name: "EWL",
                  vehicle: {
                    type: "SUBWAY"
                  }
                }
              },
              staticDuration: "540s"
            },
            {
              travelMode: "WALK",
              staticDuration: "120s"
            },
            {
              travelMode: "TRANSIT",
              transitDetails: {
                transitLine: {
                  name: "185",
                  vehicle: {
                    type: "BUS"
                  }
                }
              },
              staticDuration: "330s"
            }
          ]
        }
      ]
    }
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
          routeData={routeData.fastest}
          onSelect={() => setSelectedRoute("fastest")}
          isSelected={selectedRoute === "fastest"}
        />


        <RouteSelection
          routeData={routeData.leastCongested}
          onSelect={() => setSelectedRoute("leastCongested")}
          isSelected={selectedRoute === "leastCongested"}
        />

        </div>
      </div>

      <div className="rightContainer2">
        <div className="directions-container">
        <DirectionDescription routeData={routeData[selectedRoute]} />

        <div className="startButton-container">
          <StartButton routeData={routeData[selectedRoute]}/>
        </div>
        </div>
      </div>
    </div>
  );
}

export default ViewPublicTransportRoute;
