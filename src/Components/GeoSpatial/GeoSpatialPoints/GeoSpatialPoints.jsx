import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetPointsQuery } from "../../../Redux/service/GeoSpatial/GeoSpatial";
import { addGeofence } from "../../../Redux/service/GeoSpatial/GeoSpatialSlice";

export default function GeoSpatialPoints() {
	const dispatch = useDispatch();
	const geospatial = useSelector((state) => state.geospatial.geospatial);

	const { data } = useGetPointsQuery({
		type: "points",
		sortType: "desc",
		search: "",
		page: 0,
		total: 100,
	});

	useEffect(() => {
		if (data) {
			dispatch(addGeofence(data));
		}
	}, [data, dispatch]);

	console.log("geospatial:", geospatial);
}
