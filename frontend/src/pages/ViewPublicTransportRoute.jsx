import React, { useState, useEffect } from 'react';
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
import MapWithRoute from "../components/MapDrivingRoute"; // Assuming you have a MapWithRoute component

function ViewPublicTransportRoute() {
  const [selectedRoute, setSelectedRoute] = useState("fastest");
  const [dynamicRouteData, setDynamicRouteData] = useState({
    fastest: null,
    leastCongested: null
  });
  useEffect(() => {
    const fetchRoutes = async () => {
      const currentLocation = {
        latitude: parseFloat(localStorage.getItem("startLat")),
        longitude: parseFloat(localStorage.getItem("startLng"))
      };
  
      const destinationLocation = {
        latitude: parseFloat(localStorage.getItem("endLat")),
        longitude: parseFloat(localStorage.getItem("endLng"))
      };
  
      try {
        const response = await fetch("http://127.0.0.1:5000/PublicTransportRoute", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            currentLocation,
            destinationLocation,
            maxWalkingDistance: 1.5
          })
        });
  
        const data = await response.json();
  
        setDynamicRouteData({
          fastest: {
            title: "Fastest Route",
            duration: `${Math.ceil(data.fastest.duration / 60)} mins`,
            icons: data.fastest.icons,
            directions: data.fastest.directions,
            polyline: data.fastest.polyline
          },
          leastCongested: {
            title: "Less Congested Route",
            duration: `${Math.ceil(data.leastCongested.duration / 60)} mins`,
            icons: data.leastCongested.icons,
            directions: data.leastCongested.directions,
            polyline: data.leastCongested.polyline
          }
        });
  
      } catch (error) {
        console.error("Failed to fetch public transport routes", error);
      }
    };
  
    fetchRoutes();
  }, []);
    

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
          {dynamicRouteData[selectedRoute]?.polyline ? (
            <MapWithRoute
              encodedPolyline={dynamicRouteData[selectedRoute].polyline}
              mapContainerClassName="map-image3" // or update the class if needed
            />
          ) : (
            <p>Loading map...</p>
          )}
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
