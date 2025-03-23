import React, { useContext } from "react";
import OffCanvasTemplate from "../OffCanvas";
import DashboardWidgetTypes from "./DashboardWidgetTypes/DashboardWidgetTypes";
import DashboardWidgetContent from "./DashboardWidgetContent/DashboardWidgetContent";
import { dashboardcontext } from "../../../context/DashboardContext";

export default function DashBoardMenu() {
  let { dashboardTypeWidget, currentWidgets } = useContext(dashboardcontext);
  return (
    <div className="d-flex justify-content-center align-items-center">
      <OffCanvasTemplate ButtonText={"Generate New Dashboard"} backdrop={false}>
        {dashboardTypeWidget.value === false && <DashboardWidgetTypes />}
        {dashboardTypeWidget.value === true && (
          <DashboardWidgetContent allWidgets={currentWidgets} />
        )}
      </OffCanvasTemplate>
    </div>
  );
}
