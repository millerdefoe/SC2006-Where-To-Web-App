import React, { useState, useEffect } from "react";
import SettingsComponents from "../components/SettingsComponents.jsx";
import ExitSettings from "../components/ExitSettings.jsx";
import CustomDropdown from "../components/Dropdown.jsx";
import ToggleSwitch from "../components/ToggleSwitch.jsx";
import "../styles/SettingsPage.css";
import "../styles/common.css";

function SettingsPage() {
    const carParkDistanceOptions = ["500m", "1000m", "1500m", "2000m", "2500m"];

    const walkingOptions = ["300m", "400m", "500m", "600m", "700m"];

    const [carparkMaxDistance, setCarparkMaxDistance] = useState("1000m");
    const [walkingLimit, setWalkingLimit] = useState("300m");
    const [gpsEnabled, setGpsEnabled] = useState(false);

    // ✅ Load settings from localStorage on mount
    useEffect(() => {
        const savedCarparkMaxDistance = localStorage.getItem("carparkMaxDistance");
        if (savedCarparkMaxDistance) setCarparkMaxDistance(savedCarparkMaxDistance);
        
        const savedWalkingLimit = localStorage.getItem("walkingLimit");
        const savedGpsEnabled = localStorage.getItem("gpsEnabled");

        if (savedWalkingLimit) setWalkingLimit(savedWalkingLimit);
        if (savedGpsEnabled !== null) setGpsEnabled(savedGpsEnabled === "true");
    }, []);

    // ✅ Save settings to localStorage on Save
    const handleSave = () => {
        localStorage.setItem("carparkMaxDistance", carparkMaxDistance);

        localStorage.setItem("walkingLimit", walkingLimit);
        localStorage.setItem("gpsEnabled", gpsEnabled.toString());
        alert("Preferences saved successfully!");
    };

    const handleGpsToggle = () => {
        const nextValue = !gpsEnabled;
        setGpsEnabled(nextValue);
      
        if (nextValue) {
          // Ask for browser location permission
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords;
                localStorage.setItem("startLat", latitude);
                localStorage.setItem("startLng", longitude);
                console.log("Location access granted:", latitude, longitude);
                alert("Location access granted.");
              },
              (error) => {
                console.error("Error accessing location:", error.message);
                alert("Unable to access location: " + error.message);
              }
            );
          } else {
            alert("Geolocation is not supported by your browser.");
          }
        } else {
          // Optional: clear location from localStorage when GPS is turned off
          localStorage.removeItem("startLat");
          localStorage.removeItem("startLng");
        }
      };
      

    return (
        <div className="settings-page">
            <ExitSettings/>
            <div className="settingsComponent-container">
                <SettingsComponents/>
            </div>

            <div className="settings-container">
                <div className="settingsHeader-typography" style={{ fontSize: "24px", paddingLeft: "0px" }}>SETTINGS</div>
                <div className="settingsContent-typography" style={{ paddingLeft: "0px" }}>Configure your preferences here!</div>
                <div className="line-thick"></div>

                {/* Car Park Pricing Section */}
                <div className="preferences-container">
                    <div className="settingsHeader-typography">Car Park Preferences</div>
                    <div className="line-thin"></div>
                    <div className="settingsHeader-typography">Maximum Car Park Distance</div>
                    <div className="settingsContent-typography">
                        Indicate the maximum distance (in meters) you're willing to travel to a car park.
                    </div>
                    <CustomDropdown
                        options={carParkDistanceOptions}
                        selected={carparkMaxDistance}
                        setSelected={setCarparkMaxDistance}
                    />

                </div>

                {/* Walking Range Preferences */}
                <div className="preferences-container">
                    <div className="settingsHeader-typography">Walking Range Preferences</div>
                    <div className="line-thin"></div>
                    <div className="settingsHeader-typography">Maximum Walking Distance</div>
                    <div className="settingsContent-typography">
                        Indicate the maximum walking distance to and from Public Transit stations and car parks.
                    </div>
                    <CustomDropdown
                        options={walkingOptions}
                        selected={walkingLimit}
                        setSelected={setWalkingLimit}
                    />
                </div>

                {/* GPS Preferences */}
                <div className="preferences-container">
                    <div className="settingsHeader-typography">GPS Preferences</div>
                    <div className="line-thin"></div>
                    <div className="settingsHeader-typography">GPS Auto Detect</div>
                    <div className="settingsContent-typography">
                        Without indicating GPS Auto Detect, you will be required to manually input your starting location. 
                    </div>
                    <ToggleSwitch
                        isOn={gpsEnabled}
                        toggle={handleGpsToggle}
                    />
                </div>

                {/* Save and Reset buttons */}
                <div className="buttons-container">
                    <button
                        className="reset-button"
                        onClick={() => {
                            setCarparkMaxDistance("1000m");
                            setWalkingLimit("300m");
                            setGpsEnabled(false);
                            localStorage.removeItem("carparkMaxDistance");
                            localStorage.removeItem("walkingLimit");
                            localStorage.removeItem("gpsEnabled");
                            localStorage.removeItem("startLat");
                            localStorage.removeItem("startLng");
                        }}
                    >
                        Reset
                    </button>

                    <button className="save-button" onClick={handleSave}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
} 

export default SettingsPage;
