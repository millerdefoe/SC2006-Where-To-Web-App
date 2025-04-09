import React, { useEffect, useState } from 'react';
import { ReactComponent as Bus } from "../assets/Bus.svg";
import SettingsButton from "../components/SettingsButton";
import HomeButton from "../components/HomeButton";
import NavBar from "../components/NavigationBar";
import ModeOfTransport from '../components/ModeOfTransport';
import CongestionLevelIndicator from '../components/CongestionLevelIndicator';
import "../styles/DisplayCongestionLevels.css";
import "../styles/common.css";
import { BASE_URL } from "../utils/api";

function DisplayCongestionLevels() {
  const [congestionData, setCongestionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchCongestionData = async () => {
      try {
        const savedRouteData = localStorage.getItem("leastCongestedRouteData");
        if (!savedRouteData) {
          console.warn("No saved route data found.");
          return;
        }
        const parsedData = JSON.parse(savedRouteData);
        const response = await fetch(`${BASE_URL}/CongestionData`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(parsedData),  // ✅ Send actual JSON
          });

        if (!response.ok) throw new Error("Failed to fetch congestion data");

        const congestionList = await response.json();

        const transformed = congestionList.flatMap(route => [
            {
              routeType: route.CongestionInfo,
              ServiceNumberOrLine: route.FirstCurrentStopCongestionLevel.ServiceNumberOrLine,
              crowdLevel: route.FirstCurrentStopCongestionLevel.crowdLevel,
              currentStopName: route.FirstCurrentStopCongestionLevel.currentStopName,
              travelMode: route.FirstCurrentStopCongestionLevel.travelMode,
            },
            {
              routeType: route.CongestionInfo,
              ServiceNumberOrLine: route.lastDestinationStopCongestionLevel.ServiceNumberOrLine,
              crowdLevel: route.lastDestinationStopCongestionLevel.crowdLevel,
              currentStopName: route.lastDestinationStopCongestionLevel.destinationStopName,
              travelMode: route.lastDestinationStopCongestionLevel.travelMode,
            },
          ]);
        setCongestionData(transformed);
      } catch (e) {
        console.error("Error fetching congestion data:", e);
      }
    };

    fetchCongestionData();
  }, []);

  const mrtIndicators = [];
  const busIndicators = [];

  for (const [index, station] of congestionData.entries()) {
    const indicator = (
      <CongestionLevelIndicator
        key={index}
        CrowdLevel={station.crowdLevel}
        StopName={station.currentStopName}
        BadgeLabel={station.ServiceNumberOrLine}
        TravelMode={station.travelMode}
      />
    );

    if (station.travelMode === "BUS") {
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
            {mrtIndicators.length > 0 ? mrtIndicators : <div>No MRT data</div>}
          </div>

          <div className="bus-container">
            <div className="congestionLevel-header" style={{ fontSize: "1.5vw", paddingRight: "70%" }}>
              Bus Stops
            </div>
            {busIndicators.length > 0 ? busIndicators : <div>No Bus data</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
  

export default DisplayCongestionLevels;