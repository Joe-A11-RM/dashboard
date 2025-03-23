import React, { useContext } from "react";
import DashboardTrackingWidget from "./DashboardTrackingWidget";
import DashboardCountsWidget from "./DashboardCountsWidget";
import DashboardAlertWidget from "./DashboardAlertWidget";
import { dashboardcontext } from "../../../../context/DashboardContext";

export default function DashboardWidgetContent({ allWidgets }) {
  console.log("allWidgets", allWidgets);
  let { dashboardTypeWidget } = useContext(dashboardcontext);
  const addedWidgetIds = allWidgets?.map((widget) => widget.widgetId) || [];
  console.log("addedWidgetIds", addedWidgetIds);
  return (
    <div>
      {dashboardTypeWidget.type === "tracking widgets" && (
        <DashboardTrackingWidget addedWidgetIds={addedWidgetIds} />
      )}
      {dashboardTypeWidget.type === "counts widgets" && (
        <DashboardCountsWidget addedWidgetIds={addedWidgetIds} />
      )}
      {dashboardTypeWidget.type === "alerts widgets" && (
        <DashboardAlertWidget addedWidgetIds={addedWidgetIds} />
      )}
    </div>
  );
}
