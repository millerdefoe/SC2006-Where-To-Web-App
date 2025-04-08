import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Car } from "../assets/Car.svg";
import { ReactComponent as Start } from "../assets/Start.svg";
import { ReactComponent as MapPin } from "../assets/MapPin.svg";
import { ReactComponent as Parking } from "../assets/Parking.svg";
import { ReactComponent as TurnLeft } from "../assets/TurnLeft.svg";
import { ReactComponent as TurnRight } from "../assets/TurnRight.svg";
import { ReactComponent as Road } from "../assets/Road.svg";
import { ReactComponent as Merge } from "../assets/Merge.svg";
import { ReactComponent as Continue } from "../assets/ContinueStraight.svg";
import { ReactComponent as UTurn } from "../assets/UTurn.svg";
import { ReactComponent as TimerIcon} from "../assets/Timer.svg";
import SettingsButton from "../components/SettingsButton";
import HomeButton from "../components/HomeButton";
import NavBar from "../components/NavigationBar";
import {ReactComponent as ViewNearbyCarParksIcon} from "../assets/ViewNearbyCarParks.svg"
import MyBookingsButton from "../components/MyBookingsButton";
import axios from "axios";
import "../styles/ViewDrivingDirections.css";
import MapWithRoute from "../components/MapDrivingRoute";
import ModeOfTransport from "../components/ModeOfTransport";

const ViewDrivingDirections = () => {
  const navigate = useNavigate();
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  useEffect(() => {
    const fetchRoute = async () => {
      const startLocation = localStorage.getItem("startLocation");
      const endLocation = localStorage.getItem("endLocation");

      const sourceCoords = {
        latitude: parseFloat(localStorage.getItem("startLat")),
        longitude: parseFloat(localStorage.getItem("startLng")),
      };

      const destinationCoords = {
        latitude: parseFloat(localStorage.getItem("endLat")),
        longitude: parseFloat(localStorage.getItem("endLng")),
      };

      setSource(startLocation);
      setDestination(endLocation);

      try {
        const response = await axios.post("http://127.0.0.1:5000/getRoute", {
          source: sourceCoords,
          destination: destinationCoords,
        });

        setRoute(response.data);
      } catch (err) {
        console.error("Error fetching route:", err);
        setError("Could not retrieve route.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoute();
  }, []);

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

  return (
    <div>
      <div className="main-container">
        <HomeButton />
        <SettingsButton />
        <NavBar />
        <ModeOfTransport Icon={Car} />
        <MyBookingsButton />
        <div className="container5">
          <div className="leftContainer5">
            {loading ? (
              <p>Loading route...</p>
            ) : error ? (
              <p className="text-red-600">{error}</p>
            ) : (
              route && (
                <div className="map-container5">
                  <MapWithRoute
                    encodedPolyline={route.polyline}
                    mapContainerClassName="map-image5"
                  />
                  <button className="view-car-parks-button1" onClick={() => navigate("/view-car-parks")}>
                    <ViewNearbyCarParksIcon className="view-car-parks-icon1" />
                  </button>
                </div>
              )
            )}
          </div>

          <div className="directions-container3">
            <button className="start-container" onClick={() => navigate("/driving-route-nav")}>
              <Start className="start-icon" />
            </button>

            {route?.steps && (
              <div className="step-list-container">
                <div className="directions-header">
                  <div className="directions-title">Directions</div>
                    <div className="directions-timer">
                      <TimerIcon />
                    </div>
                    <div className="directions-duration">
                      <h3><span><strong>{Math.ceil(parseInt(route?.duration) / 60)} mins</strong></span></h3>
                    </div>
                </div>

                <div className="step-list">
                {(() => {
                  const steps = route.steps;
                  const total = steps.length;
                  const limit = 5;

                  if (total <= limit) {
                    return steps;
                  }
                  const interval = Math.floor(total / limit);
                  return Array.from({ length: limit }, (_, i) => steps[i * interval]);
                })().map((step, index) => {
                  const Icon = iconMap[step.maneuver?.toUpperCase()] || iconMap.DEFAULT;
                  return (
                    <li key={index} className="step-item">
                      <div className="step-icon"><Icon /></div>
                      <div className="step-text">
                        <div className="step-description">
                          <p><strong>{step.instructions}</strong></p>
                        </div>
                        <div className="step-distance-duration">
                          <p>{step.distance} ({step.duration})</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </div>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default ViewDrivingDirections;
