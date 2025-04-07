import React, { useEffect, useState } from 'react';
import { ReactComponent as Bus } from "../assets/Bus.svg";
import SettingsButton from "../components/SettingsButton";
import HomeButton from "../components/HomeButton";
import NavBar from "../components/NavigationBar";
import ModeOfTransport from '../components/ModeOfTransport';
import CongestionLevelIndicator from '../components/CongestionLevelIndicator';
import "../styles/DisplayCongestionLevels.css";
import "../styles/common.css";

function DisplayCongestionLevels() {
  const [congestionData, setCongestionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 🧠 Utility to extract first/last transit steps (skip WALK)
  const getFirstAndLastTransitSteps = (steps = []) => {
    const transitSteps = steps.filter(
      (step) => step.travelMode === "BUS" || step.travelMode === "SUBWAY"
    );
    return {
      first: transitSteps[0],
      last: transitSteps.at(-1),
    };
  };

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

        const [leastCongested, fastest] = await response.json();

        const leastSteps = getFirstAndLastTransitSteps(leastCongested.steps);
        const fastestSteps = getFirstAndLastTransitSteps(fastest.steps);

        const extractedStops = [
          {
            travelMode: leastSteps.first?.travelMode,
            badgeLabel: leastSteps.first?.ServiceNumberOrLine || leastSteps.first?.MRTStopLine || "?",
            stationName: leastSteps.first?.currentStopName || "Start (Least)",
            crowdLevel: leastCongested.firstArrivalCongestionLevel,
          },
          {
            travelMode: leastSteps.last?.travelMode,
            badgeLabel: leastSteps.last?.ServiceNumberOrLine || leastSteps.last?.MRTStopLine || "?",
            stationName: leastSteps.last?.destinationStopName || "End (Least)",
            crowdLevel: leastCongested.lastDestinationCongestionLevel,
          },
          {
            travelMode: fastestSteps.first?.travelMode,
            badgeLabel: fastestSteps.first?.ServiceNumberOrLine || fastestSteps.first?.MRTStopLine || "?",
            stationName: fastestSteps.first?.currentStopName || "Start (Fastest)",
            crowdLevel: fastest.firstArrivalCongestionLevel,
          },
          {
            travelMode: fastestSteps.last?.travelMode,
            badgeLabel: fastestSteps.last?.ServiceNumberOrLine || fastestSteps.last?.MRTStopLine || "?",
            stationName: fastestSteps.last?.destinationStopName || "End (Fastest)",
            crowdLevel: fastest.lastDestinationCongestionLevel,
          }
        ];

        setCongestionData(extractedStops);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching route data:", err);
        setIsLoading(false);
      }
    };

    fetchRouteData();
  }, []);

  if (isLoading) {
    return <div className="loading-container">Loading congestion data...</div>;
  }

  // Separate MRT and Bus indicators
  const mrtIndicators = [];
  const busIndicators = [];

  for (const [index, stop] of congestionData.entries()) {
    const indicator = (
      <CongestionLevelIndicator
        key={index}
        CrowdLevel={stop.crowdLevel}
        StopName={stop.stationName}
        BadgeLabel={stop.badgeLabel}
        TravelMode={stop.travelMode}
      />
    );

    if (stop.travelMode === "BUS") {
      busIndicators.push(indicator);
    } else {
      mrtIndicators.push(indicator);
    }
  }

  return (
    <div className="main-container">
      <SettingsButton />
      <HomeButton />
      <NavBar />
      <ModeOfTransport Icon={Bus} />

      <div className="congestionLevel-container">
        <div className="congestionLevel-header">Congestion Levels</div>

        <div className="congestionLevel-container2">
          <div className="mrt-container">
            <div className="congestionLevel-header" style={{ fontSize: "1.5vw", paddingRight: "70%" }}>
              MRT Stations
            </div>
            {mrtIndicators}
          </div>

          <div className="bus-container">
            <div className="congestionLevel-header" style={{ fontSize: "1.5vw", paddingRight: "70%" }}>
              Bus Stops
            </div>
            {busIndicators}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayCongestionLevels;
