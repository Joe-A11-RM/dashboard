import React, { useContext } from "react";
import { dashboardcontext } from "../../../../context/DashboardContext";

export default function DashboardManageWidget() {
	let { setEditMode  } = useContext(dashboardcontext);
	return (
		<div className="dashboard-add-widget" onClick={() => setEditMode(true)}>
			<img src="assets/Light/Edit.svg" alt="edit" />
			<div className="text">Manage widgets</div>
			<img
				src="assets/Light/Arrow.svg"
				style={{ transform: "rotate(360deg)" }}
				alt="edit"
			/>
		</div>
	);
}
