import React from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";

export default function GeoMap({ children, mapheight, lat, lon }) {
	return (
		<div className={`${mapheight ? mapheight : "full-map"}`}>
			<MapContainer
				id="map-container"
				center={lat && lon ? [lat, lon] : [23.8859, 45.0792]}
				zoomControl={false}
				zoom={6}
				scrollWheelZoom={true}
				minZoom={4.5}
				maxZoom={18}
				zoomAnimation={true}
				zoomSnap={0.5}
				className="map-container"
			>
				<ZoomControl position="bottomright" />
				<TileLayer url="https://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" />
				{children}
			</MapContainer>
		</div>
	);
}
