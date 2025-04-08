import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SettingsButton from "../components/SettingsButton";
import ProfileButton from "../components/ProfileButton";
import Map from "../components/Map";
import NewAutocompleteInput from "../components/NewAutocompleteInput";

import "../styles/InputEndLocation.css";

function InputEndLocation() {
  const [endLocation, setEndLocation]= useState("");

  const navigate = useNavigate();



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
      <ProfileButton />

      <NewAutocompleteInput
        onPlaceSelect={(place) => {
          setEndLocation(place.formattedAddress);
          localStorage.setItem("endLocation", place.formattedAddress);
          localStorage.setItem("endLat", place.location.lat());
          localStorage.setItem("endLng", place.location.lng());
          console.log("Selected place:", place);
          
          setTimeout(() => navigate("/start-location"), 100);
        }}
      />
    </div>
  );
}

export default InputEndLocation;
