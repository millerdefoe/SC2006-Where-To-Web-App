import React from "react";
import Badge from "./Badge";
import { ReactComponent as TimerIcon } from "../assets/Timer.svg";
import { ReactComponent as Bus } from "../assets/Bus.svg";
import { ReactComponent as Train } from "../assets/Train.svg";
import { ReactComponent as Walking } from "../assets/Walking.svg";
import "../styles/DirectionDescription.css";

// Group consecutive steps by same mode & label
function groupSteps(steps) {
  const grouped = [];
  let current = null;

  for (const step of steps) {
    if (!step.instructions || step.instructions.trim() === "") continue;

    const mode = step.travelMode;
    const label = (mode === "BUS" || mode === "SUBWAY")
      ? step.ServiceNumberOrLine || step.MRTStopLine
      : null;

    if (!current || current.type !== mode || current.label !== label) {
      if (current) grouped.push(current);
      current = {
        type: mode,
        label,
        instructions: [step.instructions],
      };
    } else {
      current.instructions.push(step.instructions);
    }
  }

  if (current) grouped.push(current);
  return grouped;
}

const DirectionDescription = ({ routeData }) => {
  if (!routeData || !routeData.steps) return null;

  const steps = routeData.steps || [];
  const groupedSteps = groupSteps(steps);

  // Duration format
  const rawDuration = routeData.duration || "0s";
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
        {groupedSteps.map((group, index) => (
          <div key={index} className="direction-row">
            {/* LEFT ICON */}
            <div className="transportIconAndBadge-vertical">
              {group.type === "WALK" && (
                <div className="walkingIconDD-icon"><Walking /></div>
              )}

              {group.type === "BUS" && (
                <>
                  <div className="busIconDD-icon"><Bus /></div>
                  <div className="badgeDD-icon">
                    <Badge label={group.label} isBus />
                  </div>
                </>
              )}

              {group.type === "SUBWAY" && (
                <>
                  <div className="trainIconDD-icon"><Train /></div>
                  <div className="badgeDD-icon">
                    <Badge label={group.label} isBus={false} />
                  </div>
                </>
              )}
            </div>

            {/* RIGHT TEXT */}
            <div className="instructionGroup">
              {group.instructions.map((text, subIdx) => (
                <p
                  key={subIdx}
                  className={subIdx === 0 ? "main-instruction" : "sub-instruction"}
                >
                  {text}
                </p>
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default DirectionDescription;
