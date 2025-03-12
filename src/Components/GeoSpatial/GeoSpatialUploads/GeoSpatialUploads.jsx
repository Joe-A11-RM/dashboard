import React from "react";
import GeoSpatialHead from "./GeopSpatialHead/GeoSpatialHead";
import GeoSpatialData from "./GeoSpatialData/GeoSpatialData";

export default function GeoSpatialUploads() {
	return (
		<div className="geospatial-uploads">
			<GeoSpatialHead />
			<GeoSpatialData />
		</div>
	);
}
