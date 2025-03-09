import React, { useContext } from "react";
import { dashboardcontext } from "../../../context/DashboardContext";
import DashboardTrackingWidget from "./DashboardTrackingWidget";
import DashboardCountsWidget from "./DashboardCountsWidget";
import DashboardAlertWidget from "./DashboardAlertWidget";

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
