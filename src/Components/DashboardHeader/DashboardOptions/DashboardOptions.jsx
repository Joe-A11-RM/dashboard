import React, { useContext } from "react";
import DashboardDate from "./DashboardDate/DashboardDate";
import DashboardEditMode from "./DashboardEditMode/DashboardEditMode";
import { dashboardcontext } from "../../../context/DashboardContext";
import DashboardManageWidget from "./DashboardManageWidget/DashboardManageWidget";

export default function DashboardOptions() {
	let { editMode } = useContext(dashboardcontext);
	return (
		<div className="dashboard-header-options">
			{!editMode && (
				<>
					<DashboardDate />
					<DashboardManageWidget />
				</>
			)}
			{editMode && <DashboardEditMode />}
		</div>
	);
}
