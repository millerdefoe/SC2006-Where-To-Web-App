import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/api";

function RouteFinder() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [route, setRoute] = useState(null);

  const getBasicRoute = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/getBasicRoute`, {
        source: source,
        destination: destination
      });

      setRoute(response.data);
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Enter source"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        className="border p-2 mr-2"
      />
      <input
        type="text"
        placeholder="Enter destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        className="border p-2 mr-2"
      />
      <button onClick={getBasicRoute} className="bg-blue-500 text-white px-4 py-2 rounded">
        Get Route
      </button>

      {route && (
        <div className="mt-4">
          <p><strong>Duration:</strong> {route.duration}</p>
          <p><strong>Distance:</strong> {route.distance} meters</p>
          <p><strong>Polyline:</strong> {route.polyline}</p>
        </div>
      )}
    </div>
  );
}

export default RouteFinder;
