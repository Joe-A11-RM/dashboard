import React from "react";
import DashboardWidgetTypesCard from "../DashboardWidgetTypes/DashboardWidgetTypesCard";

export default function DashboardAlertWidget() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <DashboardWidgetTypesCard
            img="Tracking"
            title="Alerts Overview Pie Chart"
            description="Users, vehicles, drivers, sectors, companies, etc Users, vehicles, etc"
            widgetId={2}
            w={4}
            h={1}
          />
        </div>
      </div>
    </div>
  );
}
