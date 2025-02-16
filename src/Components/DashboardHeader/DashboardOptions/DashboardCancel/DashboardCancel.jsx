import React, { useContext } from "react";
import { dashboardcontext } from "../../../../context/DashboardContext";

export default function DashboardCancel() {
	let { setEditMode } = useContext(dashboardcontext);
	return (
		<div className="dashboard-cancel-btn" onClick={() => setEditMode(false)}>
			Cancel
		</div>
	);
}
