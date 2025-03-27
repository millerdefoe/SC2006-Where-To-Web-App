import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import InputStartLoc from './pages/InputStartLoc';
import InputEndLoc from './pages/InputEndLoc';
import InputTPTMode from './pages/InputTPTMode';
import FastestRoute from './pages/FastestRoute';
import FastestRouteDirections from './pages/FastestRouteDirections';
import LeastCongestedRoute from './pages/LeastCongestedRoute';
import ViewLessCongestedRouteDirections from './pages/ViewLessCongestedRouteDirections';
import ViewDrivingRoute from './pages/ViewDrivingRoute';
import DrivingRouteNav from './pages/DrivingRouteNav';
import TPTRouteNav from './pages/TPTRouteNav';
import ViewPublicTransportRoute from './pages/ViewPublicTransportRoute';
import CarparkAvail from './pages/CarparkAvail';
import NearestCarparkAvail from './pages/NearestCarparkAvail';
import CarparkPrice from './pages/CarparkPrice';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/input-start" element={<InputStartLoc />} />
        <Route path="/input-end" element={<InputEndLoc />} />
        <Route path="/input-transport-mode" element={<InputTPTMode />} />
        <Route path="/fastest-route" element={<FastestRoute />} />
        <Route path="/fastest-route-directions" element={<FastestRouteDirections />} />
        <Route path="/least-congested-route" element={<LeastCongestedRoute />} />
        <Route path="/view-less-congested-directions" element={<ViewLessCongestedRouteDirections />} />
        <Route path="/view-driving-route" element={<ViewDrivingRoute />} />
        <Route path="/driving-route-nav" element={<DrivingRouteNav />} />
        <Route path="/public-transport-nav" element={<TPTRouteNav />} />
        <Route path="/view-public-transport-route" element={<ViewPublicTransportRoute />} />
        <Route path="/carpark-availability" element={<CarparkAvail />} />
        <Route path="/nearest-carpark" element={<NearestCarparkAvail />} />
        <Route path="/carpark-prices" element={<CarparkPrice />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
