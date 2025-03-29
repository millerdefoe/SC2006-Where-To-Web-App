import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SettingsButton from "../components/SettingsButton";
import HomeButton from "../components/HomeButton";
import NavBar from "../components/NavigationBar";
import ViewNearbyCarParks from "../components/ViewCarParksButton";
import mapImage from "../assets/inputStartLocationMap.png";
import {ReactComponent as Car} from "../assets/Car.svg"; 
import {ReactComponent as View} from "../assets/View.svg";
import axios from "axios";
import "../styles/ViewDrivingRoute.css";  
import MapWithRoute from "../components/MapRoute";
import ModeOfTransport from "../components/ModeOfTransport";
import MyBookingsButton from "../components/MyBookingsButton";

const ViewDrivingRoute = () => {
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
        <HomeButton />
        <SettingsButton />
        <NavBar />
        <ModeOfTransport Icon={Car} />
        <MyBookingsButton />

        <div className="map-wrapper">
          <div className="map-container5">
            <img src={mapImage} alt="Map" className="map-image5"></img>
          </div>
          <div className="route-information-container">
            <ViewNearbyCarParks />
            <div className="greyRectangle-container1">
              <div className="greyRectangle-typography1">
                <span>Via...</span>
                <br />
                <br />
                <span>Time (Duration)</span>
              </div>
              <button className="view-icon-container1" onClick={() => navigate("/view-driving-directions")}>
                <View className="view-icon1" />
              </button>
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

              <div>
                <MapWithRoute
                  encodedPolyline={route.polyline}
                  apiKey="AIzaSyCzadzqXtS0hgKAHG-Mo5DHAf1yS2f1_2c"
                />
              </div>
            </>
          )}
        </div>
      </div>
    );
};

export default ViewDrivingRoute;
