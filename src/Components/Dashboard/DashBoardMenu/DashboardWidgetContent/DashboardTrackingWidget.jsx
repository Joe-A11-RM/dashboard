import React from "react";
import DashboardWidgetTypesCard from "../DashboardWidgetTypes/DashboardWidgetTypesCard";

export default function DashboardTrackingWidget({ addedWidgetIds }) {
  const trackingWidgets = [
    {
      id: 4,
      img: "Distance",
      title: "Distance Coverage Bar Chart",
      description:
        "Users, vehicles, drivers, sectors, companies, etc Users, vehicles, etc Users, vehicles, drivers, sectors, companies, etc Users...",
      w: 12,
      h: 1,
    },
    {
      id: 3,
      img: "Tracking",
      title: "Vehicles Status Pie Chart",
      description:
        "Users, vehicles, drivers, sectors, companies, etc Users, vehicles, etc Users, vehicles, drivers, sectors, companies, etc Users...",
      w: 6,
      h: 1,
    },
  ];

  const availableWidgets = trackingWidgets.filter(
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
