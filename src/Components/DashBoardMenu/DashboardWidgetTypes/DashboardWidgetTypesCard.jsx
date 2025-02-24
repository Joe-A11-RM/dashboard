import React, { useContext } from "react";
import { dashboardcontext } from "../../../context/DashboardContext";

export default function DashboardWidgetTypesCard({
	img,
	title,
	description,
	action,
}) {
	let { dashboardTypeWidget, setDashboardTypeWidget } =
		useContext(dashboardcontext);
	return (
		<div
			className="dashboard-widget-types-card"
			onClick={() => {
				action && setDashboardTypeWidget({ type: title, value: true });
			}}
			style={{ cursor: dashboardTypeWidget.value && "grab" }}
		>
			<div className="widget-img-conatiner">
				<img src={`assets/Widgets/${img}.svg`} alt={img} />
			</div>
			<div className="widget-description">
				<div className="widget-description-head">{title}</div>
				<div className="widget-description-sub">{description}</div>
			</div>
		</div>
	);
}
