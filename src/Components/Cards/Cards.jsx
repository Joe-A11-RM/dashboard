import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BiSolidTrashAlt } from "react-icons/bi";
import React from "react";
import LabelChart from "../Charts/LabelChart";

export default function Cards({ id, item, setData, data }) {
  const ChartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    data: [65, 59, 80, 81, 56, 55, 40],
  };

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const customTransition = transition
    ? transition.replace("250ms", "600ms")
    : "transform 200ms ease";

  const style = {
    transition: customTransition,
    transform: CSS.Transform.toString(transform),
  };

  const removeWidget = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleBinClick = (e) => {
    e.stopPropagation();
    removeWidget(id);
  };
  const handlePointerDown = (e) => {
    if (e.target.closest(".bin")) {
      e.preventDefault();
    }
  };

  return (
    <div
      key={item.id}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      onPointerDown={handlePointerDown}
    >
      {item.value === 1 ? (
        <LabelChart
          data={ChartData.data}
          labels={ChartData.labels}
          title="Numbers of total employees"
          number={15}
          color="#3B82F6"
        />
      ) : (
        <div className="item-card">
          <div className="bin" onClick={handleBinClick}>
            <BiSolidTrashAlt />
          </div>
          <div className="item-card-chart">{item.value}</div>
        </div>
      )}
    </div>
  );
}
