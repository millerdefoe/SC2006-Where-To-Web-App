import React from "react";
import Badge from "./Badge";
import { ReactComponent as TimerIcon } from "../assets/Timer.svg";
import { ReactComponent as Bus } from "../assets/Bus.svg";
import { ReactComponent as Train } from "../assets/Train.svg";
import { ReactComponent as Walking } from "../assets/Walking.svg";
import "../styles/DirectionDescription.css";

const DirectionDescription = ({ routeData }) => {
  if (!routeData || !routeData.legs || !routeData.legs[0]) return null;

  const leg = routeData.legs[0];
  const steps = leg.steps || [];

  // Generate icons array from steps
  const icons = steps.map((step) => {
    if (step.travelMode === "WALK") {
      return { type: "walk" };
    }

    if (step.travelMode === "TRANSIT" && step.transitDetails) {
      const line = step.transitDetails.transitLine;
      const vehicleType = line.vehicle?.type;

      if (vehicleType === "BUS") {
        return { type: "bus", label: line.name };
      } else if (vehicleType === "SUBWAY") {
        return { type: "mrt", label: line.name };
      }
    }

    return null;
  }).filter(Boolean);

  // Format duration from "1209s" → "20 mins"
  const rawDuration = leg.duration || "0s";
  const durationMins = Math.round(parseInt(rawDuration.replace("s", "")) / 60);
  const duration = `${durationMins} mins`;

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
        {icons.map((icon, index) => {

            return (
              <div className="transportIconAndBadge-vertical" key={index}>
                {icon.type === "walk" && (
                  <div className="walkingIconDD-icon">
                    <Walking />
                  </div>
                )}

                {icon.type === "bus" && (
                  <>
                    <div className="busIconDD-icon">
                      <Bus />
                    </div>
                    <div className="badgeDD-icon">
                      <Badge label={icon.label} isBus />
                    </div>
                      
                  </>
                )}

                {icon.type === "mrt" && (
                  <>
                    <div className="trainIconDD-icon">
                      <Train />
                    </div>
                    <div className="badgeDD-icon">
                      <Badge label={icon.label} isBus={false} />
                    </div>
                      
                    
                  </>
                )}
              </div>
            );
          })}
        </div>

        <div className="directionDescription-container">
          <div className="directionDescription-mainDirection">
            blank
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectionDescription;
