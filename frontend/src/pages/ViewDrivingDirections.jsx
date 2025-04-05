import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Car } from "../assets/Car.svg";
import { ReactComponent as Start } from "../assets/Start.svg";
import { ReactComponent as MapPin } from "../assets/MapPin.svg";
import { ReactComponent as Parking } from "../assets/Parking.svg";
import { ReactComponent as Road } from "../assets/Road.svg";
import { ReactComponent as Merge } from "../assets/Merge.svg";
import SettingsButton from "../components/SettingsButton";
import HomeButton from "../components/HomeButton";
import NavBar from "../components/NavigationBar";
import ViewNearbyCarParks from "../components/ViewCarParksButton";
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
                <MapWithRoute
                  encodedPolyline={route.polyline}
                  mapContainerClassName="map-container6"
                />
              )
            )}
            <div className="rowContainer5">
              <ViewNearbyCarParks />
              <div className="greyRectangle-container4">
                <div className="greyRectangle-typography4">
                  <span>Via...</span>
                  <br />
                  <br />
                  <span>Time (Duration)</span>
                </div>
              </div>
            </div>
          </div>

          {/* 🧭 Right-side directions panel */}
          <div className="rightContainer5">
            <div className="directions-container3">
              <button className="start-container" onClick={() => navigate("/driving-route-nav")}>
                <Start className="start-icon" />
              </button>

              {route?.steps && (
                <div className="step-list-container">
                  <h3>Step-by-step Directions</h3>
                  <ol className="step-list">
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
                            <p><strong>{step.instructions}</strong></p>
                            <p>{step.distance} • {step.duration}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              )}


              <div className="route-details">
                <p><strong>From:</strong> {source}</p>
                <p><strong>To:</strong> {destination}</p>
                <p><strong>Duration:</strong> {Math.ceil(parseInt(route?.duration) / 60)} min</p>

                <p><strong>Distance:</strong> {route?.distance} meters</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDrivingDirections;
