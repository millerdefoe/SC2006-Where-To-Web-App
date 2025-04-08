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

  useEffect(() => {
    const fetchCongestionData = async () => {
      try {
        const savedRouteData = localStorage.getItem("leastCongestedRouteData");
        if (!savedRouteData) {
          console.warn("No saved route data found.");
          return;
        }
        const parsedData = JSON.parse(savedRouteData);
        const response = await fetch("http://127.0.0.1:5000/CongestionData", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(parsedData),  // ✅ Send actual JSON
          });

        if (!response.ok) throw new Error("Failed to fetch congestion data");

        const congestionList = await response.json();
        setCongestionData(congestionList);
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
        StopName={station.stationName}
        BadgeLabel={station.badgeLabel}
      />
    );

    if (!isNaN(Number(station.badgeLabel))) {
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
