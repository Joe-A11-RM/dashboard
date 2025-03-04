import React from "react";
import DashboardWidgetTypesCard from "../DashboardWidgetTypes/DashboardWidgetTypesCard";

export default function DashboardCountsWidget() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <DashboardWidgetTypesCard
            img="Counts1"
            title="Counts Overview"
            description="Users, vehicles, drivers, sectors, companies, etc Users, vehicles, etc"
            widgetId={1}
            w={4}
            h={1}
          />
        </div>
      </div>
    </div>
  );
}
