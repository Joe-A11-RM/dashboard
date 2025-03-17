import React from "react";
import { useMap } from "react-leaflet";
import GeoSpatialHead from "./GeopSpatialHead/GeoSpatialHead";
import GeoSpatialData from "./GeoSpatialData/GeoSpatialData";

export default function GeoSpatialUploads() {
  const map = useMap(); // Get the map instance

  const disableMapDrag = () => {
    map.dragging.disable();
    map.scrollWheelZoom.disable();
    map.doubleClickZoom.disable();
  };

  const enableMapDrag = () => {
    map.dragging.enable();
    map.scrollWheelZoom.enable();
    map.doubleClickZoom.enable();
  };

  return (
    <div
      className="geospatial-uploads"
      onMouseEnter={disableMapDrag} // Disable drag when hovering over the panel
      onMouseLeave={enableMapDrag} // Enable drag when leaving the panel
    >
      <GeoSpatialHead />
      <GeoSpatialData />
    </div>
  );
}
