import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import InputEndLocation from "./pages/InputEndLocation";
import InputStartLocation from "./pages/InputStartLocation";
import InputTPTMode from './pages/InputTPTMode';
import FastestRoute from './pages/FastestRoute';
import FastestRouteDirections from './pages/FastestRouteDirections'; 
import LeastCongestedRoute from "./pages/LeastCongestedRoute";
import ViewLessCongestedRouteDirections from './pages/ViewLessCongestedRouteDirections';
import ViewDrivingRoute from "./pages/ViewDrivingRoute";
import DrivingRouteNav from './pages/DrivingRouteNav';
import TPTRouteNav from './pages/TPTRouteNav';
import ViewPublicTransportRoute from './pages/ViewPublicTransportRoute';
import ViewCarParks from "./pages/ViewCarParks";
import BookingFail from "./pages/BookingFail";
import BookingSuccess from "./pages/BookingSuccess";
import SettingsPage from "./pages/Settings";
import SettingsSaved from "./pages/SettingsSaved";
import SettingsFailed from './pages/SettingsFailed';
import SettingsReset from './pages/SettingsReset';
import Feedback from './pages/Feedback';
import NotFoundPage from './pages/NotFoundPage';
import DisplayCongestionLevels from './pages/DisplayCongestionLevels';

function App() {
  return (
    <Router>
      <div className="App"> 
        <Routes>
          <Route path="/" element={<Navigate to="/view-driving-route" />} />
          <Route path="/view-driving-route" element={<ViewDrivingRoute />} />
          <Route path="/end-location" element={<InputEndLocation />} />
          <Route path="/start-location" element={<InputStartLocation />} />
          <Route path="/input-TPT-mode" element={<InputTPTMode />} />
          <Route path="/fastest-route" element={<FastestRoute />} />
          <Route path="/display-congestion-levels" element={<DisplayCongestionLevels />}/>
          <Route path="/fastest-route-directions" element={<FastestRouteDirections />} />
          <Route path="/least-congested-route" element={<LeastCongestedRoute />} />
          <Route path="/view-less-congested-directions" element={<ViewLessCongestedRouteDirections />} />
          <Route path="/public-transport-nav" element={<TPTRouteNav />} />
          <Route path="/view-public-transport-route" element={<ViewPublicTransportRoute />} />
          <Route path="/view-car-parks" element={<ViewCarParks />}/>
          <Route path="/booking-fail" element={<BookingFail/>} />
          <Route path="/booking-success" element={<BookingSuccess/>} />
          <Route path="/view-driving-route" element={<ViewDrivingRoute />} />
          <Route path="/driving-route-nav" element={<DrivingRouteNav />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/settings-saved" element={<SettingsSaved />} />
          <Route path="/settings-failed" element={<SettingsFailed />} />
          <Route path="/settings-reset" element={<SettingsReset />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router> 
  );
}

export default App;
    