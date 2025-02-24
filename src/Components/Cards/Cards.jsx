import React, { useContext } from "react";
import LabelChart from "../Charts/LabelChart";
import PieChart from "../Charts/PieChart";
import Map from "../Map/Map";
import HeatMap from "../Charts/HeatMap";
import AlertWidget from "../Charts/AlertWidget";
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
      {item.chartData.chartType === "LabelChart" ? (
        <div className={`dashboard-label`}>
          {editMode && (
            <div className="d-flex">
              <div className="edit cancelSelectorName" onClick={handleDelete}>
                <img src="assets/Dark/Edit.svg" alt="edit" />
              </div>
              <div className="bin cancelSelectorName" onClick={handleDelete}>
                <img src="assets/Dark/Delete.svg" alt="delete" />
              </div>
            </div>
          )}

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
          {editMode && (
            <div className="d-flex">
              <div className="edit cancelSelectorName" onClick={handleDelete}>
                <img src="assets/Dark/Edit.svg" alt="edit" />
              </div>
              <div className="bin cancelSelectorName" onClick={handleDelete}>
                <img src="assets/Dark/Delete.svg" alt="delete" />
              </div>
            </div>
          )}
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
          {editMode && (
            <div className="d-flex">
              <div className="edit cancelSelectorName" onClick={handleDelete}>
                <img src="assets/Dark/Edit.svg" alt="edit" />
              </div>
              <div className="bin cancelSelectorName" onClick={handleDelete}>
                <img src="assets/Dark/Delete.svg" alt="delete" />
              </div>
            </div>
          )}
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
            <img src="assets/Dark/Delete.svg" alt="delete" />
          </div>
          <Map title={item.chartData.title} />
        </div>
      ) : item.chartData.chartType === "HeatMapChart" ? (
        <div className={`dashboard-label`}>
          <div className="bin cancelSelectorName" onClick={handleDelete}>
            <img src="assets/Dark/Delete.svg" alt="delete" />
          </div>
          <HeatMap title={item.chartData.title} data={item.chartData.data} />
        </div>
      ) : item.chartData.chartType === "BarChart" ? (
        <div className={`Charts`}>
          <div className="bin cancelSelectorName" onClick={handleDelete}>
            <img src="assets/Dark/Delete.svg" alt="delete" />
          </div>
          <BarChart
            data={item.chartData.data}
            labels={item.chartData.labels}
            title={item.chartData.title}
            number={item.chartData.number}
            color={item.chartData.color}
          />
        </div>
      ) : item.chartData.chartType === "VehiclesStatus" ? (
        <Widget
          editMode={editMode}
          handleDelete={handleDelete}
          title={item.chartData.title}
          subTitle="Total Vehicles: 100"
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
