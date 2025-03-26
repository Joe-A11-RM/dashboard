import React from "react";
import DashboardWidgetTypesCard from "../DashboardWidgetTypes/DashboardWidgetTypesCard";
import NoWidgets from "../../Helper/NoWidgets";

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
    {
      id: 8,
      img: "Max-speed",
      title: "Average & Maximum Speed",
      description:
        "Users, vehicles, drivers, sectors, companies, etc Users, vehicles, etc Users, vehicles, drivers, sectors, companies, etc Users...",
      w: 3,
      h: 1,
    },
    {
      id: 5,
      img: "Engine-hours",
      title: "Engine Hours",
      description:
        "Users, vehicles, drivers, sectors, companies, etc Users, vehicles, etc Users, vehicles, drivers, sectors, companies, etc Users...",
      w: 3,
      h: 1,
    },
    {
      id: 7,
      img: "Table-overview",
      title: "Table Overview",
      description:
        "Users, vehicles, drivers, sectors, companies, etc Users, vehicles, etc Users, vehicles, drivers, sectors, companies, etc Users...",
      w: 3,
      h: 1,
    },
    {
      id: 6,
      img: "Tracking-map",
      title: "Tracking Map",
      description:
        "Users, vehicles, drivers, sectors, companies, etc Users, vehicles, etc Users, vehicles, drivers, sectors, companies, etc Users...",
      w: 3,
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
          <NoWidgets />
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
