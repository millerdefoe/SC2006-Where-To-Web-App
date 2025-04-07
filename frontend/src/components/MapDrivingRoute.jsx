import React, { useMemo, useRef, useEffect, useState } from "react";
import {
  GoogleMap,
  Polyline,
  Marker
} from "@react-google-maps/api";
import { useGoogleMapsLoader } from "../hooks/useGoogleMapsLoader";

const defaultCenter = {
  lat: 1.3521,
  lng: 103.8198
};

function MapWithRoute({ encodedPolyline, mapContainerClassName }) {
  const { isLoaded } = useGoogleMapsLoader();
  const mapRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);

  const decodedPath = useMemo(() => {
    if (
      isLoaded &&
      window.google &&
      window.google.maps &&
      window.google.maps.geometry &&
      encodedPolyline
    ) {
      try {
        return window.google.maps.geometry.encoding
          .decodePath(encodedPolyline)
          .map((latLng) => ({
            lat: latLng.lat(),
            lng: latLng.lng()
          }));
      } catch (err) {
        console.error("Error decoding polyline:", err);
        return [];
      }
    }
    return [];
  }, [isLoaded, encodedPolyline]);

  useEffect(() => {
    if (mapReady && mapRef.current && decodedPath.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      decodedPath.forEach((coord) => bounds.extend(coord));
      mapRef.current.fitBounds(bounds);
    }
  }, [mapReady, decodedPath]);

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap
      mapContainerClassName={mapContainerClassName || "map-container"}
      defaultCenter={defaultCenter}
      defaultZoom={12}
      onLoad={(map) => {
        mapRef.current = map;
        setMapReady(true); // now it's safe to fitBounds
      }}
      options={{
        disableDefaultUI: false,    // Keep UI controls like zoom if needed
        draggable: false,           // Disable dragging
        zoomControl: false,         // Disable zoom buttons
        scrollwheel: false,         // Disable scroll zoom
        disableDoubleClickZoom: true, // Disable zoom on double click
        keyboardShortcuts: false,   // Disable keyboard navigation
        gestureHandling: "none",    // Disable all gestures
      }}
    >
      {decodedPath.length > 0 && (
        <>
          <Polyline
            path={decodedPath}
            options={{
              strokeColor: "#00BFFF",
              strokeOpacity: 0.8,
              strokeWeight: 4
            }}
          />
          <Marker position={decodedPath[0]} label="A" />
          <Marker position={decodedPath[decodedPath.length - 1]} label="B" />
        </>
      )}
    </GoogleMap>
  );
}

export default MapWithRoute;
