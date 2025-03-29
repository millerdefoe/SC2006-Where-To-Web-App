import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "../styles/InputStartLocation.css";
import SettingsButton from "../components/SettingsButton";
import HomeButton1 from "../components/HomeButton1";
import NewAutocompleteInput from "../components/NewAutocompleteInput";
import "../styles/common.css";
import Map from "../components/Map";

function InputStartLocation(){
    const [mapCenter, setMapCenter] = useState({ lat: 1.3521, lng: 103.8198 });
    const [startLocation, setStartLocation] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const lat = parseFloat(localStorage.getItem("endLat"));
        const lng = parseFloat(localStorage.getItem("endLng"));
        console.log("Loaded from localStorage:", { lat, lng });

        if (!isNaN(lat) && !isNaN(lng)) {
            setMapCenter({ lat, lng });
        }
    }, []);

    return (
        <div className="main-container">
            <HomeButton1/>
            <SettingsButton/>

            <div className="leftContainer">
                <Map
                    markerPosition={mapCenter}
                    mapCenter={mapCenter}
                    mapContainerClassName="map-container"
                    onMapClick={(coords) => console.log("Clicked at:", coords)}
                    onDragEnd={(newCenter) => console.log("Map dragged to:", newCenter)}
                    onCenterChanged={(center) => console.log("Center changed:", center)}
                />
            </div>

            <div className="rightContainer">
                <div className="locationRetrieval-container">
                    <div className="locationRetrieval-header">Input Start Location</div>
                    <div className="separator"></div>
                    <div className="locationRetrieval-button">Retrieve from GPS</div>
                    <div className="separator"></div>
                    <NewAutocompleteInput
                        inputClass="locationRetrievalSearch-bar"
                        overrideDefaultStyles={true}
                        onPlaceSelect={(place) => {
                            setStartLocation(place.formattedAddress);
                            localStorage.setItem("startLocation", place.formattedAddress);
                            localStorage.setItem("startLat", place.location.lat);
                            localStorage.setItem("startLng", place.location.lng);
                            console.log("Selected place:", place);
                            navigate("/input-TPT-mode");
                        }}
                    />
                </div>

  
            </div>

        </div>
    
      );
}

export default InputStartLocation; 