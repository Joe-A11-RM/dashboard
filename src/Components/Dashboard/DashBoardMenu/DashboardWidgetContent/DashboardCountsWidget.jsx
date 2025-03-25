import React from "react";
import DashboardWidgetTypesCard from "../DashboardWidgetTypes/DashboardWidgetTypesCard";
import NoWidgets from "../../Helper/NoWidgets";

export default function DashboardCountsWidget({ addedWidgetIds }) {
	const countsWidgetWidgets = [
		{
			id: 1,
			img: "Counts1",
			title: "Counts Overview",
			description:
				"Users, vehicles, drivers, sectors, companies, etc Users, vehicles, etc Users, vehicles, drivers, sectors, companies, etc Users...",
			w: 4,
			h: 1,
		},
		{
			id: 9,
			img: "Counts1",
			title: "Alert Counts Overview",
			description:
				"Speed, Geofence, Expiry, Powercut, Idle, Others, Malfunctions, Accidents, Expenses",
			w: 4,
			h: 1,
		},
	];

	const availableWidgets = countsWidgetWidgets.filter(
		(widget) => !addedWidgetIds.includes(widget.id)
	);

	return (
		<div className="container">
			<div className="row">
				{availableWidgets.length === 0 ? (
					<NoWidgets />
				) : (
					availableWidgets.map((widget) => (
						<div key={widget.id} className="col-lg-6">
							<DashboardWidgetTypesCard
								img={widget.img}
								title={widget.title}
								description={widget.description}
								widgetId={widget.id}
								w={widget.w}
								h={widget.h}
							/>
						</div>
					))
				)}
			</div>
		</div>
	);
}
