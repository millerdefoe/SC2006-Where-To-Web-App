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

  useEffect(() => {
    // Sample mock data
    const routeData = [
      {
        CongestionInfo: "leastCongested",
        FirstCurrentStopCongestionLevel: {
          ServiceNumberOrLine: "154",
          crowdLevel: "SDA",
          currentStopName: "Carrier S'pore",
          travelMode: "BUS",
        },
        lastDestinationStopCongestionLevel: {
          ServiceNumberOrLine: "Thomson East Coast Line",
          crowdLevel: "m",
          currentStopName: "Tanjong Katong",
          travelMode: "SUBWAY",
        },
      },
      {
        CongestionInfo: "fastest",
        FirstCurrentStopCongestionLevel: {
          ServiceNumberOrLine: "201",
          crowdLevel: "LSD",
          currentStopName: "Aft Teban Gdns Cres",
          travelMode: "BUS",
        },
        lastDestinationStopCongestionLevel: {
          ServiceNumberOrLine: "201",
          crowdLevel: "SDA",
          currentStopName: "Clementi Stn Exit A",
          travelMode: "BUS",
        },
      },
    ];

    // Flatten and transform to a usable format
    const transformed = routeData.flatMap(route => [
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
        currentStopName: route.lastDestinationStopCongestionLevel.currentStopName,
        travelMode: route.lastDestinationStopCongestionLevel.travelMode,
      },
    ]);

    setCongestionData(transformed);
    setIsLoading(false);
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
        StopName={stop.currentStopName}
        BadgeLabel={stop.ServiceNumberOrLine}
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
