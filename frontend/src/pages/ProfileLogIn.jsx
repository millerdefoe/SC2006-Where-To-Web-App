import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import SettingsComponents from "../components/SettingsComponents.jsx";
import ExitSettings from "../components/ExitSettings.jsx";
import { ReactComponent as SignInButton } from "../assets/SignInButton.svg";
import { ReactComponent as InputRectangle } from "../assets/InputRectangle.svg";
import { getUserFromCookie } from "../components/ProfileUtils.jsx";
import "../styles/ProfileLogIn.css";

const ProfileLogIn = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [email_phone, setEmailOrPhone] = useState("");

    const handleLogin = () => {
        const savedUser = getUserFromCookie();

        if (!savedUser) {
          alert("No account found. Please create one first.");
          return;
        }
      
        if (email_phone !== savedUser.identifier) {
          alert("This email or phone number does not match any existing account.");
          return;
        }
      
        if (password !== savedUser.password) {
          alert("Incorrect password. Please try again.");
          return;
        }
      
        localStorage.setItem("user", JSON.stringify(savedUser));
        navigate("/profile-details");
      };     

  return (
    <div className="profile2-page">
        <ExitSettings/>
        <SettingsComponents/>

            <div className="profile2-container">
                <div className="profileHeader2-typography" style={{ fontSize: "24px", paddingLeft: "0px" }}>PROFILE</div>
                <div className="profileContent2-typography" style={{ paddingLeft: "0px" }}>Create an account or log in!</div>
                <div className="line-thick"></div>

                <div className="welcome-back-container">
                    <div className="welcome-back-typography">
                        Welcome Back!
                    </div>
                </div>

                <div className="emailPhone2-container">
                    <div className="profileHeader2-typography">Email / Phone Number</div>
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

                <div className="password2-container">
                    <div className="profileHeader2-typography">Password</div>
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
                </div>

                <button className="signIn2-container" onClick={handleLogin}>
                    <SignInButton className="signIn-icon" />
                </button>
            </div>
    </div>
  );
};

export default ProfileLogIn;