import React from "react";
import { useNavigate } from "react-router-dom";
import {ReactComponent as MyBookingsButton} from "../assets/MyBookingsButton.svg";
import "../styles/MyBookingsButton.css";

const SettingsButton = () => {
    const navigate = useNavigate();

    return (
        <button className="my-bookings-button" onClick={() => navigate("/my-bookings")}>
            <MyBookingsButton className="my-bookings-icon" />
        </button>
    );
};

export default SettingsButton;