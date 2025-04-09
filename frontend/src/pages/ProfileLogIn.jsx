import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SettingsComponents from "../components/SettingsComponents.jsx";
import ExitSettings from "../components/ExitSettings.jsx";
import { ReactComponent as OpenEye } from "../assets/OpenEye.svg";
import { ReactComponent as ClosedEye } from "../assets/ClosedEye.svg";
import bcrypt from 'bcryptjs';  // Import bcryptjs for hashing
import "../styles/ProfileLogIn.css";

const ProfileLogIn = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [email_phone, setEmailOrPhone] = useState("");
    const [showPassword, setShowPassword] = useState(false);


    const fixedSalt = '$2a$10$abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstu'; // Fixed salt
  
    async function generateDeterministicHash(password) {
        try {
            // Use the fixed salt instead of generating a random one
            const hash = await bcrypt.hash(password, fixedSalt); 
            console.log('Deterministic Hash:', hash);
            return hash;
        } catch (error) {
            console.error('Error hashing the password:', error);
        }
    }

    const handleLogin = async () => {
        try {
            // Hash the entered password before sending to the backend
            const hashedPassword = await generateDeterministicHash(password);  // You can adjust the salt rounds as needed

            const response = await fetch("${BASE_URL}/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: email_phone,
                    password: hashedPassword  // Send the hashed password
                })
            });

            const data = await response.json();

            if (response.ok && data.status === "login success") {
                // Store user data in localStorage and cookies
                const loggedInUser = {
                    identifier: email_phone,
                    hashedPass: hashedPassword,
                    password: password,
                    userid: data.userid,
                    token: data.token,
                    rfid: data.rfid
                };

                localStorage.setItem("user", JSON.stringify(loggedInUser));
                document.cookie = `user=${JSON.stringify(loggedInUser)}; max-age=${60 * 60 * 24 * 7}; path=/`;

                alert("Login successful!");
                window.location.href = "/profile-details";
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
            <ExitSettings />
            <SettingsComponents />

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