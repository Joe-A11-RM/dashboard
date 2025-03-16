import React, { useContext, useEffect, useState } from "react";
import GeoSpatialSearch from "./GeoSpatialSearch/GeoSpatialSearch";
import GesSpatialBulk from "./GeoSpatialBulk/GesSpatialBulk";
import GeoTable from "./GeoTable/Table";
import Pagination from "../../../Dashboard/Helper/Pagination";
import { useGetPointsQuery } from "../../../../Redux/service/GeoSpatial/GeoSpatial";
import { useDispatch } from "react-redux";
import { addGeofence } from "../../../../Redux/service/GeoSpatial/GeoSpatialSlice";
import { geospatialcontext } from "../../../../context/GeoSpatialContext";
import GeoSpitalDelete from "./GeoSpatialBulk/GeoSpitalDelete";

export default function GeoSpatialData() {
	let { type, setType, search, sortType, selectedIds } =
		useContext(geospatialcontext);
	const [currentPage, setCurrentPage] = useState(0);
	const { data, refetch } = useGetPointsQuery({
		type: type,
		sortType: sortType,
		search: search,
		page: currentPage * 100,
		total: 100,
	});
	const dispatch = useDispatch();
	useEffect(() => {
		if (data?.response?.data) {
			dispatch(addGeofence(data?.response?.data));
		}
	}, [data, dispatch]);
	useEffect(() => {
		console.log("selectedIds", selectedIds);
	});
	return (
		<>
			<div className="geospatial-data">
				<GeoSpatialSearch />
				<GesSpatialBulk refetch={refetch} />
				{selectedIds.length > 0 && <GeoSpitalDelete refetch={refetch} />}
			</div>
			<div className="geo-filters">
				<div
					className={type === "points" ? "geo-filter-active" : "geo-filter"}
					onClick={() => setType("points")}
				>
					Points
				</div>
				<div
					className={type === "polygons" ? "geo-filter-active" : "geo-filter"}
					onClick={() => setType("polygons")}
				>
					Polygons
				</div>
				<div
					className={type === "lines" ? "geo-filter-active" : "geo-filter"}
					onClick={() => setType("lines")}
				>
					Lines
				</div>
			</div>
			<GeoTable data={data} refetch={refetch} />
			<Pagination
				page={1}
				totalPages={data?.totalCount ? Math.round(data?.totalCount / 100) : 1}
				onPageChange={(page) => setCurrentPage(page - 1)}
				unit="items"
				containerStyle={"h-10 w-100"}
				pageRange={6}
			/>
		</>
	);
}
