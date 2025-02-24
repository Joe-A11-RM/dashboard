import React, { useContext } from "react";
import { dashboardcontext } from "../../../context/DashboardContext";
import DashboardTrackingWidget from "./DashboardTrackingWidget";

export default function DashboardWidgetContent() {
	let { dashboardTypeWidget } = useContext(dashboardcontext);
	return (
		<div>
			{dashboardTypeWidget.type === "tracking widgets" && (
				<DashboardTrackingWidget />
			)}
		</div>
	);
}
