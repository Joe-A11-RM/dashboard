import React, { useContext } from "react";
import { dashboardcontext } from "../../../../../context/DashboardContext";

export default function DashboardSave() {
	let { setSaveChanges } = useContext(dashboardcontext);
	return (
		<div className="dashboard-save-widget">
			<div
				className="text"
				onClick={() => {
					setSaveChanges(true);
				}}
			>
				Save Changes
			</div>
		</div>
	);
}
