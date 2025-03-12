import React from "react";
import DashboardWidgetTypesCard from "../DashboardWidgetTypes/DashboardWidgetTypesCard";

export default function DashboardTrackingWidget() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <DashboardWidgetTypesCard
            img="Distance"
            title="Distance Coverage Bar Chart"
            description="Users, vehicles, drivers, sectors, companies, etc Users, vehicles, etc
            Users, vehicles, drivers, sectors, companies, etc Users..."
            widgetId={4}
            w={12}
            h={1}
          />
        </div>
        <div className="col-lg-6">
          <DashboardWidgetTypesCard
            img="Tracking"
            title="Vehicles Status Pie Chart"
            description="Users, vehicles, drivers, sectors, companies, etc Users, vehicles, etc
            Users, vehicles, drivers, sectors, companies, etc Users..."
            widgetId={3}
            w={6}
            h={1}
          />
        </div>
      </div>
    </div>
  );
}
