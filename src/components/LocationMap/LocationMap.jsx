import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { googlemapsImg } from "../../assets";

const LocationMap = (props) => {
  const latitude = props.latitude;
  const longitude = props.longitude;
  const address = props.address;

  useEffect(() => {
    if (latitude && longitude) {
      const map = L.map("map").setView([latitude, longitude], 17);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);

      L.marker([latitude, longitude]).addTo(map).bindPopup(address).openPopup();
    }
  }, [latitude, longitude]);

  return (
    <div style={{ zIndex: "0", position: "relative", cursor: "pointer" }}>
      <a
        href={`https://www.google.com/maps?q=${latitude},${longitude}`}
        target="#blank"
      >
        <div className="absolute flex gap-2 items-center p-2 rounded-md bg-tertiary top-2 right-2 z-30">
          <img src={googlemapsImg} alt="" className="w-4 h-4" />
          <p className="text-white text-xs">Go Maps</p>
        </div>
      </a>
      <div
        id="map"
        style={{ width: "100%", height: "300px", zIndex: "0" }}
      ></div>
    </div>
  );
};

export default LocationMap;
