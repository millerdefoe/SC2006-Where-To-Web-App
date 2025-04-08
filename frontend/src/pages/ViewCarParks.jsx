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
import PredictedCarParkAvail from "../components/PredictedCarParkAvail";
import axios from "axios";
import "../styles/ViewCarParks.css";
import { getUserFromCookie } from "../utils/getUserFromCookie"; // or wherever your function is

function ViewCarParks() {
  const navigate = useNavigate();
  const [carParks, setCarParks] = useState([]);
  const [stickyVisible, setStickyVisible] = useState({});  // Store visibility state per car park
  const [endLat, setEndLat] = useState(null);
  const [endLng, setEndLng] = useState(null);
  const [pricingMap, setPricingMap] = useState({});
  const [lotsMap, setLotsMap] = useState({});


  const user = getUserFromCookie() || {};
  const userId = user.userid;
  const [selectedCarparkIndex, setSelectedCarparkIndex] = useState(null);

  useEffect(() => {
    const fetchCarparks = async () => {
      try {
        const latitude = parseFloat(localStorage.getItem("endLat"));
        const longitude = parseFloat(localStorage.getItem("endLng"));
        setEndLat(latitude);
        setEndLng(longitude);

        const requestData = { latitude, longitude, maxrange: 1 };
        const response = await axios.post("http://127.0.0.1:5000/carparksNearby", requestData, {
          headers: { "Content-Type": "application/json" },
        });

        if (response.status === 200) {
          const rawCarparks = response.data;
          const validCarparks = [];

          for (const carPark of rawCarparks) {
            const carparkId = carPark[0];
            let pricingFetched = false;
            let lotsFetched = false;

            // Fetch pricing
            try {
              const res = await axios.post("http://127.0.0.1:5000/carparkPricing", { carparkId }, {
                headers: { "Content-Type": "application/json" },
              });
              if (res.status === 200) {
                setPricingMap(prev => ({ ...prev, [carparkId]: res.data.rate }));
                pricingFetched = true;
              }
            } catch (e) {
              console.error(`Failed to fetch pricing for ${carparkId}`);
            }

            // Fetch lots
            try {
              const res = await axios.post("http://127.0.0.1:5000/carparkLots", { carparkId }, {
                headers: { "Content-Type": "application/json" },
              });
              if (res.status === 200) {
                setLotsMap(prev => ({ ...prev, [carparkId]: res.data }));
                lotsFetched = true;
              }
            } catch (e) {
              console.error(`Failed to fetch lots for ${carparkId}`);
            }

            if (pricingFetched && lotsFetched) {
              validCarparks.push(carPark);
            }

            if (validCarparks.length === 3) break;
          }

          setCarParks(validCarparks);
        }
      } catch (error) {
        console.error("Error fetching car parks:", error);
      }
    };

    fetchCarparks();
  }, []);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    if (!lat1 || !lon1 || !lat2 || !lon2) return null;
    const toRad = (val) => (val * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
  };

  const handleBooking = (carparkId, lotType, index, lat, lng) => {
    setSelectedCarparkIndex(index);

    // Continue with the booking process
    const etaSeconds = parseInt(localStorage.getItem("etaSeconds") || 60);
    const now = new Date(Date.now() + etaSeconds * 1000);
    const startTime = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
  
    const duration = 0;
  
    axios
      .post("http://127.0.0.1:5000/bookCarpark", {
        carparkId,
        lotType,
        userId,
        startTime,
        duration,
      })
      .then((res) => {
        if (res.status === 200 && res.data.status === "success") {
          // Show success bar after successful booking
          setStickyVisible(prevState => ({ ...prevState, [index]: true }));
        } else {
          alert(res.data.reason || "Booking failed");
          setStickyVisible(prevState => ({ ...prevState, [index]: false }));
        }
      })
      .catch((e) => {
        console.error("Booking error:", e);
        alert("You have an active booking. Please end your current booking before making a new one.");
        setStickyVisible(prevState => ({ ...prevState, [index]: false }));
      });
  };
  
  
  const toggleStickyBar = (index) => {
    setStickyVisible(prevState => ({
      ...prevState,
      [index]: !prevState[index],
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
          carParks.map((carPark, index) => {
            const [id, location, name, lat, lng, lotType] = carPark;
  
            if (!lotsMap[id] || lotsMap[id][lotType] === undefined || lotsMap[id][lotType] <= 0) {
              return null;
            }
            
  
            const distance = calculateDistance(endLat, endLng, parseFloat(lat), parseFloat(lng));
            const rate = pricingMap[id] || "Fetching...";
            const lots = lotsMap[id][lotType];
  
            return (
              <div key={index} className={index % 2 === 0 ? "leftContainer1" : "rightContainer1"}>
                <p className="container-text-top" style={{ fontSize: "18px" }}>{name}</p>
                <p className="container-text-bottom">
                  <span>Distance from destination: {distance} km</span><br />
                  <span>Lot Type: {lotType} | Rate: {rate}</span><br />
                  <span>Lots Available: {lots}</span>
                </p>
                <div className="book-button">
                  <Book className="book-icon" onClick={() => handleBooking(id, lotType, index, parseFloat(lat), parseFloat(lng))} />
                </div>
  
                {/* Display the correct sticky bar based on RFID status */}
                {stickyVisible[index] && (
                  <div className="sticky-overlay">
                    <div className="sticky-bar">
                      <Cross className="close-icon" onClick={() => toggleStickyBar(index)} />
                      {user?.rfid && user.rfid.trim() !== "" ? (
                        <p>{name} BOOKED SUCCESSFULLY!</p>
                      ) : (
                        <div>
                          <h3 className="sticky-bar-typography1">RFID TAG NOT DETECTED!</h3>
                          <PredictedCarParkAvail />
                        </div>
                      )}
                      <button
                        className="computeRoute-button"
                        onClick={() => {
                          localStorage.setItem("endLat", parseFloat(lat));
                          localStorage.setItem("endLng", parseFloat(lng));
                          navigate("/view-driving-directions", {
                          });
                        }}
                      >
                        <ComputeRoute className="computeRoute-icon" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div>Checking Carpark Status!</div>
        )}
      </div>
    </div>
  );  
}

export default ViewCarParks;

