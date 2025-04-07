import React, { useState} from "react"; 
import SettingsComponents from "../components/SettingsComponents.jsx";
import ExitSettings from "../components/ExitSettings.jsx";
import CustomDropdown from "../components/Dropdown.jsx";
import ToggleSwitch from "../components/ToggleSwitch.jsx";
import "../styles/SettingsPage.css";
import "../styles/common.css";

function SettingsPage() {
    const carParkOptions = ["$0", "<$1/hour", "<$2/hour", "<$3/hour", "No limit"];
    const walkingOptions = ["300m", "400m", "500m", "600m", "700m"];
    const [carparkLimit, setCarparkLimit] = useState("No limit");
    const [walkingLimit, setWalkingLimit] = useState("300m");
    const [gpsEnabled, setGpsEnabled] = useState(false);

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
                    <div className="settingsHeader-typography">Car Park Pricing Limit</div>
                    <div className="settingsContent-typography">
                        Indicate the price per hour you are willing to pay for car park.
                        By default, there is not limit set for car park pricing.
                    </div>
                    <CustomDropdown
                        options={carParkOptions}
                        selected={carparkLimit}
                        setSelected={setCarparkLimit}
                        />
                </div>

                {/* Walking Range Preferences */}
                <div className="preferences-container">
                    <div className="settingsHeader-typography">Walking Range Preferences</div>
                    <div className="line-thin"></div>
                    <div className="settingsHeader-typography">Maximumn Walking Distance</div>
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
                        toggle={() => setGpsEnabled((prev) => !prev)}
                    />
                </div>

                {/* Save and Reset buttons */}
                <div className="buttons-container">
                    <button
                    className="reset-button"
                        onClick={() => {
                            setCarparkLimit("No limit");
                            setWalkingLimit("300m");
                            setGpsEnabled(false);
                        }}
                        >
                        Reset
                    </button>

                    <button className="save-button">
                        Save
                    </button>

                </div>

            </div>
        </div>
    );
} 
export default SettingsPage; 