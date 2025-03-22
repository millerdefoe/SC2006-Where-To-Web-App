import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import InputStartLocation from "./pages/inputStartLocation";
import ViewDrivingRoute from "./pages/ViewDrivingRoute";
import SettingsPageSaveSuccessful from "./pages/SettingsPageSaveSuccessful";
import FeedbackButton from "."

function App() {
  return (
    <Router>
      <div className="App"> 
        <Routes>
          <Route path="/" element={<Navigate to="/view-driving-route" />} />
          <Route path="/view-driving-route" element={<ViewDrivingRoute />} />
          <Route path="/start-location" element={<InputStartLocation />} />
          <Route path="/settings" element={<SettingsPageSaveSuccessful />} />
        </Routes> 
      </div>
    </Router> 
  );
}

export default App;
