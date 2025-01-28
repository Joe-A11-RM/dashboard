import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import LabelChart from "../Charts/LabelChart";

export default function Cards({ id, item }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    data: [65, 59, 80, 81, 56, 55, 40],
  };
  return (
    <div
      key={item.id}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      {item.value === 1 ? (
        <LabelChart
          data={data.data}
          labels={data.labels}
          title="Numbers of total employees"
          number={15}
          color="#3B82F6"
        />
      ) : (
        <div className="item-card">{item.value}</div>
      )}
    </div>
  );
}
