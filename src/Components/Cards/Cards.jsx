import React, { useContext } from "react";
import PieChart from "../Charts/PieChart";
import Map from "../Map/Map";
import BarChart from "../Charts/BarChart";
import { dashboardcontext } from "../../context/DashboardContext";
import Widget from "../Widget/Widget";
import CountsOverview from "../Charts/static/CountsOverview";

export default function Cards({ key, item, i, removeWidget, isDraggable }) {
  let { editMode } = useContext(dashboardcontext);
  const handleDelete = (e) => {
    e.stopPropagation();
    e.preventDefault();
    removeWidget(i);
  };
  return (
    <div className="h-100" key={key}>
      {item.chartData.chartType === "MapChart" ? (
        <div className={`dashboard-label`}>
          <div className="bin cancelSelectorName" onClick={handleDelete}>
            <img src="assets/Dark/Delete.svg" alt="delete" />
          </div>
          <Map title={item.chartData.title} />
        </div>
      ) : item.chartData.chartType === "PieChart" ? (
        <Widget
          editMode={editMode}
          handleDelete={handleDelete}
          title={item.chartData.title}
        >
          <PieChart
            data={item.chartData.data}
            labels={item.chartData.labels}
            title={item.chartData.title}
            number={item.chartData.number}
            color={["#4FD7A9", "#F6BB63", "#93AAC1", "#F17676"]}
            subTitle="Total Vehicles: 100"
          />
        </Widget>
      ) : item.chartData.chartType === "CountsOverview" ? (
        <Widget
          editMode={editMode}
          handleDelete={handleDelete}
          title={item.chartData.title}
        >
          <CountsOverview
            data={item.chartData.data}
            labels={item.chartData.labels}
            title={item.chartData.title}
            number={item.chartData.number}
            color={["#4FD7A9", "#F6BB63", "#93AAC1", "#F17676"]}
            subTitle="Total Vehicles: 100"
          />
        </Widget>
      ) : item.chartData.chartType === "BarChart" ? (
        <Widget
          editMode={editMode}
          handleDelete={handleDelete}
          title={item.chartData.title}
          subTitle="Distance coverage chart for vehicles in period : 2025-01-20 To 2025-02-20"
        >
          <BarChart
            data={item.chartData.data}
            labels={item.chartData.labels}
            title={item.chartData.title}
            number={item.chartData.number}
            color={item.chartData.color}
          />
        </Widget>
      ) : (
        <div className="item-card">
          <button className="bin cancelSelectorName" onClick={handleDelete}>
            <img src="assets/Dark/Delete.svg" alt="delete" />
          </button>
          <div className="item-card-chart">{item.chartType}</div>
        </div>
      )}
    </div>
  );
}
