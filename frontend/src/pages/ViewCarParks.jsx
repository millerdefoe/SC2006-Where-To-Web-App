import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Car } from "../assets/Car.svg";
import { ReactComponent as Book } from "../assets/Book.svg";
import { ReactComponent as Cross} from "../assets/X.svg";
import { ReactComponent as ComputeRoute } from "../assets/ComputeRoute.svg";
import SettingsButton from "../components/SettingsButton";
import HomeButton from "../components/HomeButton";
import NavBar from "../components/NavigationBar";
import ModeOfTransport from "../components/ModeOfTransport";
import "../styles/ViewCarParks.css";

function ViewCarParks() {
  const navigate = useNavigate();

  const [stickyVisible, setStickyVisible] = useState({ carPark1: false, carPark2: false });

  const toggleStickyBar = (carPark) => {
    setStickyVisible(prevState => ({
      ...prevState,
      [carPark]: !prevState[carPark]  
    }));
  };

  return (
    <div className="page-container">
      <SettingsButton />
      <HomeButton />
      <NavBar />
      <ModeOfTransport Icon={Car} />

      <div className="page-typography">Nearby Available Car Parks</div>

      <div className="container-wrapper">
        <div className="leftContainer1">
          <p className="container-text-top">Car Park 1</p>
          <p className="container-text-bottom">
            <span>Lots Available: </span><br />
            <span>Distance from destination: </span><br />
            <span>Car Park Rate: </span><br />
            <span>Remarks: </span>
          </p>
          <div className="book-button">
            <Book className="book-icon" onClick={() => toggleStickyBar("carPark1")} />
            {stickyVisible.carPark1 && (
              <div className="sticky-overlay">
                <div className="sticky-bar">
                  <Cross className="close-icon" onClick={() => toggleStickyBar("carPark1")} />
                  <p>Car Park 1 Booked Successfully!</p>
                  <button className="computeRoute-button" onClick={() => navigate("/view-driving-route")}>
                    <ComputeRoute className="computeRoute-icon" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="rightContainer1">
          <p className="container-text-top">Car Park 2</p>
          <p className="container-text-bottom">
            <span>Lots Available: </span><br />
            <span>Distance from destination: </span><br />
            <span>Car Park Rate: </span><br />
            <span>Remarks: </span>
          </p>
          <div className="book-button">
            <Book className="book-icon" onClick={() => toggleStickyBar("carPark2")} />
            {stickyVisible.carPark2 && (
              <div className="sticky-overlay">
                <div className="errorSticky-bar">
                  <Cross className="close-icon" onClick={() => toggleStickyBar("carPark2")} />
                  <p>
                    <span>Could not book Car Park 2</span><br />
                    <span>Empty or Invalid RFID tag in Settings</span><br />
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCarParks;
