import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ProfileIcon } from "../assets/Profile.svg";
import { getUserFromCookie } from "../components/ProfileUtils"; 
import "../styles/ProfileButton.css";

const ProfileButton = () => {
    const navigate = useNavigate();
    const user = getUserFromCookie();

    const handleClick = () => {
        if (user && user.password) {
            navigate("/profile-details");
        } else {
            navigate("/profile-sign-in");
        }
    };

    return (
        <button className="profileIcon-container" onClick={handleClick}>
            <ProfileIcon className="profile-icon" />
        </button>
    );
};

export default ProfileButton;
