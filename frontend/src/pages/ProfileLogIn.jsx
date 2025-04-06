import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import SettingsComponents from "../components/SettingsComponents.jsx";
import ExitSettings from "../components/ExitSettings.jsx";
import { getUserFromCookie } from "../components/ProfileUtils.jsx";
import { ReactComponent as OpenEye } from "../assets/OpenEye.svg";
import { ReactComponent as ClosedEye } from "../assets/ClosedEye.svg";
import "../styles/ProfileLogIn.css";

const ProfileLogIn = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [email_phone, setEmailOrPhone] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        try {
          const response = await fetch("http://127.0.0.1:5000/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username: email_phone,
              password: password
            })
          });
      
          const data = await response.json();
      
          if (response.ok && data.status === "login success") {
            // Store user in localStorage and cookie
            const loggedInUser = {
              identifier: email_phone,
              password,
              userid: data.userid,
              token: data.token
            };
      
            localStorage.setItem("user", JSON.stringify(loggedInUser));
            document.cookie = `user=${JSON.stringify(loggedInUser)}; max-age=${60 * 60 * 24 * 7}; path=/`;
      
            alert("Login successful!");
            navigate("/profile-details");
          } else {
            alert(`Login failed: ${data.reason}`);
          }
        } catch (error) {
          console.error("Login error:", error);
          alert("Something went wrong. Please try again.");
        }
      };
         

  return (
    <div className="profile2-page">
        <ExitSettings/>
        <SettingsComponents/>

            <div className="profile2-container">
                <div className="profileHeader2-typography" style={{ fontSize: "24px", paddingLeft: "0px" }}>PROFILE</div>
                <div className="profileContent2-typography" style={{ paddingLeft: "0px" }}>Create an account or log in!</div>
                <div className="line1-thick"></div>

                <div className="welcome-back-container">
                    <div className="welcome-back-typography">
                        Welcome Back!
                    </div>
                </div>
                <div className="emailPhone2-container">
                    <div className="profileHeader2-typography">Email / Phone Number</div>
                    <div className="inputRectangle-container">
                        <input 
                            className="custom-input-inside-rectangle" 
                            placeholder="Input here!" 
                            value={email_phone} 
                            onChange={(e) => setEmailOrPhone(e.target.value)} 
                        />
                    </div>
                </div>

                <div className="password2-container">
                    <div className="profileHeader2-typography">Password</div>
                    <div className="inputRectangle-container">
                        <input
                        className="custom-input-inside-rectangle"
                        placeholder="Input here!"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={showPassword ? "text" : "password"}
                        />
                        <button
                        className="eye-container"
                        onClick={() => setShowPassword(!showPassword)}
                        >
                        {showPassword ? <OpenEye className="eye-icon" /> : <ClosedEye className="eye-icon" />}
                        </button>
                    </div>
                </div>

                <button className="signIn2-container" onClick={handleLogin}>
                    Sign In
                </button>
            </div>
    </div>
  );
};

export default ProfileLogIn;