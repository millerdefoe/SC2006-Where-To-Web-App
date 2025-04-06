import React, { useEffect, useState } from 'react';
import { ReactComponent as Bus } from "../assets/Bus.svg";
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
  const [routeData, setRouteData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRouteData = async () => {
      try {
        const currentLocation = {
          latitude: parseFloat(localStorage.getItem("startLat")),
          longitude: parseFloat(localStorage.getItem("startLng")),
        };

        const destinationLocation = {
          latitude: parseFloat(localStorage.getItem("endLat")),
          longitude: parseFloat(localStorage.getItem("endLng")),
        };

        // Check for NaN values before making the request
        if (
          isNaN(currentLocation.latitude) ||
          isNaN(currentLocation.longitude) ||
          isNaN(destinationLocation.latitude) ||
          isNaN(destinationLocation.longitude)
        ) {
          console.error("Invalid coordinates in localStorage");
          return;
        }

        const response = await fetch("http://127.0.0.1:5000/PublicTransportRoute", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentLocation,
            destinationLocation,
            maxWalkingDistance: 800, // Customize as needed
          }),
        });

        if (!response.ok) throw new Error("Failed to fetch route data");

        const [leastCongested, fastest] = await response.json();
        setRouteData({ leastCongested, fastest });
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching route data:", error);
      }
    };

    fetchRouteData();
  }, []);

  if (isLoading || !routeData) {
    return <div className="loading-container">Loading route data...</div>;
  }

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
            <StartButton routeData={routeData[selectedRoute]} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewPublicTransportRoute;
