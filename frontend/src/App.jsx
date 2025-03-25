import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import InputEndLocation from "./pages/InputEndLocation";
import InputStartLocation from "./pages/InputStartLocation";
import ViewDrivingRoute from "./pages/ViewDrivingRoute";
import InputTPTMode from "./pages/InputTPTMode";
import SettingsPageSaveSuccessful from "./pages/SettingsPageSaveSuccessful";
import NearestCarparkAvail from "./pages/NearestCarparkAvail";
import FastestRoute from "./pages/FastestRoute";
import LeastCongestedRoute from "./pages/LeastCongestedRoute";


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
          <Route path="/nearest-avail-carpark" element={<NearestCarparkAvail/>} />
          <Route path="/fastest-route" element={<FastestRoute/>} />
          <Route path="/least-congested-route" element={<LeastCongestedRoute/>} />
        </Routes>
      </div>
    </Router> 
  );
}

export default App;
