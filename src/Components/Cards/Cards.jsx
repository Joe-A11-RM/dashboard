import { BiSolidTrashAlt } from "react-icons/bi";
import React from "react";
import LabelChart from "../Charts/LabelChart";
import PieChart from "../Charts/PieChart";
import Map from "../Map/Map";
import HeatMap from "../Charts/HeatMap";
import AlertWidget from "../Charts/AlertWidget";
import BarChart from "../Charts/BarChart";

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
        <div className={`dashboard-label`}>
          <div className="bin cancelSelectorName" onClick={handleDelete}>
            <BiSolidTrashAlt />
          </div>
          <LabelChart
            data={item.chartData.data}
            labels={item.chartData.labels}
            title={item.chartData.title}
            number={item.chartData.number}
            color={item.chartData.color}
          />
        </div>
      ) : item.chartData.chartType === "AlertWidget" ? (
        <div className={`dashboard-label`}>
          <div className="bin cancelSelectorName" onClick={handleDelete}>
            <BiSolidTrashAlt />
          </div>
          <AlertWidget
            data={item.chartData.data}
            labels={item.chartData.labels}
            title={item.chartData.title}
            number={item.chartData.number}
            color={item.chartData.color}
          />
        </div>
      ) : item.chartData.chartType === "PieChart" ? (
        <div className={`dashboard-label`}>
          <div className="bin cancelSelectorName" onClick={handleDelete}>
            <BiSolidTrashAlt />
          </div>
          <PieChart
            data={item.chartData.data}
            labels={item.chartData.labels}
            title={item.chartData.title}
            number={item.chartData.number}
            color={item.chartData.color}
          />
        </div>
      ) : item.chartData.chartType === "MapChart" ? (
        <div className={`dashboard-label`}>
          <div className="bin cancelSelectorName" onClick={handleDelete}>
            <BiSolidTrashAlt />
          </div>
          <Map title={item.chartData.title} />
        </div>
      ) : item.chartData.chartType === "HeatMapChart" ? (
        <div className={`dashboard-label`}>
          <div className="bin cancelSelectorName" onClick={handleDelete}>
            <BiSolidTrashAlt />
          </div>
          <HeatMap title={item.chartData.title} data={item.chartData.data} />
        </div>
      ) : item.chartData.chartType === "BarChart" ? (
        <div className={`Charts`}>
          <div className="bin cancelSelectorName" onClick={handleDelete}>
            <BiSolidTrashAlt />
          </div>
          <BarChart
            data={item.chartData.data}
            labels={item.chartData.labels}
            title={item.chartData.title}
            number={item.chartData.number}
            color={item.chartData.color}
          />
        </div>
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
