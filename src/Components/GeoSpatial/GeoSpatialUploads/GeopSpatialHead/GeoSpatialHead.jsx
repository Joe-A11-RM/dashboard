import React, { useContext } from "react";
import { geospatialcontext } from "../../../../context/GeoSpatialContext";

export default function GeoSpatialHead() {
	let { setMinimize } = useContext(geospatialcontext);
	return (
		<div className="geospatial-head">
			<div>map uploads</div>
			<img
				src={`${process.env.PUBLIC_URL}/assets/Light/Double-Arrow.svg`}
				style={{ cursor: "pointer" }}
				alt="minimize"
				onClick={() => setMinimize(true)}
			/>
		</div>
	);
}
