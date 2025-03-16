/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTrash } from "react-icons/fa";
import { geospatialcontext } from "../../../../../context/GeoSpatialContext";
import { useDeletePointsMutation } from "../../../../../Redux/service/GeoSpatial/GeoSpatial";
import { useMap } from "react-leaflet";
import { useDispatch } from "react-redux";
import { addGeofence } from "../../../../../Redux/service/GeoSpatial/GeoSpatialSlice";

const GeoTable = ({ data, refetch }) => {
	let {
		type,
		sortType,
		setSortType,
		selectedIds,
		setSelectedIds,
		selectMode,
		setSelectMode,
	} = useContext(geospatialcontext);
	const dispatch = useDispatch();
	const map = useMap();
	const moveToPointLocation = (lat, lon) => {
		map.setView([lat, lon], 40);
	};

	const moveToPolygonsLocation = (coordinates) => {
		let latLng = JSON.parse(coordinates);
		map.setView([latLng[0].lat, latLng[0].lng], 40);
	};

	const handleSelectRow = (id, lat, lng, coordinates) => {
		if (type === "points") {
			moveToPointLocation(lat, lng);
		} else {
			moveToPolygonsLocation(coordinates);
		}
		if (!selectMode) return;
		setSelectedIds((prevSelected) =>
			prevSelected.includes(id)
				? prevSelected.filter((rowId) => rowId !== id)
				: [...prevSelected, id]
		);
	};
	const [deletePoint] = useDeletePointsMutation();

	const handleDelete = async (id) => {
		const isConfirmed = window.confirm(
			"Are you sure you want to delete this item?"
		);
		if (!isConfirmed) return;

		try {
			await deletePoint({ type, ids: id })
				.unwrap()
				.then(() => refetch())
				.catch((e) => console.error(e));
			alert("Item deleted successfully!");
			setSelectedIds((prevSelected) =>
				prevSelected.filter((rowId) => rowId !== id)
			);
		} catch (error) {
			alert("Error deleting item. Please try again.");
		}
	};

	useEffect(() => {
		setSelectedIds([]);
	}, [type]);

	useEffect(() => {
		if (!selectMode) {
			setSelectedIds([]);
		}
	}, [selectMode]);
	return (
		<div className="geo-table card">
			<div className="table-responsive geo-table-scroll">
				<div className="card-body" id="table">
					<table className="table table-borderless align-middle">
						<thead className="geo-table-header">
							<tr>
								<th>
									<input
										type="checkbox"
										className="form-check-input custom-checkbox"
										checked={selectMode}
										onChange={() => setSelectMode((prev) => !prev)}
									/>
								</th>
								<th
									className="geo-table-head sortable"
									onClick={() =>
										setSortType(sortType === "desc" ? "asc" : "desc")
									}
								>
									Object Name
								</th>
								<th className="text-end geo-table-head">Actions</th>
							</tr>
						</thead>
						<tbody>
							{data?.response?.data &&
								data?.response?.data.map((item) => {
									return (
										<tr
											key={item.id}
											onClick={() => {
												handleSelectRow(
													item.id,
													item.lat,
													item.lng,
													item.coordinates
												);
												dispatch(addGeofence([item]));
											}}
										>
											<td
												className={
													selectedIds.includes(item.id) ? "active-row" : ""
												}
											>
												{selectMode && (
													<input
														type="checkbox"
														className="form-check-input custom-checkbox"
														checked={selectedIds.includes(item.id)}
														onClick={(e) => e.stopPropagation()} // Prevents row click from triggering
														onChange={() =>
															handleSelectRow(
																item.id,
																item.lat,
																item.lng,
																item.coordinates
															)
														}
													/>
												)}
											</td>
											<td
												className={
													selectedIds.includes(item.id)
														? "active-row geo-table-body"
														: "geo-table-body"
												}
											>
												{item.name}
											</td>
											<td
												className={
													selectedIds.includes(item.id)
														? "active-row text-end"
														: "text-end"
												}
											>
												<button
													className="btn btn-link geo-table-trash p-0"
													onClick={() => handleDelete(item.id)}
												>
													<FaTrash size={12} />
												</button>
											</td>
										</tr>
									);
								})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default GeoTable;
