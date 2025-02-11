import React from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";

export default function Map({ title, onDelete }) {
  return (
    <>
      <div className="dashboard-label-body">
        <h5 className="fs-16 fw-600">{title}</h5>
      </div>

      <div className="map">
        <MapContainer
          id="map-container"
          center={[23.8859, 45.0792]}
          zoomControl={false}
          zoom={6}
          scrollWheelZoom={true}
          minZoom={5}
          maxZoom={18}
          zoomAnimation={true}
          zoomSnap={0.1}
          dragging={false}
          className="map-container"
        >
          <ZoomControl position="bottomright" />

          <TileLayer url="https://mt0.google.com/vt/lyrs=m,&hl=en&x={x}&y={y}&z={z}&s=Ga" />
        </MapContainer>
      </div>
    </>
  );
}
