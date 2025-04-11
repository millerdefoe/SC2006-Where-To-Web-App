import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import InputEndLocation from "./pages/InputEndLocation";
import InputStartLocation from "./pages/InputStartLocation";
import InputTPTMode from './pages/InputTPTMode';
import ViewDrivingRoute from "./pages/ViewDrivingRoute";
import ViewDrivingDirections from "./pages/ViewDrivingDirections";
import DrivingRouteNav from './pages/DrivingRouteNav';
import TPTRouteNav from './pages/TPTRouteNav';
import ViewPublicTransportRoute from './pages/ViewPublicTransportRoute';
import ViewCarParks from "./pages/ViewCarParks";
import PredictedCarParkAvail from "./components/PredictedCarParkAvail";
import MyBookings from "./pages/MyBookings";
import SettingsPage from "./pages/SettingsPage";
import FeedbackPage from "./pages/FeedbackPage";
import DisplayCongestionLevels from './pages/DisplayCongestionLevels';
import ProfileSignUp from "./pages/ProfileSignUp";
import ProfileLogIn from "./pages/ProfileLogIn";
import ProfileDetails from "./pages/ProfileDetails";
import PageTracker from "./components/PageTracker";

function App() {
  return (
    <Router>
      <PageTracker />
      <div className="App"> 
        <Routes>
          <Route path="/" element={<Navigate to="/end-location" />} />
          <Route path="/view-driving-route" element={<ViewDrivingRoute />} />
          <Route path="/end-location" element={<InputEndLocation />} />
          <Route path="/start-location" element={<InputStartLocation />} />
          <Route path="/input-TPT-mode" element={<InputTPTMode />} />
          <Route path="/display-congestion-levels" element={<DisplayCongestionLevels />}/>
          <Route path="/public-transport-nav" element={<TPTRouteNav />} />
          <Route path="/view-public-transport-route" element={<ViewPublicTransportRoute />} />
          <Route path="/view-car-parks" element={<ViewCarParks />}/>
          <Route path="/predicted-car-park-avail" element={<PredictedCarParkAvail />}/>
          <Route path="/my-bookings" element={<MyBookings />}/>
          <Route path="/view-driving-route" element={<ViewDrivingRoute />} />
          <Route path="/view-driving-directions" element={<ViewDrivingDirections />} />
          <Route path="/driving-route-nav" element={<DrivingRouteNav />} />
          <Route path="/settings-page" element={<SettingsPage />} />
          <Route path="/feedback-page" element={<FeedbackPage />} />
          <Route path="/profile-sign-up" element={<ProfileSignUp />} />
          <Route path="/profile-details" element={<ProfileDetails />} />
          <Route path="/profile-log-in" element={<ProfileLogIn />} />
        </Routes>
      </div>
    </Router> 
  );
}

export default App;
    