/* eslint-disable no-unused-vars */
import React from "react";
import Dashboard from "../Dashboard/Dashboard";
import GeoSpatial from "../GeoSpatial/GeoSpatial";
import { useSearchParams } from "react-router-dom";

export default function MainLayout() {
	const [searchParams] = useSearchParams();
	const red = searchParams.get("red");

	const renderComponent = () => {
		switch (red) {
			case "0":
				return <Dashboard />;
			case "1":
				return <GeoSpatial />;
			default:
				return <Dashboard />;
		}
	};

	return <div className="App">{renderComponent()}</div>;
}
