import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import SettingsComponents from "../components/SettingsComponents.jsx";
import ExitSettings from "../components/ExitSettings.jsx";
import { ReactComponent as SignInButton } from "../assets/SignInButton.svg";
import { ReactComponent as InputRectangle } from "../assets/InputRectangle.svg";
import { isValidIdentifier, isValidPassword, setCookie, getUserFromCookie } from "../components/ProfileUtils";

import "../styles/ProfileSignIn.css";

function ProfileSignIn() {

    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [email_phone, setEmailOrPhone] = useState("");
    const [rfid, setRFID] = useState("");

    const handleCreateAccount = () => {
        if (!isValidIdentifier(email_phone)) {
          alert("Invalid phone or email format.");
          return;
        }
      
        if (!isValidPassword(password)) {
          alert("Password must be at least 8 characters long and include uppercase, lowercase, and a number.");
          return;
        }
      
        const savedUser = getUserFromCookie();
      
        if (savedUser && savedUser.identifier === email_phone) {
          alert("Looks like you already made an account!");
          return;
        }
      
        const newUser = { identifier: email_phone, password, rfid };
        setCookie("user", JSON.stringify(newUser), 7);
        localStorage.setItem("user", JSON.stringify(newUser));
      
        navigate("/profile-details");
      };

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
                        <div className="inputRectangle-wrapper">
                            <InputRectangle className="inputRectangle-icon" />
                            <input 
                                className="custom-input-inside-rectangle" 
                                placeholder="Input here!" 
                                value={email_phone} 
                                onChange={(e) => setEmailOrPhone(e.target.value)} 
                            />
                        </div>
                    </div>
                </div>

                <div className="password-container">
                    <div className="profileHeader1-typography">Password</div>
                    <div className="inputRectangle-container">
                        <div className="inputRectangle-wrapper">
                            <InputRectangle className="inputRectangle-icon" />
                            <input 
                                className="custom-input-inside-rectangle" 
                                placeholder="Input here!" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </div>
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
                        <div className="inputRectangle-wrapper">
                            <InputRectangle className="inputRectangle-icon" />
                            <input 
                                className="custom-input-inside-rectangle" 
                                placeholder="Input here!" 
                                value={rfid} 
                                onChange={(e) => setRFID(e.target.value)} 
                            />
                        </div>
                    </div>
                </div>

                <button className="signIn-container" onClick={handleCreateAccount}>
                    <SignInButton className="signIn-icon" />
                </button>

                <div className="login-redirect-text">
                    Already have an account?{" "}
                    <span className="login-link" onClick={() => navigate("/profile-log-in")}>
                        Log in
                    </span>
                </div>
            </div>
    </div>
  );
}

export default ProfileSignIn;

