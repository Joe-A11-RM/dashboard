/* eslint-disable no-unused-vars */
import React from "react";

import Dashboard from "../Dashboard/Dashboard";
import GeoSpatial from "../GeoSpatial/GeoSpatial";
import { useSearchParams } from "react-router-dom";

export default function MainLayout() {
	const [searchParams] = useSearchParams();
	const red = searchParams.get("red");

	return (
		<div>
			<div className="App">
				{red === "0" && <Dashboard />}
				{red === "1" && <GeoSpatial />}
			</div>
		</div>
	);
}
