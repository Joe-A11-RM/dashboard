import React, { useContext } from "react";
import { dashboardcontext } from "../../../../../context/DashboardContext";

export default function DashboardCancel() {
	let { setEditMode, setIsCancelled } = useContext(dashboardcontext);
	return (
		<div
			className="dashboard-cancel-btn"
			onClick={() => {
				setIsCancelled(true);
				setEditMode(false);
				setIsCancelled(false);
			}}
		>
			Cancel
		</div>
	);
}
