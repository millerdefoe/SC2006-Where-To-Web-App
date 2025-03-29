// src/components/Map.jsx
import React, { useRef } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useGoogleMapsLoader } from "../hooks/useGoogleMapsLoader";


const defaultCenter = {
  lat: 1.3521,
  lng: 103.8198,
};

function Map({
  mapCenter = defaultCenter,
  markerPosition = null,
  onMapClick,
  onDragEnd,
  onCenterChanged,
  mapContainerClassName,
}) {
  const mapRef = useRef(null);

  const { isLoaded, loadError } = useGoogleMapsLoader();

  if (loadError) return <p>Error loading map</p>;
  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap
      mapContainerClassName={mapContainerClassName || "map-container"}
      center={mapCenter}
      zoom={12}
      onLoad={(map) => (mapRef.current = map)}
      onClick={(e) => {
        if (onMapClick) {
          const coords = e.latLng.toJSON();
          onMapClick(coords);
        }
      }}
      onDragEnd={() => {
        if (onDragEnd && mapRef.current) {
          const center = mapRef.current.getCenter().toJSON();
          onDragEnd(center);
        }
      }}
      onCenterChanged={() => {
        if (onCenterChanged && mapRef.current) {
          const center = mapRef.current.getCenter().toJSON();
          onCenterChanged(center);
        }
      }}
    >
      {markerPosition && <Marker position={markerPosition} />}
    </GoogleMap>
  );
}

export default Map;
