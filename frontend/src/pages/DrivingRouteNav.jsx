import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Car } from "../assets/Car.svg";
import { ReactComponent as MapPin } from "../assets/MapPin.svg";
import { ReactComponent as Parking } from "../assets/Parking.svg";
import { ReactComponent as Road } from "../assets/Road.svg";
import { ReactComponent as Merge } from "../assets/Merge.svg";
import { ReactComponent as Continue } from "../assets/ContinueStraight.svg";
import { ReactComponent as TurnLeft } from "../assets/TurnLeft.svg";
import { ReactComponent as TurnRight } from "../assets/TurnRight.svg";
import { ReactComponent as UTurn } from "../assets/UTurn.svg";
import { ReactComponent as TimerIcon } from "../assets/Timer.svg";
import { ReactComponent as EndJourneyButton } from "../assets/EndJourney.svg";
import SettingsButton from "../components/SettingsButton";
import HomeButton from "../components/HomeButton";
import NavBar from "../components/NavigationBar";
import MyBookingsButton from "../components/MyBookingsButton";
import ModeOfTransport from "../components/ModeOfTransport";
import MapWithRoute from "../components/MapDrivingRoute";
import axios from "axios";
import "../styles/DrivingRouteNav.css";



function DrivingRouteNav() {
  const navigate = useNavigate();
  const [route, setRoute] = useState(null);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  const iconMap = {
    TURN_LEFT: TurnLeft,
    TURN_RIGHT: TurnRight,
    UTURN_RIGHT: UTurn,
    UTURN_LEFT: UTurn,
    STRAIGHT: Continue,
    MERGE: Merge,
    RAMP_LEFT: Road,
    RAMP_RIGHT: Road,
    PARKING: Parking,
    CONTINUE: Continue,
    DEFAULT: MapPin,
  };

  const selectedLat = parseFloat(localStorage.getItem("selectedCarparkLat"));
  const selectedLng = parseFloat(localStorage.getItem("selectedCarparkLng"));
  
  
  useEffect(() => {
    const fetchRoute = async () => {
      const startLocation = localStorage.getItem("startLocation");
      const endLocation = localStorage.getItem("endLocation");
  
      const sourceCoords = {
        latitude: parseFloat(localStorage.getItem("startLat")),
        longitude: parseFloat(localStorage.getItem("startLng")),
      };
  
      const destinationCoords = {
        latitude: !isNaN(selectedLat) ? selectedLat : parseFloat(localStorage.getItem("endLat")),
        longitude: !isNaN(selectedLng) ? selectedLng : parseFloat(localStorage.getItem("endLng")),
      };
      
  
      setDestination(!isNaN(selectedLat) ? "Selected Carpark" : endLocation);

  
      try {
        const response = await axios.post("http://127.0.0.1:5000/getRoute", {
          source: sourceCoords,
          destination: destinationCoords,
        });
  
        setRoute(response.data);
      } catch (err) {
        console.error("Error fetching route:", err);
      }
    };
  
    fetchRoute();
  }, []);
  

  return (
    <div className="main-container">
      <HomeButton />
      <SettingsButton />
      <NavBar />
      <ModeOfTransport Icon={Car} />
      <MyBookingsButton />

      <div className ="container4">
        <div className="leftContainer4">
          <div className="map-container5">
            {route && (
              <MapWithRoute
                encodedPolyline={route.polyline}
                mapContainerClassName="map-image5"
              />
            )}
            <button className="endButton1-container" onClick={() => navigate("/end-location")}>
              <EndJourneyButton className="endButton1-icon" />
            </button>
          </div>
        </div>

        <div className="rightContainer4">
          <div className="drivingRouteNav-container">
            {route && (
              <div className="directions-header1">
                <div className="directions-title1">Directions</div>
                <div className="directions-timer1">
                  <TimerIcon />
                </div>
                <div className="directions-duration1">
                  <h3><span><strong>{Math.ceil(parseInt(route?.duration) / 60)} mins</strong></span></h3>
                </div>
              </div>
            )}
            <ol className="step-list1">
            {route?.steps && (
              <div className="step-list1"> 
                {route.steps.map((step, index) => {
                  const maneuverType = step.maneuver?.toUpperCase(); 
                  const Icon = iconMap[maneuverType] || iconMap.DEFAULT;
                  console.log(`Maneuver: ${maneuverType}, Icon: ${Icon}`);

                  return (
                    <li key={index} className="step-item1"> 
                      <div className="step-icon1"> 
                        <Icon />
                      </div>
                      <div className="step-text1"> 
                        <div className="step-description1"> 
                          <p><strong>{step.instructions}</strong></p>
                        </div>
                        <div className="step-distance-duration1"> 
                          <p>{step.distance} ({step.duration})</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </div>
            )}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DrivingRouteNav;
