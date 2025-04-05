import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import SettingsComponents from "../components/SettingsComponents.jsx";
import ExitSettings from "../components/ExitSettings.jsx";
import { ReactComponent as SignInButton } from "../assets/SignInButton.svg";
import { ReactComponent as InputRectangle } from "../assets/InputRectangle.svg";
import "../styles/ProfileLogIn.css";

const ProfileLogIn = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [email_phone, setEmailOrPhone] = useState("");

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