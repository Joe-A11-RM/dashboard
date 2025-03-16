/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Marker, Polygon, Polyline,  Tooltip } from "react-leaflet";
import L from "leaflet";
import { geospatialcontext } from "../../../context/GeoSpatialContext";

// Custom marker icon
const customIcon = new L.Icon({
	iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
	iconSize: [32, 32],
	iconAnchor: [16, 32],
	popupAnchor: [0, -32],
});

export default function GeoSpatialPoints() {
	const geospatial = useSelector((state) => state.geospatial.geospatial);
	const memoizedGeospatial = useMemo(() => geospatial, [geospatial]);
	let { type, selectMode } = useContext(geospatialcontext);
	let [polygons, setPolygons] = useState([]);
	useEffect(() => {
		setPolygons([]);
	}, [type]);

	useEffect(() => {
		if (type === "polygons" || type === "lines") {
			const parsedPolygons = geospatial
				.filter((item) => item.coordinates)
				.map((item) => {
					try {
						return {
							id: item.id,
							name: item.name,
							coordinates: JSON.parse(item.coordinates),
							style: JSON.parse(item.styleHash),
						};
					} catch (error) {
						console.error(
							`Error parsing coordinates for item ${item.id}:`,
							error
						);
						return null;
					}
				})
				.filter((item) => item !== null);
			setPolygons(parsedPolygons);
		}
	}, [geospatial]);
	return (
		<>
			{type === "points" &&
				!selectMode &&
				memoizedGeospatial &&
				memoizedGeospatial.map((point) => {
					if (!point.lat || !point.lng) {
						return null;
					}
					return (
						<>
							<Marker
								key={point?.id}
								position={[point?.lat, point?.lng]}
								icon={customIcon}
							>
								<Tooltip permanent={true} direction="top" offset={[0, -30]}>
									<div className="visited">
										<div className="mb-2 d-flex justify-content-center">
											<span>vistied</span>
											{point?.visited === 0 ? (
												<div className="rvisited"></div>
											) : (
												<div className="gvisited"></div>
											)}
										</div>
										<div>
											{point?.visited === 1 && (
												<>
													<span>visiting date: </span>
													{new Date(point?.visited_date).toLocaleString(
														"en-US",
														{
															year: "numeric",
															month: "2-digit",
															day: "2-digit",
															hour: "2-digit",
															minute: "2-digit",
															hour12: true,
														}
													)}
												</>
											)}
										</div>
									</div>
								</Tooltip>
							</Marker>
						</>
					);
				})}
			{type === "polygons" && !selectMode && (
				<>
					{polygons &&
						polygons?.map((i) => (
							<Polygon
								key={i.id}
								positions={i.coordinates.map((coord) => [coord.lat, coord.lng])}
								color="blue"
								weight={4}
								fillColor={i.style ? `#{${i.style}}` : "blue"}
								fillOpacity={0.3}
							></Polygon>
						))}
				</>
			)}

			{type === "lines" && !selectMode && (
				<>
					{polygons &&
						polygons?.map((i) => (
							<Polyline
								key={i.id}
								positions={i.coordinates.map((coord) => [coord.lat, coord.lng])}
								color="blue"
								weight={4}
								fillColor="blue"
								fillOpacity={0.3}
							></Polyline>
						))}
				</>
			)}
		</>
	);
}
