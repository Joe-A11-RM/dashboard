import React, { useContext } from "react";
import DashboardDate from "./DashboardDate/DashboardDate";
import DashboardAddWidget from "./DashboardAddWidget/DashboardAddWidget";
import { dashboardcontext } from "../../../context/DashboardContext";

export default function DashboardOptions({
	showDahsboardMenu,
	setShowDahsboardMenu,
}) {
	let { editMode } = useContext(dashboardcontext);
	return (
		<div className="dashboard-header-options">
			{!editMode && <DashboardDate />}
			<DashboardAddWidget
				showDahsboardMenu={showDahsboardMenu}
				setShowDahsboardMenu={setShowDahsboardMenu}
			/>
		</div>
	);
}
