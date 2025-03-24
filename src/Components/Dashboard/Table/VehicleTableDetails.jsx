import React from "react";

export default function VehicleTableDetails({ rows }) {
	return (
		<div
			className="table-container dashboard-border"
			style={{ overflowX: "auto", minHeight: "290px" }}
		>
			<div className="" style={{ minWidth: "800px" }}>
				<div className="dashboard-table-head">
					<div className="text-left" style={{ width: "48px" }}>
						<input
							type="checkbox"
							className="form-check-input custom-checkbox"
						/>
					</div>
					<div className="dashboard-table-item">no</div>
					<div className="dashboard-table-item">name</div>
					<div className="dashboard-table-item">status</div>
					<div className="dashboard-table-item">last message</div>
					<div className="dashboard-table-item">speed</div>
				</div>

				{rows?.map((row, rowIndex) => (
					<div key={rowIndex} className="dashboard-table-body  border-bottom ">
						<div className="dashboard-table-item" style={{ width: "48px" }}>
							<input
								type="checkbox"
								className="form-check-input custom-checkbox"
							/>
						</div>
						<div className="dashboard-table-item dashboard-table-item-nameId">
							{row.vehicleUniqueId}
						</div>
						<div className="dashboard-table-item dashboard-table-item-nameId">
							{row.vehicleName}
						</div>
						<div className={`dashboard-table-item `}>
							<div
								className={` ${
									row.status === "online"
										? "table-status  table-status-online"
										: "table-status  table-status-offline"
								}`}
							>
								{row.status}
							</div>
						</div>
						<div className="dashboard-table-item">{row.lastMessage}</div>
						<div className="dashboard-table-item">{row.speed} km/h</div>
					</div>
				))}
			</div>
		</div>
	);
}
