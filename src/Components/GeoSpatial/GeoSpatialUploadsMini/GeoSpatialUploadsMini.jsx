import React, { useContext } from "react";
import { geospatialcontext } from "../../../context/GeoSpatialContext";

export default function GeoSpatialUploadsMini() {
	let { setMinimize } = useContext(geospatialcontext);

	return (
		<div className="geospatial-uploads-mini">
			<div>GeoSpatial</div>
			<img
				src={`${process.env.PUBLIC_URL}/assets/Light/Double-Arrow.svg`}
				style={{ transform: "rotate(-180deg)" , cursor:"pointer"}}
				alt="minimize"
				onClick={() => setMinimize(false)}
			/>
		</div>
	);
}
