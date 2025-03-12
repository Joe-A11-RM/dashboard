import React from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";

export default function GeoMap({ children }) {
	return (
		<div className="full-map">
			<MapContainer
				id="map-container"
				center={[23.8859, 45.0792]}
				zoomControl={false}
				zoom={4}
				scrollWheelZoom={true}
				minZoom={4.5}
				maxZoom={18}
				zoomAnimation={true}
				zoomSnap={0.5}
				className="map-container"
			>
				<ZoomControl position="bottomright" />
				<TileLayer url="https://mt0.google.com/vt/lyrs=m,&hl=en&x={x}&y={y}&z={z}&s=Ga" />
				{children}
			</MapContainer>
		</div>
	);
}
