import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SettingsComponents from "../components/SettingsComponents.jsx";
import ExitSettings from "../components/ExitSettings.jsx";
import { isValidIdentifier, isValidPassword, setCookie } from "../components/ProfileUtils.jsx";
import { ReactComponent as OpenEye } from "../assets/OpenEye.svg";
import { ReactComponent as ClosedEye } from "../assets/ClosedEye.svg";
import "../styles/ProfileSignUp.css";
import bcrypt from "bcryptjs";

function ProfileSignUp() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email_phone, setEmailOrPhone] = useState("");
  const [rfid, setRFID] = useState("");  // Optional RFID field
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



  const handleCreateAccount = async () => {
    // Validate email or phone and password
    if (!isValidIdentifier(email_phone)) {
      alert("Invalid phone or email format.");
      return;
    }

    if (!isValidPassword(password)) {
      alert("Password must be at least 8 characters long and include uppercase, lowercase, and a number.");
      return;
    }

    // Hash the password before sending to the backend
    const hashedPassword = await generateDeterministicHash(password);

    try {
      // Create request body
      const requestData = {
        username: email_phone,
        password: hashedPassword,
        rfid: rfid || null  // Send RFID if provided, otherwise send null
      };

      const response = await fetch("http://127.0.0.1:5000/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
      });

      const data = await response.json();

      // Handle response
      if (response.ok && data.status === "user created") {
        const newUser = { identifier: email_phone, hashedPass: hashedPassword, password: password,userid: data.userid, rfid };
        setCookie("user", JSON.stringify(newUser), 7);
        localStorage.setItem("user", JSON.stringify(newUser));

        alert("Account created successfully!");
        navigate("/profile-details");
      } else {
        alert(`Error: ${data.reason}`);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="profile1-page">
      <ExitSettings />
      <SettingsComponents />

      <div className="profile1-container">
        <div className="profileHeader1-typography" style={{ fontSize: "24px", paddingLeft: "0px" }}>PROFILE</div>
        <div className="profileContent1-typography" style={{ paddingLeft: "0px" }}>Create an account or log in!</div>
        <div className="line-thick"></div>

        <div className="emailPhone-container">
          <div className="profileHeader1-typography">Email / Phone Number</div>
          <div className="inputRectangle-container">
            <input
              className="custom-input-inside-rectangle"
              placeholder="Input here!"
              value={email_phone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
            />
          </div>
        </div>

        <div className="password-container">
          <div className="profileHeader1-typography">Password</div>
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
          <div className="passwordRequirement-container">
            <div className="passwordRequirement-typography">Use 8 or more characters</div>
            <div className="passwordRequirement-typography">Use upper and lower case letters (e.g. Aa)</div>
            <div className="passwordRequirement-typography">Use a number (e.g. 1234)</div>
          </div>
        </div>

        <div className="rfidTag-container">
          <div className="profileHeader1-typography">RFID Tag (Optional)</div>
          <div className="inputRectangle-container">
            <input
              className="custom-input-inside-rectangle"
              placeholder="Input here!"
              value={rfid}
              onChange={(e) => setRFID(e.target.value)}
            />
          </div>
        </div>

        <button className="signUp-container" onClick={handleCreateAccount}>
          Sign Up
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

export default ProfileSignUp;