import React from "react";
import { useNavigate } from "react-router-dom";
import {ReactComponent as ProfileIcon} from "../assets/Profile.svg";
import "../styles/ProfileButton.css";

const ProfileButton = () => {
    const navigate = useNavigate();

    return (
        <button className="profileIcon-container" onClick={() => navigate("/profile-log-in")}>
            <ProfileIcon className="profile-icon" />
        </button>
    );
};

export default ProfileButton;