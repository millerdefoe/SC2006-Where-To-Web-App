import React, { useMemo, useRef, useEffect } from "react";
 import {
   GoogleMap,
   Polyline,
   useJsApiLoader,
   Marker
} from "@react-google-maps/api";

// Dark theme style JSON (Google's Night Mode)
const darkMapStyle = [
  {
    elementType: "geometry",
    stylers: [{ color: "#212121" }]
  },
  {
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }]
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#757575" }]
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#212121" }]
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [{ color: "#757575" }]
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#757575" }]
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#181818" }]
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#616161" }]
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [{ color: "#2c2c2c" }]
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#8a8a8a" }]
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#000000" }]
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#3d3d3d" }]
  }
];

const containerStyle = {
  width: "80%",
  height: "400px"
};

const defaultCenter = {
  lat: 1.3521,
  lng: 103.8198
};

function MapWithRoute({ encodedPolyline, apiKey }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ["geometry"]
  });

  const mapRef = useRef(null);

  const decodedPath = useMemo(() => {
    if (
      isLoaded &&
      window.google &&
      window.google.maps &&
      window.google.maps.geometry
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

  // Auto-fit bounds to route
  useEffect(() => {
    if (mapRef.current && decodedPath.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      decodedPath.forEach((coord) => bounds.extend(coord));
      mapRef.current.fitBounds(bounds);
    }
  }, [decodedPath]);

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={12}
      onLoad={(map) => (mapRef.current = map)}
      //options={{ styles: darkMapStyle }}
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
          {/* Start Marker */}
          <Marker position={decodedPath[0]} label="A" />

          {/* End Marker */}
          <Marker position={decodedPath[decodedPath.length - 1]} label="B" />
        </>
      )}
    </GoogleMap>
  );
}

export default MapWithRoute;
