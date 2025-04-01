import React from "react";
import { useNavigate } from "react-router-dom";
import {ReactComponent as SettingsIcon} from "../assets/SettingsIcon.svg";
import "../styles/SettingsButton.css";

const SettingsButton = () => {
    const navigate = useNavigate();

    return (
        <button className="settingsicon-container" onClick={() => navigate("/settings-page")}>
            <SettingsIcon className="settings-icon" />
        </button>
    );
};

export default SettingsButton;