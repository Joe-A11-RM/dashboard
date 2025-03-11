import axios from "axios";
import React, { useEffect, useState } from "react";

export default function PopupBody({ item }) {
	const [geoCode, setGeoCode] = useState(false);

	const fetchGeoCodePosition = async (lat, lon) => {
		try {
			const response = await axios.get(
				`https://nominatim.openstreetmap.org/reverse.php?lat=${lat}&lon=${lon}&zoom=18&format=jsonv2`
			);
			setGeoCode(`${response.data.display_name}`);
			return `${response.data.display_name}`;
		} catch (error) {
			console.error("Error fetching geocode position:", error);
			throw error;
		}
	};
	useEffect(() => {
		fetchGeoCodePosition(item.latitude, item.longitude);
	}, [item.latitude, item.longitude]);
	return (
		<div className="popup-body ">
			<div className="container-fluid">
				<div className=" row">
					<div className="col-lg-6">
						<div className="d-flex align-items-center">
							<div className="popup-vehicle-title">name:</div>
							<div>{item?.vehicleName}</div>
						</div>
					</div>
					<div className="col-lg-6 ">
						<div className="d-flex align-items-center">
							<div className="popup-vehicle-title">id:</div>
							<div>{item?.vehicleUniqueId}</div>
						</div>
					</div>
					<div className="col-lg-6 gy-1">
						<div className="d-flex align-items-center">
							<div className="popup-vehicle-title">status:</div>
							<div>{item?.status}</div>
						</div>
					</div>

					<div className="col-lg-6 gy-1">
						<div className="d-flex align-items-center">
							<div className="popup-vehicle-title">speed:</div>
							<div>{item?.speed} km/h</div>
						</div>
					</div>
					<div className="col-lg-12 gy-1">
						<div className="d-flex align-items-center">
							<div className="popup-vehicle-title">last message:</div>
							<div>{item?.lastMessage}</div>
						</div>
					</div>
					<div className="col-lg-12 gy-1">
						<div className="d-flex align-items-center">
							<div className="popup-vehicle-title">address:</div>
							<div>{geoCode ? geoCode : "-----"}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
