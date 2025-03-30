import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Bus } from "../assets/Bus.svg";
import { ReactComponent as Train } from "../assets/Train.svg";
import "../styles/RouteSelection.css";

const RouteSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="routeSelection-container">
      <div className="routeSelection-title">Fastest Route</div>
      <div className="routeSelection-content">
        <div className="transportIcon-container">
          <div className="transportIcon-icon">
            <Bus />
          </div>
          <div className="transportIcon-icon">
            <Train />
          </div>
        </div>
        <div className="duration-text">25 mins</div>
        <button className="view-button">View</button>
      </div>
    </div>
  );
};

export default RouteSelection;
