import React from "react";
import DashboardWidgetTypesCard from "../DashboardWidgetTypes/DashboardWidgetTypesCard";

export default function DashboardAlertWidget({ addedWidgetIds }) {
  const alertsWidgetWidgets = [
    {
      id: 2,
      img: "Tracking",
      title: "Alerts Overview Pie Chart",
      description:
        "Users, vehicles, drivers, sectors, companies, etc Users, vehicles, etc Users, vehicles, drivers, sectors, companies, etc Users...",
      w: 4,
      h: 1,
    },
  ];

  const availableWidgets = alertsWidgetWidgets.filter(
    (widget) => !addedWidgetIds.includes(widget.id)
  );

  return (
    <div className="container">
      <div className="row">
        {availableWidgets.length === 0 ? (
          <p>No widgets available</p>
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
