import React from "react";
import { BiSolidTrashAlt } from "react-icons/bi";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";

export default function HeatMap({ title, onDelete, data }) {
  const points = data.map((point) => [
    point.latitude,
    point.longitude,
    point.nearbyPointsCount,
  ]);

  return (
    <div className={`dashboard-label`}>
      <div className="bin cancelSelectorName" onClick={onDelete}>
        <BiSolidTrashAlt />
      </div>
      <div className="dashboard-label-body">
        <h5 className="fs-16 fw-600">{title}</h5>
      </div>

      <div className="map">
        <MapContainer
          center={[21.5, 39.2]} // Focus near the data points
          zoom={7}
          scrollWheelZoom={true}
          zoomControl={false}
          className="map-container"
          style={{ height: "400px", width: "100%" }}
        >
          <ZoomControl position="bottomright" />

          <TileLayer url="https://mt0.google.com/vt/lyrs=m,&hl=en&x={x}&y={y}&z={z}&s=Ga" />
          {/**<HeatmapLayer
            points={points}
            longitudeExtractor={(m) => m[1]}
            latitudeExtractor={(m) => m[0]}
            intensityExtractor={(m) => m[2]}
            radius={30}
            blur={20}
            max={300}
            minOpacity={0.5}
          />**/}
        </MapContainer>
      </div>
    </div>
  );
}
