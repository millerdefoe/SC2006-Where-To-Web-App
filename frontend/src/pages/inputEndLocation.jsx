import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SettingsButton from "../components/SettingsButton";
import Map from "../components/Map";
import NewAutocompleteInput from "../components/NewAutocompleteInput";

import "../styles/InputEndLocation.css";

function InputEndLocation() {
  const [endLocation, setEndLocation] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (endLocation.trim()) {
      localStorage.setItem("endLocation", endLocation);
      navigate("/start-location");
    } else {
      alert("Invalid address!");
    }
  };

  return (
    <div className="home-container">
      <div className="homeicon-container">
        <div className="homeicon-typography">Where to!</div>
      </div>

      <Map
        mapContainerClassName="map-container1"
        onMapClick={(coords) => console.log("Clicked at:", coords)}
        onDragEnd={(newCenter) => console.log("Map dragged to:", newCenter)}
        onCenterChanged={(center) => console.log("Center changed:", center)}
      />

      <SettingsButton />

      <NewAutocompleteInput
        onPlaceSelect={(place) => {
          setEndLocation(place.formattedAddress);
          localStorage.setItem("endLocation", place.formattedAddress);
          console.log("Selected place:", place);
          navigate("/start-location");
        }}
      />
    </div>
  );
}

export default InputEndLocation;
