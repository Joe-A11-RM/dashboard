import React from "react";
import DashboardCancel from "../DashboardCancel/DashboardCancel";
import DashboardSave from "../DashboardSave/DashboardSave";
import DashboardAddWidget from "../DashboardAddWidget/DashboardAddWidget";

export default function DashboardEditMode() {
	return (
		<div className="d-flex align-items-center  ">
			<DashboardAddWidget />
			<div className="mx-3">|</div>
			<DashboardCancel />
			<DashboardSave />
		</div>
	);
}
