import React from 'react';
import { useNavigate } from 'react-router-dom';
import SettingsComponents from "../components/SettingsComponents.jsx";
import ExitSettings from "../components/ExitSettings.jsx";
import { ReactComponent as Line } from "../assets/Line.svg";
import { ReactComponent as SignInButton } from "../assets/SignInButton.svg";
import { ReactComponent as InputRectangle } from "../assets/InputRectangle.svg";
import "../styles/ProfileLogIn.css";

function ProfileLogIn() {

    const navigate = useNavigate();

  return (
    <div className="profileLogin-page">
      <SettingsComponents/>
      <ExitSettings />
      <div className="rhs-container">
        <div className="top-row10">
            <div className="top-text">
                <span>PROFILE</span>
            </div>
            <div className="bottom-text">
                <span>Create an account or log in!</span>
            </ div>
            <div className="line-container">
                <Line className="line-icon" />
            </div>
        </div>
        <div className ="middle-row10">
            <div className="middle-top-text">
                <span>Email / Phone Number</span>
            </div>
            <div className="inputRectangle-container">
                <InputRectangle className="inputRectangle-icon" />
            </div>
            <div className="middle-text">
                <span>Password</span>
            </ div>
            <div className="inputRectangle-container">
                <InputRectangle className="inputRectangle-icon" />
            </div>
            <div className="belowRow-container">    
                <div className="leftText-container">
                    <span>Use 8 or more characters</span>
                </ div>
                <div className="middleText-container">
                    <span>Use upper and lower case letters (e.g. Aa)</span>
                </ div>
                <div className="rightText-container">
                    <span>Use a number (e.g. 1234)</span>
                </ div>
            </ div>
        </div>
        <div className="bottom-row10">
            <div className="bottom-text-large">
                <span>RFID Tag (Optional)</span>
            </div>
            <div className="inputRectangle-container">
                <InputRectangle className="inputRectangle-icon" />
            </div>
            <button className="signIn-container" onClick={() => navigate("/profile-signed-in")}>
                <SignInButton className="signIn-icon" />
            </button>
        </div>
      </ div>
    </ div>
  );
}

export default ProfileLogIn;