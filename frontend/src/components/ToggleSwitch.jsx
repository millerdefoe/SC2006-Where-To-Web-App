import React from "react";
import "../styles/ToggleSwitch.css";

const ToggleSwitch = ({ isOn, toggle }) => {
  return (
    <div
      className={`toggle-switch ${isOn ? "on" : "off"}`}
      onClick={toggle}
    >
      <div className="toggle-thumb" />
    </div>
  );
};

export default ToggleSwitch;
