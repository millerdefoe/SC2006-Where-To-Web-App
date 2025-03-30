import React from "react";
import Badge from "./Badge";
import { ReactComponent as TimerIcon } from "../assets/Timer.svg";
import "../styles/DirectionDescription.css";

const DirectionDescription = ({ duration, icons = [], directions, iconMap }) => {
  return (
    <div className="directionDescription-wrapper">
      <div className="directionDescription-header">
        <div className="directionDescription-title">Directions</div>
        <div className="directionDescription-timer">
          <TimerIcon />
        </div>
        <div className="directionDescription-duration">{duration}</div>
      </div>

      <div className="directionDescription-wrapper2">
        <div className="directionsIcon-container">
          {icons
            .filter(icon => icon.name !== "arrow") // Skip arrow icons
            .map((icon, index) => {
              if (icon.type === "svg") {
                const Icon = iconMap[icon.name];
                if (!Icon) return null;

                if (icon.name === "walking") {
                  return (
                    <div className="walking-wrapper" key={index}>
                      <Icon />
                    </div>
                  );
                }

                return (
                  <div className="directionTransportIcon-icon" key={index}>
                    <Icon />
                  </div>
                );
              } else if (icon.type === "badge") {
                return (
                  <div className="badge-wrapper" key={index}>
                    <Badge label={icon.label} isBus={icon.isBus} />
                  </div>
                );
              } else {
                return null;
              }
            })}
        </div>

        <div className="directionDescription-container">
          <div className="directionDescription-mainDirection">
            {Array.isArray(directions)
              ? directions.map((step, idx) => <p key={idx}>{step}</p>)
              : directions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectionDescription;
