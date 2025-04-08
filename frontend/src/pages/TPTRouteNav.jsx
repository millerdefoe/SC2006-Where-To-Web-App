import React from 'react';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ReactComponent as Bus } from "../assets/Bus.svg";
import { ReactComponent as EndJourneyButton } from "../assets/EndJourney.svg";
import SettingsButton from "../components/SettingsButton";
import HomeButton from "../components/HomeButton";
import NavBar from "../components/NavigationBar";
import ModeOfTransport from "../components/ModeOfTransport";
import EndButton from '../components/EndButton';
import DirectionDescription from '../components/DirectionDescription';
import MapWithRoute from "../components/MapDrivingRoute"; // ✅ Import the map
import "../styles/TPTRouteNav.css";
import "../styles/common.css";

function TPTRouteNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { routeData } = location.state || {};

  return (
    <div className="main-container">
      <HomeButton />
      <SettingsButton />
      <NavBar />
      <ModeOfTransport Icon={Bus} />

      <div className="leftContainer3">
        <div className="map-container4">
          <MapWithRoute
            encodedPolyline={routeData?.polyline?.encodedPolyline}
            mapContainerClassName="map-image4"
          />

          <button className="endButton-container" onClick={() => navigate("/end-location")}>
              <EndJourneyButton className="endButton1-icon" />
            </button>
        </div>
      </div>

      <div className="rightContainer3">
        <div className="routeNav-container">
          <DirectionDescription routeData={routeData} />
        </div>
      </div>
    </div>
  );
}

export default TPTRouteNav;
