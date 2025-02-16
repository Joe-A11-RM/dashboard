import React, { useContext } from "react";
import { dashboardcontext } from "../../../../context/DashboardContext";

export default function DashboardAddWidget() {
	let { setDashboardMenu } = useContext(dashboardcontext);
	return (
		<div
			className="dashboard-cancel-btn"
			onClick={() => setDashboardMenu(true)}
		>
			<img src="assets/Dark/Add.svg" alt="add" className="me-1" />
			<div>Add widget</div>
		</div>
	);
}
