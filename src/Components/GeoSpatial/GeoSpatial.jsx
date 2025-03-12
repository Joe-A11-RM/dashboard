import React, { useContext } from "react";
import GeoMap from "../Map/Map";
import GeoSpatialUploads from "./GeoSpatialUploads/GeoSpatialUploads";
import { geospatialcontext } from "../../context/GeoSpatialContext";
import GeoSpatialUploadsMini from "./GeoSpatialUploadsMini/GeoSpatialUploadsMini";
import GeoSpatialPoints from "./GeoSpatialPoints/GeoSpatialPoints";

export default function GeoSpatial() {
	let { minimize } = useContext(geospatialcontext);

	return (
		<div>
			<GeoMap>
				<GeoSpatialPoints />
			</GeoMap>

			{!minimize ? <GeoSpatialUploads /> : <GeoSpatialUploadsMini />}
		</div>
	);
}
