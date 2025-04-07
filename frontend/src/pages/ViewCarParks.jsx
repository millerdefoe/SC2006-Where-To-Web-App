import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Car } from "../assets/Car.svg";
import { ReactComponent as Book } from "../assets/Book.svg";
import { ReactComponent as Cross } from "../assets/X.svg";
import { ReactComponent as ComputeRoute } from "../assets/ComputeRoute.svg";
import SettingsButton from "../components/SettingsButton";
import HomeButton from "../components/HomeButton";
import NavBar from "../components/NavigationBar";
import ModeOfTransport from "../components/ModeOfTransport";
import MyBookingsButton from "../components/MyBookingsButton";
import axios from "axios"; // Import Axios
import "../styles/ViewCarParks.css";

function ViewCarParks() {
  const navigate = useNavigate();
  const [carParks, setCarParks] = useState([]);
  const [stickyVisible, setStickyVisible] = useState({});

  // Fetch car parks when the component mounts
  useEffect(() => {
    console.log("useEffect triggered");  // Debugging log to check if useEffect is running
    const fetchCarparks = async () => {
      try {
        const latitude = localStorage.getItem("endLat"); // Assuming coordinates are stored
        const longitude = localStorage.getItem("endLng");
        console.log("Latitude from localStorage:", latitude);   // ✅ Add this
        console.log("Longitude from localStorage:", longitude);

        if (!latitude || !longitude) {
          console.error("Latitude and longitude not found.");
          return;
        }

        const maxrange = 1; // Set a default range or get this from user input
        const requestData = {
          latitude,
          longitude,
          maxrange,
        };

        console.log("Making API call with data:", requestData);  // Debugging log

        // Send a GET request using Axios with a body
        const response = await axios.post("http://127.0.0.1:5000/carparksNearby", {
          headers: {
            "Content-Type": "application/json",
          },
          data: requestData,  // Sending data in GET body (non-standard, but works with Flask)
        });

        console.log("API Response:", response);  // Log the response
        if (response.status === 200) {
          setCarParks(response.data); // Set fetched data to state
        } else {
          console.error("Error fetching car parks:", response.data);
        }
      } catch (error) {
        console.error("Error fetching car parks:", error);
      }
    };

    fetchCarparks();
  }, []);

  const toggleStickyBar = (carParkId) => {
    setStickyVisible((prevState) => ({
      ...prevState,
      [carParkId]: !prevState[carParkId],
    }));
  };

  return (
    <div className="page-container">
      <SettingsButton />
      <HomeButton />
      <NavBar />
      <ModeOfTransport Icon={Car} />
      <MyBookingsButton />

      <div className="page-typography">Nearby Available Car Parks</div>

      <div className="container-wrapper">
        {carParks.length > 0 ? (
          carParks.map((carPark, index) => (
            <div key={index} className={index % 2 === 0 ? "leftContainer1" : "rightContainer1"}>
              <p className="container-text-top">{carPark.name}</p> {/* Name of the car park */}
              <p className="container-text-bottom">
                <span>Lots Available: {carPark.lotsAvailable}</span><br />
                <span>Distance from destination: {carPark.distance || "N/A"} km</span><br />
                <span>Car Park Rate: {carPark.rate || "N/A"}</span><br />
                <span>Remarks: {carPark.remarks || "N/A"}</span>
              </p>

              <div className="book-button">
                <Book className="book-icon" onClick={() => toggleStickyBar(`carPark${index + 1}`)} />
                {stickyVisible[`carPark${index + 1}`] && (
                  <div className="sticky-overlay">
                    <div className="sticky-bar">
                      <Cross className="close-icon" onClick={() => toggleStickyBar(`carPark${index + 1}`)} />
                      <p>Car Park {index + 1} Booked Successfully!</p>
                      <button className="computeRoute-button" onClick={() => navigate("/view-driving-route")}>
                        <ComputeRoute className="computeRoute-icon" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div>No nearby car parks available.</div>
        )}
      </div>
    </div>
  );
}

export default ViewCarParks;
