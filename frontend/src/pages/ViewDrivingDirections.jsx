import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Car } from "../assets/Car.svg";
import { ReactComponent as Start } from "../assets/Start.svg";
import { ReactComponent as MapPin } from "../assets/MapPin.svg";
import { ReactComponent as Parking } from "../assets/Parking.svg";
import { ReactComponent as Road } from "../assets/Road.svg";
import { ReactComponent as Merge } from "../assets/Merge.svg";
import { ReactComponent as TimerIcon } from "../assets/Timer.svg";
import SettingsButton from "../components/SettingsButton";
import HomeButton from "../components/HomeButton";
import NavBar from "../components/NavigationBar";
import { ReactComponent as ViewNearbyCarParksIcon } from "../assets/ViewNearbyCarParks.svg";
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
  const [destination, setDestination] = useState("");

  useEffect(() => {
    const fetchRoute = async () => {
      // Retrieve the start and destination locations from localStorage
      const sourceCoords = {
        latitude: parseFloat(localStorage.getItem("startLat")),
        longitude: parseFloat(localStorage.getItem("startLng")),
      };

      // Fetch the end coordinates from localStorage, assuming these are updated when a car park is selected
      const destinationCoords = {
        latitude: parseFloat(localStorage.getItem("endLat")),
        longitude: parseFloat(localStorage.getItem("endLng")),
      };

      const endLocation = localStorage.getItem("endLocation");
      setDestination(endLocation); // You can set this to a default destination name

      try {
        const response = await axios.post("http://127.0.0.1:5000/getRoute", {
          source: sourceCoords,
          destination: destinationCoords,
        });

        setRoute(response.data);
        const etaSeconds = parseInt(response.data.duration.replace("s", ""));
        localStorage.setItem("etaSeconds", etaSeconds);
      } catch (err) {
        console.error("Error fetching route:", err);
        setError("Could not retrieve route.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoute();
  }, []); // Only run on initial render, as the destination should already be in localStorage

  const iconMap = {
    TURN_LEFT: Road,
    TURN_RIGHT: Road,
    STRAIGHT: Merge,
    MERGE: Merge,
    RAMP_LEFT: Road,
    RAMP_RIGHT: Road,
    PARKING: Parking,
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
                    const Icon = iconMap[step.maneuver] || iconMap.DEFAULT;
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
