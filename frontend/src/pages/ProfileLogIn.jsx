import React from 'react';
import { useNavigate } from 'react-router-dom';
import SettingsComponents from "../components/SettingsComponents.jsx";
import ExitSettings from "../components/ExitSettings.jsx";
import { ReactComponent as SignInButton } from "../assets/SignInButton.svg";
import { ReactComponent as InputRectangle } from "../assets/InputRectangle.svg";
import "../styles/ProfileLogIn.css";

function ProfileLogIn() {

    const navigate = useNavigate();

  return (
    <div className="profile1-page">
            <ExitSettings/>
            <SettingsComponents/>

            <div className="profile1-container">
                <div className="profileHeader1-typography" style={{ fontSize: "24px", paddingLeft: "0px" }}>PROFILE</div>
                <div className="profileContent1-typography" style={{ paddingLeft: "0px" }}>Create an account or log in!</div>
                <div className="line-thick"></div>

                <div className="emailPhone-container">
                    <div className="profileHeader1-typography">Email / Phone Number</div>
                    <div className="inputRectangle-container">
                        <InputRectangle className="inputRectangle-icon" />
                        <div className="profileContent1-typography"></div>
                    </div>
                </div>

                <div className="password-container">
                    <div className="profileHeader1-typography">Password</div>
                    <div className="inputRectangle-container">
                        <InputRectangle className="inputRectangle-icon" />
                        <div className="profileContent1-typography"></div>
                    </div>
                    <div className="passwordRequirement-container">
                        <div className="passwordRequirement-typography">Use 8 or more characters</div>
                        <div className="passwordRequirement-typography">Use upper and lower case letters (e.g. Aa)</div>
                        <div className="passwordRequirement-typography">Use a number (e.g. 1234)</div>
                    </div>
                </div>

                <div className="rfidTag-container">
                    <div className="profileHeader1-typography">RFID Tag (Optional)</div>
                    <div className="inputRectangle-container">
                        <InputRectangle className="inputRectangle-icon" />
                        <div className="profileContent1-typography"></div>
                    </div>
                </div>

                <button className="signIn-container" onClick={() => navigate("/profile-signed-in")}>
                    <SignInButton className="signIn-icon" />
                </button>
            </div>
        </div>
  );
}

export default ProfileLogIn;