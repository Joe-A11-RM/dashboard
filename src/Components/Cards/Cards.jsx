import React, { useContext } from "react";
import PieChart from "../Charts/PieChart";
import Map from "../Map/Map";
import BarChart from "../Charts/BarChart";
import { dashboardcontext } from "../../context/DashboardContext";
import Widget from "../Widget/Widget";
import CountsOverview from "../Charts/static/CountsOverview";
import Pagination from "../Helper/Pagination";
import StackedBarChart from "../Charts/StackedBarChart";

export default function Cards({ key, item, i, removeWidget, isDraggable }) {
  //console.log("Item", item);
  let { editMode } = useContext(dashboardcontext);
  const handleDelete = (e) => {
    e.stopPropagation();
    e.preventDefault();
    removeWidget(item?.id);
  };
  return (
    <div className="h-100 radius-8" key={key}>
      {item.chartData.chartType === "TrackingMapPositions" ? (
        <Widget
          editMode={editMode}
          handleDelete={handleDelete}
          title={item.chartData.title}
        >
          <Map title={item.chartData.title} />
        </Widget>
      ) : item.chartData.chartType === "MapChart" ? (
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
          {item.chartData.pagination && (
            <>
              <Pagination
                page={1}
                totalPages={20}
                onPageChange={() => console.log("Page Change")}
                setLimit={() => console.log("Limit Change")}
                unit="Vehicles"
              />
            </>
          )}
        </Widget>
      ) : item.chartData.chartType === "EngineHoursBarChart" ? (
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
          {item.chartData.pagination && (
            <>
              <Pagination
                page={1}
                totalPages={20}
                onPageChange={() => console.log("Page Change")}
                setLimit={() => console.log("Limit Change")}
                unit="Vehicles"
              />
            </>
          )}
        </Widget>
      ) : item.chartData.chartType === "SpeedDetailsChart" ? (
        <Widget
          editMode={editMode}
          handleDelete={handleDelete}
          title={item.chartData.title}
          subTitle="Distance coverage chart for vehicles in period : 2025-01-20 To 2025-02-20"
        >
          <StackedBarChart
            data={[
              { name: "max-speed", data: item.chartData.data },
              { name: "avg-speed", data: item.chartData.data },
            ]}
            labels={item.chartData.labels}
            title={item.chartData.title}
            number={item.chartData.number}
            color={item.chartData.color}
          />
          {item.chartData.pagination && (
            <>
              <Pagination
                page={1}
                totalPages={20}
                onPageChange={() => console.log("Page Change")}
                setLimit={() => console.log("Limit Change")}
                unit="Vehicles"
              />
            </>
          )}
        </Widget>
      ) : (
        <div className="item-card">
          <div className="bin cancelSelectorName" onClick={handleDelete}>
            <img src="assets/Dark/Delete.svg" alt="delete" />
          </div>
          <div className="item-card-chart">{item.chartType}</div>
        </div>
      )}
    </div>
  );
}
