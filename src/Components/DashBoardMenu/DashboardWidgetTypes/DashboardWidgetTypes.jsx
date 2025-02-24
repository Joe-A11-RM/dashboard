import React from "react";
import DashboardWidgetTypesCard from "./DashboardWidgetTypesCard";

export default function DashboardWidgetTypes() {
	return (
		<div className="container mt-3">
			<div className="row">
				<div className="col-lg-6">
					<DashboardWidgetTypesCard
						img="Tracking"
						title="tracking widgets"
						description="Users, vehicles, drivers, sectors, companies, etc Users, vehicles, etc
					Users, vehicles, drivers, sectors, companies, etc Users..."
						action={true}
					/>
				</div>
				<div className="col-lg-6">
					<DashboardWidgetTypesCard
						img="Counts"
						title="counts widgets"
						description="Users, vehicles, drivers, sectors, companies, etc Users, vehicles, etc
					Users, vehicles, drivers, sectors, companies, etc Users..."
						action={true}
					/>
				</div>

				<div className="col-lg-6 gy-3">
					<DashboardWidgetTypesCard
						img="Alerts"
						title="alerts widgets"
						description="Users, vehicles, drivers, sectors, companies, etc Users, vehicles, etc
					Users, vehicles, drivers, sectors, companies, etc Users..."
						action={true}
					/>
				</div>

				<div className="col-lg-6 gy-3">
					<DashboardWidgetTypesCard
						img="Maintenance"
						title="maintenance widgets"
						description="Users, vehicles, drivers, sectors, companies, etc Users, vehicles, etc
					Users, vehicles, drivers, sectors, companies, etc Users..."
						action={true}
					/>
				</div>
			</div>
		</div>
	);
}
