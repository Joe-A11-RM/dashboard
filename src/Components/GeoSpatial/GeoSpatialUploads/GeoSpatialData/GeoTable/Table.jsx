import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTrash } from "react-icons/fa";
import { useMap } from "react-leaflet";
import { geospatialcontext } from "../../../../../context/GeoSpatialContext";

const GeoTable = ({ data }) => {
	let { type } = useContext(geospatialcontext);
	const map = useMap();
	const moveToPointLocation = (lat, lon) => {
		map.setView([lat, lon], 40);
	};

	const moveToPolygonsLocation = (coordinates) => {
		let latLng = JSON.parse(coordinates);
		map.setView([latLng[0].lat, latLng[0].lng], 40);
	};
	return (
		<div className="geo-table card">
			<div className="table-responsive geo-table-scroll">
				<div className="card-body" id="table">
					<table className="table table-borderless align-middle">
						<thead className="geo-table-header">
							<tr>
								<th>
									<input type="checkbox" className="form-check-input" />
								</th>
								<th className="geo-table-head">Object Name</th>
								<th className="text-end geo-table-head">Actions</th>
							</tr>
						</thead>
						<tbody>
							{data?.response?.data.map((item) => (
								<tr
									key={item.id}
									onClick={() =>
										type === "points"
											? moveToPointLocation(item.lat, item.lng)
											: moveToPolygonsLocation(item.coordinates)
									}
								>
									<td>
										<input type="checkbox" className="form-check-input" />
									</td>
									<td className="geo-table-body">{item.name}</td>
									<td className="text-end">
										<button className="btn btn-link geo-table-trash p-0">
											<FaTrash size={12} />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default GeoTable;
