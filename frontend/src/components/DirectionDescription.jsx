import React from "react";
import Badge from "./Badge";
import { ReactComponent as TimerIcon } from "../assets/Timer.svg";
import { ReactComponent as TransportArrow } from "../assets/TransportArrow.svg";
import { ReactComponent as Walking } from "../assets/Walking.svg";
import "../styles/DirectionDescription.css";

const DirectionDescription = ({ duration, icons = [], directions}) => {
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
        .filter(icon => icon.component !== TransportArrow)
        .map((icon, index) => {
            if (icon.component === Walking){
                return (
                    <div className="walking-wrapper">
                    <Walking/>
                    </div>
                )
            }

            else if (icon.type === "svg") {
              const Icon = icon.component;
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
          <div className="directionDescription-mainDirection">{directions}</div>
        </div>
      </div>
    </div>
  );
};

export default DirectionDescription;
