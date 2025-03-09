import React from "react";
import { CiWifiOff, CiWifiOn } from "react-icons/ci";

export default function PopupHeader({ item }) {
	return (
		<div className="popup-header">
			<div className="d-flex justify-content-between align-items-center">
				<div>
					{item?.vehicleName} - {item?.vehicleUniqueId}
				</div>
				<div>
					{item?.status === "online" ? (
						<CiWifiOn color="green" />
					) : (
						<CiWifiOff size={24} color="red" />
					)}
				</div>
			</div>
		</div>
	);
}
