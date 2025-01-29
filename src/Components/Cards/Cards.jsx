import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BiSolidTrashAlt } from "react-icons/bi";
import React from "react";
import LabelChart from "../Charts/LabelChart";
import PieChart from "../Charts/PieChart";

export default function Cards({ item, setData, data }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });
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
    removeWidget(item.id);
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
      {item.chartType === "LabelChart" ? (
        <LabelChart
          data={item.ChartData.data}
          labels={item.ChartData.labels}
          title={item.ChartData.title}
          number={item.ChartData.number}
          color={item.ChartData.color}
          onDelete={handleBinClick}
        />
      ) : item.chartType === "PieChart" ? (
        <PieChart
          data={item.ChartData.data}
          labels={item.ChartData.labels}
          title={item.ChartData.title}
          number={item.ChartData.number}
          color={item.ChartData.color}
          onDelete={handleBinClick}
        />
      ) : (
        <div className="item-card">
          <div className="bin" onClick={handleBinClick}>
            <BiSolidTrashAlt />
          </div>
          <div className="item-card-chart">{item.chartType}</div>
        </div>
      )}
    </div>
  );
}
