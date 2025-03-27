import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addDraggableIds,
	addDraggableItems,
	addPosition,
} from "../../../Redux/service/Dashboard/DashboardSlice";

export default function VehicleTableDetails({ rows }) {
	const dispatch = useDispatch();
	const draggableIds = useSelector(
		(state) => state.dashboards.draggableIds || []
	);

	const addDraggableItem = (id, event) => {
		const newIds = draggableIds.includes(id)
			? draggableIds
			: [...draggableIds, id];
		dispatch(addDraggableIds(newIds));

		dispatch(addPosition({ x: event.clientX, y: event.clientY }));
	};

	useEffect(() => {
		const draggable = rows.filter((row) => draggableIds.includes(row.id));
		dispatch(addDraggableItems(draggable));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [draggableIds, rows]);
	return (
		<>
			{/* Table Container */}
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

					{rows?.map((row) => (
						<React.Fragment key={row.id}>
							<div
								className="dashboard-table-body border-bottom"
								onClick={(event) => addDraggableItem(row.id, event)}
							>
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
								<div className="dashboard-table-item">
									<div
										className={`${
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
						</React.Fragment>
					))}
				</div>
			</div>
		</>
	);
}
