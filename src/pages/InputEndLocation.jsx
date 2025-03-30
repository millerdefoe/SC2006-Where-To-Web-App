import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import '../styles/inputEndLocation.css';
import mapImage from "../assets/inputStartLocationMap.png";
import SettingsButton from "../components/SettingsButton";

function InputEndLocation(){
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

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    return (
        <div className="home-container">
            <div className="homeicon-container">
                <div className="homeicon-typography">Where to!</div>
            </div>

            <div className="map-container1">
                <img src={mapImage} alt="Map" className="map-image1"></img>
            </div>

            <SettingsButton /> 

            <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Search....." 
                    className="search-bar"
                    value={endLocation}
                    onChange={(e) => setEndLocation(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </div>
    );
}

export default InputEndLocation; 