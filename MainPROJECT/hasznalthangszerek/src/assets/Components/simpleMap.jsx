import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function SimpleMap({ postalCode, city }) {
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!postalCode || !city) return;

    fetch(
      `https://nominatim.openstreetmap.org/search?postalcode=${postalCode}&city=${encodeURIComponent(city)}&country=Hungary&format=json`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setCoords({
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon),
          });
        } else {
          setError("A cím nem található.");
        }
      })
      .catch(() => setError("Hiba történt a térkép betöltésekor."));
  }, [postalCode, city]);

  if (error) return <p>{error}</p>;
  if (!coords) return <p>Helyszín keresése...</p>;

  return (
    <MapContainer
      center={[coords.lat, coords.lng]}
      zoom={13}
      style={{ width: "100%", height: "400px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <Marker position={[coords.lat, coords.lng]}>
        <Popup>
          {city}, {postalCode}
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default SimpleMap;
