import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as MapPin } from "../assets/MapPin.svg";
import SettingsButton from "../components/SettingsButton";
import HomeButton1 from "../components/HomeButton1";
import DrivingButton from '../components/DrivingButton';
import "../styles/InputTPTMode.css"; 
import "../styles/common.css";
import Map from "../components/Map";
import TransportButton from "../components/TransportButton";

function InputTPTMode() {
  const [mapCenter, setMapCenter] = useState({ lat: 1.3521, lng: 103.8198 });
  const navigate = useNavigate();

  const handleSelectMode = (mode) => {
    localStorage.setItem("tptMode", mode);
    if (mode === "DRIVE") {
      navigate("/view-driving-directions");
    } else if (mode === "TRANSIT") {
      navigate("/view-public-route");
    }
  };
  useEffect(() => {
      const lat = parseFloat(localStorage.getItem("endLat"));
      const lng = parseFloat(localStorage.getItem("endLng"));
      console.log("Loaded from localStorage:", { lat, lng });

      if (!isNaN(lat) && !isNaN(lng)) {
          setMapCenter({ lat, lng });
      }
  }, []);

  const endLocation = localStorage.getItem("endLocation");

  return (
    <div className="main-container">
        <SettingsButton/> 
        <HomeButton1/>

        <div className="leftContainer">
          <Map
            markerPosition={mapCenter}
            mapCenter={mapCenter}
            mapContainerClassName="map-container2"
            onMapClick={(coords) => console.log("Clicked at:", coords)}
            onDragEnd={(newCenter) => console.log("Map dragged to:", newCenter)}
            onCenterChanged={(center) => console.log("Center changed:", center)}
          />
        </div>

        <div className="rightContainer">
          <div className="greyRectangle-container" style={{justifyContent: "center"}}>My Location</div>
          <div className="rowContainer">
            <div className="greySquare-container">
              By Car
              <DrivingButton/>
            </div>
            <div className="greySquare-container">
              By MRT
              <TransportButton/>
            </div>
          </div>
          <div className="greyRectangle-container" style={{fontSize: "14px", fontWeight:"500", width: "100%"}}>
            <MapPin className="destination-icon" />
            {endLocation}
          </div>

        </div>
    </div>
  );
}

export default InputTPTMode;
