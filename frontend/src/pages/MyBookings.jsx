import React from 'react';
import { useNavigate } from 'react-router-dom';
import SettingsButton from "../components/SettingsButton";
import HomeButton from "../components/HomeButton";
import NavBar from "../components/NavigationBar";
import ModeOfTransport from "../components/ModeOfTransport";
import {ReactComponent as Car} from "../assets/Car.svg";
import {ReactComponent as ComputeRoute} from "../assets/ComputeRoute.svg";
import {ReactComponent as ChangeBooking} from "../assets/ChangeBooking.svg";
import {ReactComponent as DeleteBooking} from "../assets/DeleteBooking.svg";
import "../styles/MyBookings.css";

function MyBookings() {
  const navigate = useNavigate();

  return (
    <div className="bookingsPage-container">
      <HomeButton />
      <SettingsButton />
      <NavBar />
      <ModeOfTransport Icon={Car} />
      <div className="bookingsPage-typography">My Bookings</div>
        <div className="greyCarPark-container">
          <p className="greyCarParkContainer-topText">Car Park 1</p>
          <p className="greyCarParkContainer-bottomText">
            <span>Lots Available: </span><br />
            <span>Distance from destination: </span><br />
            <span>Car Park Rate: </span><br />
            <span>Remarks: </span>
          </p>
        </div>
        <div className="bottomRowButtons-container">
            <button className="computeRoute-button1" onClick={() => navigate("/view-driving-directions")}>
                <ComputeRoute className="computeRoute-icon1 " />
            </button>
            <button className="changeBooking-button" onClick={() => navigate("/view-car-parks")}>
                <ChangeBooking className="changeBooking-icon" />
            </button>
            <button className="deleteBooking-button" onClick={() => navigate("/no-bookings")}>
                <DeleteBooking className="deleteBooking-icon" />
            </button>
        </div>
    </ div>
    );
}

export default MyBookings;