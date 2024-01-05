import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { googlemapsImg } from "../../assets";

const LocationMap = (props) => {
  const latitude = props.latitude;
  const longitude = props.longitude;
  const address = props.address;
  const onMapClick = props.onMapClick;

  useEffect(() => {
    if (latitude && longitude) {
      const map = L.map("map").setView([latitude, longitude], 17);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);

      // Menyesuaikan konten yang ditampilkan pada marker
      const customMarkerIcon = L.divIcon({
        className: "custom-marker",
        html: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#467599" d="M13.5 5.5c1.09 0 2-.92 2-2a2 2 0 0 0-2-2c-1.11 0-2 .88-2 2c0 1.08.89 2 2 2M9.89 19.38l1-4.38L13 17v6h2v-7.5l-2.11-2l.61-3A7.29 7.29 0 0 0 19 13v-2c-1.91 0-3.5-1-4.31-2.42l-1-1.58c-.4-.62-1-1-1.69-1c-.31 0-.5.08-.81.08L6 8.28V13h2V9.58l1.79-.7L8.19 17l-4.9-1l-.4 2z"/></svg>',
      });

      L.marker([latitude, longitude], { icon: customMarkerIcon })
        .addTo(map)
        .bindPopup(address)
        .openPopup();

      map.on("click", onMapClick);
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
