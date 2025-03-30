import React from "react";
import { useNavigate } from "react-router-dom";
import {ReactComponent as FeedbackIcon} from "../assets/Feedback.svg";
import "../styles/FeedbackButton.css";

const FeedbackButton = () => {
    const navigate = useNavigate();
    return (
        <button className="feedback-icon-container" onClick={() => navigate("/feedback")}>
            <FeedbackIcon className="feedback-icon" />
        </button>
    );
};

export default FeedbackButton;
