import React, { useContext } from "react";
import { dashboardcontext } from "../../../context/DashboardContext";

export default function DashboardAddWidget() {
	let { setDashboardMenu } = useContext(dashboardcontext);
	let { setEditMode } = useContext(dashboardcontext);
	return (
		<div
			className="dashboard-cancel-btn"
			onClick={() => setDashboardMenu(true) & setEditMode(true)}
		>
			<img
				src={`${process.env.PUBLIC_URL}/assets/Dark/Add.svg`}
				alt="add"
				className="me-1"
			/>
			<div>Add widget</div>
		</div>
	);
}
