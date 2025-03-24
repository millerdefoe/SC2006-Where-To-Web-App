import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import InputEndLocation from "./pages/InputEndLocation";
import InputStartLocation from "./pages/InputStartLocation";
import ViewDrivingRoute from "./pages/ViewDrivingRoute";
import SettingsPageSaveSuccessful from "./pages/SettingsPageSaveSuccessful";
import InputTPTMode from "./pages/InputTPTMode";

function App() {
  return (
    <Router>
      <div className="App"> 
        <Routes>
          <Route path="/" element={<Navigate to="/view-driving-route" />} />
          <Route path="/view-driving-route" element={<ViewDrivingRoute />} />
          <Route path="/end-location" element={<InputEndLocation />} />
          <Route path="/settings" element={<SettingsPageSaveSuccessful />} />
          <Route path="/start-location" element={<InputStartLocation />} />
          <Route path="/input-TPT-mode" element={<InputTPTMode/>} />
        </Routes>
      </div>
    </Router> 
  );
}

export default App;
