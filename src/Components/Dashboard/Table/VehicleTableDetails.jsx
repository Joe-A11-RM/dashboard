import React from "react";

export default function VehicleTableDetails({ rows }) {
	return (
		<div
			className="table-container"
			style={{ overflowX: "auto", minHeight: "290px" }}
		>
			<div className="border" style={{ minWidth: "600px" }}>
				<div className="d-flex border-bottom bg-light fw-bold p-2">
					<div className="text-left" style={{ flex: 1 }}>
						Name
					</div>
					<div className="text-left" style={{ width: "150px" }}>
						VehicleId
					</div>
					<div className="text-left" style={{ width: "200px" }}>
						Last Message
					</div>
					<div className="text-left" style={{ flex: 1 }}>
						Status
					</div>
					<div className="text-left" style={{ flex: 1 }}>
						Speed
					</div>
				</div>

				{rows?.map((row, rowIndex) => (
					<div key={rowIndex} className="d-flex border-bottom p-2">
						<div className="text-left" style={{ flex: 1 }}>
							{row.vehicleName}
						</div>
						<div className="text-left" style={{ width: "150px" }}>
							{row.vehicleUniqueId}
						</div>
						<div className="text-left" style={{ width: "200px" }}>
							{row.lastMessage}
						</div>
						<div className="text-left" style={{ flex: 1 }}>
							{row.status}
						</div>
						<div className="text-left" style={{ flex: 1 }}>
							{row.speed}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
