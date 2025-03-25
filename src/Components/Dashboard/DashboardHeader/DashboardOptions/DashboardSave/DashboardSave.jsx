import React, { useContext } from "react";
import { dashboardcontext } from "../../../../../context/DashboardContext";

export default function DashboardSave() {
	const { setSaveChanges, changes } = useContext(dashboardcontext);

	const isDisabled = changes ;
	console.log("isDisabled", isDisabled);
	console.log("changes", changes);
	return (
		<div
			className={`dashboard-save-widget  ${
				!isDisabled ? "bg-body-secondary " : ""
			}`}
		>
			<button
				className={`text  bg-transparent border-0 ${
					!isDisabled ? "text-muted" : "text-white"
				} `}
				onClick={() => setSaveChanges(true)}
				disabled={!isDisabled}
			>
				Save Changes
			</button>
		</div>
	);
}
