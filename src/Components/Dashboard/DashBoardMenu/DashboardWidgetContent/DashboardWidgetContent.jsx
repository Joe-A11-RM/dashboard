import React, { useContext } from "react";
import DashboardTrackingWidget from "./DashboardTrackingWidget";
import DashboardCountsWidget from "./DashboardCountsWidget";
import DashboardAlertWidget from "./DashboardAlertWidget";
import { dashboardcontext } from "../../../../context/DashboardContext";

export default function DashboardWidgetContent() {
  let { dashboardTypeWidget } = useContext(dashboardcontext);
  return (
    <div>
      {dashboardTypeWidget.type === "tracking widgets" && (
        <DashboardTrackingWidget />
      )}
      {dashboardTypeWidget.type === "counts widgets" && (
        <DashboardCountsWidget />
      )}
      {dashboardTypeWidget.type === "alerts widgets" && (
        <DashboardAlertWidget />
      )}
    </div>
  );
}
