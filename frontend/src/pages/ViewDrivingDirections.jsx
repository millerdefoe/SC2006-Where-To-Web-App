import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SettingsButton from "../components/SettingsButton";
import HomeButton from "../components/HomeButton";
import NavBar from "../components/NavigationBar";
import ViewNearbyCarParks from "../components/ViewCarParksButton";
import MyBookingsButton from "../components/MyBookingsButton"
import {ReactComponent as Car} from "../assets/Car.svg"; 
import {ReactComponent as View} from "../assets/View.svg";
import { ReactComponent as Start } from "../assets/Start.svg";
import axios from "axios";
import "../styles/ViewDrivingDirections.css"; 
import MapWithRoute from "../components/MapDrivingRoute";
import ModeOfTransport from "../components/ModeOfTransport";

const ViewDrivingDirections = () => {
  const navigate = useNavigate();
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const source = localStorage.getItem("startLocation");
  const destination = localStorage.getItem("endLocation");
  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:5000/getBasicRoute", {
          source,
          destination,
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
  }, [source, destination]);

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
                  <div>
                    <MapWithRoute
                      encodedPolyline={route.polyline}
                      mapContainerClassName="map-container6"
                    />
                  </div>
                )
              )}
              <div className="rowContainer5">
              <ViewNearbyCarParks/>
              <div className="greyRectangle-container4">
                <div className="greyRectangle-typography4">
                  <span>Via...</span>
                  <br />
                  <br />
                  <span>Time (Duration)</span>
                </div>
                <button className="view-icon-container2" onClick={() => navigate("/view-driving-directions")}>
                  <View className="view-icon2" />
                </button>
              </div>
              </div>
            </div>

            <div className="rightContainer5">
              <div className="directions-container3">
              <button className="start-container" onClick={() => navigate("/driving-route-nav")}>
                <Start className="start-icon" />
              </button>
              </div>
            </div>
          </div>
        </div>
        <div className="route-info-container">
          {loading && <p>Loading route...</p>}
          {error && <p className="text-red-600">{error}</p>}

          {route && (
            <>
              <div className="route-details">
                <p><strong>From:</strong> {source}</p>
                <p><strong>To:</strong> {destination}</p>
                <p><strong>Duration:</strong> {route.duration}</p>
                <p><strong>Distance:</strong> {route.distance} meters</p>
              </div>
            </>
          )}
        </div>
      </div>
    );
};

export default ViewDrivingDirections;
