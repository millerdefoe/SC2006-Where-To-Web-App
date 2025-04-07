import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SettingsButton from "../components/SettingsButton";
import HomeButton from "../components/HomeButton";
import NavBar from "../components/NavigationBar";
import ModeOfTransport from "../components/ModeOfTransport";
import { ReactComponent as Car } from "../assets/Car.svg";
import { ReactComponent as ComputeRoute } from "../assets/ComputeRoute.svg";
import { ReactComponent as ChangeBooking } from "../assets/ChangeBooking.svg";
import { ReactComponent as DeleteBooking } from "../assets/DeleteBooking.svg";
import "../styles/MyBookings.css";
import { getUserFromCookie } from "../utils/getUserFromCookie"; 

function MyBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadedUser = getUserFromCookie();
    if (!loadedUser) {
      console.warn("No user found in cookie.");
      return;
    }
    setUser(loadedUser);
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchBookings = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/getBookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: user.identifier }),
        });

        if (!response.ok) throw new Error("Failed to fetch bookings");
        const data = await response.json();

        const enrichedBookings = await Promise.all(
          data.map(async (bookingArray, idx) => {
            const [carparkid, lottype, userid, starttime] = bookingArray;

            let rate = "N/A";
            let lots = "N/A";

            try {
              const rateRes = await fetch("http://127.0.0.1:5000/carparkPricing", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ carparkId: carparkid }),
              });
              if (rateRes.ok) {
                const rateData = await rateRes.json();
                rate = rateData.rate;
              }

              const lotsRes = await fetch("http://127.0.0.1:5000/carparkLots", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ carparkId: carparkid }),
              });
              if (lotsRes.ok) {
                const lotsData = await lotsRes.json();
                lots = lotsData[lottype] ?? "N/A";
              }

            } catch (e) {
              console.warn(`Failed to enrich booking for ${carparkid}:`, e);
            }

            return {
              carparkid,
              lottype,
              userid,
              starttime,
              rate,
              lotsAvailable: lots
            };
          })
        );

        setBookings(enrichedBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setBookings([]);
      }
    };

    fetchBookings();
  }, [user]);

  const handleDeleteBooking = async (carparkid, starttime) => {
    if (!user) return;

    try {
      const response = await fetch("http://127.0.0.1:5000/deleteBooking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: user.identifier,
          carparkid,
          starttime,
        }),
      });

      const result = await response.json();
      if (result.status === "success") {
        setBookings(prev => prev.filter(b => b.carparkid !== carparkid || b.starttime !== starttime));
        alert("Booking deleted!");
      } else {
        alert(`Failed to delete: ${result.reason}`);
      }
    } catch (err) {
      console.error("Delete booking error:", err);
    }
  };


  return (
    <div className="bookingsPage-container">
      <HomeButton />
      <SettingsButton />
      <NavBar />
      <ModeOfTransport Icon={Car} />
      <div className="bookingsPage-typography">My Bookings</div>

      {bookings.length === 0 ? (
        <div>No bookings found.</div>
      ) : (
        bookings.map((booking, idx) => (
          <div key={idx} className="greyCarPark-container">
            <p className="greyCarParkContainer-topText">{`Car Park ${idx + 1}`}</p>
            <p className="greyCarParkContainer-bottomText">
              <span>Lots Available: {booking.lotsAvailable ?? "N/A"}</span><br />
              <span>Car Park Rate: {booking.rate ?? "N/A"}</span><br />
              <span>Remarks: {booking.remarks ?? "None"}</span><br />
              <span>Start Time: {booking.starttime}</span>
            </p>

            <div className="bottomRowButtons-container">
              <button
                className="computeRoute-button1"
                onClick={() => navigate("/view-driving-directions", {
                  state: {
                    destinationLat: booking.latitude,
                    destinationLng: booking.longitude,
                  },
                })}
              >
                <ComputeRoute className="computeRoute-icon1" />
              </button>
              <button
                className="changeBooking-button"
                onClick={async () => {
                  await handleDeleteBooking(booking.carparkid, booking.starttime);
                  navigate("/view-car-parks");
                }}
              >
                <ChangeBooking className="changeBooking-icon" />
              </button>

              <button
                className="deleteBooking-button"
                onClick={() => handleDeleteBooking(booking.carparkid, booking.starttime)}
              >
                <DeleteBooking className="deleteBooking-icon" />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyBookings;
