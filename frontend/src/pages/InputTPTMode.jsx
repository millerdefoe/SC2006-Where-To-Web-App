import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/inputStartLocation.css";
import mapImage from "../assets/inputStartLocationMap.png";
import carIcon from "../assets/car-icon.jpeg";
import trainIcon from "../assets/train-icon.jpeg";
import SettingsButton from "../components/SettingsButton";
import "../styles/common.css";
import mapImage from "../assets/inputStartLocationMap.png";
import SettingsButton from "../components/SettingsButton";
import HomeButton from "../components/HomeButton";
import DrivingButton from '../components/DrivingButton';
import "../styles/InputTPTMode.css"; 
import "../styles/Common.css";

function InputTPTMode() {
  const navigate = useNavigate();

  const handleSelectMode = (mode) => {
    localStorage.setItem("tptMode", mode);
    if (mode === "DRIVE") {
      navigate("/view-driving-route");
    } else if (mode === "TRANSIT") {
      navigate("/view-public-route");
    }
  };

  return (
    <div className="main-container" style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      
      {/* Left side: Map */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <img
          src={mapImage}
          alt="Map"
          style={{
            width: "300px",
            height: "auto",
            borderRadius: "12px",
            objectFit: "cover"
          }}
        />
      </div>

      {/* Right side: Icons side-by-side */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
        <div className="typography" style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#000" }}>
          Choose a travel mode
        </div>

        <div style={{ display: "flex", gap: "2rem" }}>
          <img
            src={carIcon}
            alt="Drive"
            onClick={() => handleSelectMode("DRIVE")}
            style={{ width: "80px", height: "80px", cursor: "pointer" }}
          />

          <img
            src={trainIcon}
            alt="Public Transport"
            onClick={() => handleSelectMode("TRANSIT")}
            style={{ width: "80px", height: "80px", cursor: "pointer" }}
          />
        </div>

        <SettingsButton />
      </div>
    </div>
  );
}

export default InputTPTMode;
