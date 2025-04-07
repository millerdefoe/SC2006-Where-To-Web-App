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
import MapWithRoute from "../components/MapDrivingRoute"; // ✅ IMPORT HERE
import "../styles/ViewPublicTransportRoute.css";
import "../styles/common.css";

function ViewPublicTransportRoute() {
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
  const [routeData, setRouteData] = useState([]);
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
            maxWalkingDistance: 800,
          }),
        });

        if (!response.ok) throw new Error("Failed to fetch route data");

        const [leastCongested, fastest] = await response.json();

        const transformedRouteData = [
          {
            routeType: "leastCongested",
            duration: leastCongested.duration || "",
            polyline: leastCongested.polyline,
            steps: leastCongested.steps.map(step => ({
              travelMode: step.travelMode,
              instructions: step.instructions || "",
              MRTStopLine: step.transitDetails?.line?.short_name || "",
              ServiceNumberOrLine: step.ServiceNumberOrLine || "",
              numberOfStops: step.numberOfStops || 0,
              staticDuration: step.staticDuration || "",
              distance: step.distance || ""

            }))
          },
          {
            routeType: "fastest",
            duration: fastest.duration || "",
            polyline: fastest.polyline,
            steps: fastest.steps.map(step => ({
              travelMode: step.travelMode,
              instructions: step.instructions || "",
              MRTStopLine: step.transitDetails?.line?.short_name || "",
              ServiceNumberOrLine: step.ServiceNumberOrLine || "",
              numberOfStops: step.numberOfStops || 0,
              staticDuration: step.staticDuration || "",
              distance: step.distance || ""

            }))
          }
        ];

        setRouteData(transformedRouteData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching route data:", error);
      }
    };

    fetchRouteData();
  }, []);

  if (isLoading || routeData.length === 0) {
    return <div className="loading-container">Loading route data...</div>;
  }

  const selectedRoute = routeData[selectedRouteIndex];

  return (
    <div className="main-container">
      <HomeButton />
      <SettingsButton />
      <NavBar />
      <ModeOfTransport Icon={Bus} />

      <div className="leftContainer2">
        <div className="map-container3">
          <MapWithRoute
            encodedPolyline={selectedRoute.polyline?.encodedPolyline}
            mapContainerClassName="map-image3"
          />
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
          <DirectionDescription routeData={{
            ...selectedRoute,
            steps: selectedRoute.steps

          }} />

          <div className="startButton-container">
            <StartButton routeData={{
              ...selectedRoute,
              steps: selectedRoute.steps
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewPublicTransportRoute;
