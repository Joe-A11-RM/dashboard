import { BiSolidTrashAlt } from "react-icons/bi";
import React from "react";
import LabelChart from "../Charts/LabelChart";
import PieChart from "../Charts/PieChart";

export default function Cards({ item, i, removeWidget }) {
  const handleDelete = (e) => {
    e.stopPropagation();
    console.log("ID", i);
    removeWidget(i);
  };

  return (
    <div key={item.id}>
      {item.chartType === "LabelChart" ? (
        <LabelChart
          data={item.ChartData.data}
          labels={item.ChartData.labels}
          title={item.ChartData.title}
          number={item.ChartData.number}
          color={item.ChartData.color}
          onDelete={handleDelete}
        />
      ) : item.chartType === "PieChart" ? (
        <PieChart
          data={item.ChartData.data}
          labels={item.ChartData.labels}
          title={item.ChartData.title}
          number={item.ChartData.number}
          color={item.ChartData.color}
          onDelete={handleDelete}
        />
      ) : (
        <div className="item-card">
          <div className="bin" onClick={handleDelete}>
            <BiSolidTrashAlt />
          </div>
          <div className="item-card-chart">{item.chartType}</div>
        </div>
      )}
    </div>
  );
}
