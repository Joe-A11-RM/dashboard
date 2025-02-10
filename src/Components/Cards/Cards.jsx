import { BiSolidTrashAlt } from "react-icons/bi";
import React from "react";
import LabelChart from "../Charts/LabelChart";
import PieChart from "../Charts/PieChart";
import Map from "../Map/Map";
import HeatMap from "../Charts/HeatMap";

export default function Cards({ key, item, i, removeWidget, isDraggable }) {
  console.log("isDraggable", isDraggable);

  const handleDelete = (e) => {
    e.stopPropagation();
    e.preventDefault();
    removeWidget(i);
  };

  return (
    <div className="h-100" key={key}>
      {item.chartData.chartType === "LabelChart" ? (
        <LabelChart
          data={item.chartData.data}
          labels={item.chartData.labels}
          title={item.chartData.title}
          number={item.chartData.number}
          color={item.chartData.color}
          onDelete={handleDelete}
        />
      ) : item.chartData.chartType === "PieChart" ? (
        <PieChart
          data={item.chartData.data}
          labels={item.chartData.labels}
          title={item.chartData.title}
          number={item.chartData.number}
          color={item.chartData.color}
          onDelete={handleDelete}
        />
      ) : item.chartData.chartType === "MapChart" ? (
        <Map onDelete={handleDelete} title={item.chartData.title} />
      ) : item.chartData.chartType === "HeatMapChart" ? (
        <HeatMap
          onDelete={handleDelete}
          title={item.chartData.title}
          data={item.chartData.data}
        />
      ) : (
        <div className="item-card">
          <button className="bin cancelSelectorName" onClick={handleDelete}>
            <BiSolidTrashAlt />
          </button>
          <div className="item-card-chart">{item.chartType}</div>
        </div>
      )}
    </div>
  );
}
