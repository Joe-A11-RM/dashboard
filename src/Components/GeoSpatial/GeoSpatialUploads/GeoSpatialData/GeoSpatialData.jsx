import React from "react";
import GeoSpatialSearch from "./GeoSpatialSearch/GeoSpatialSearch";
import GesSpatialBulk from "./GeoSpatialBulk/GesSpatialBulk";

export default function GeoSpatialData() {
	return (
		<div className="geospatial-data">
			<GeoSpatialSearch />
			<GesSpatialBulk />
		</div>
	);
}
