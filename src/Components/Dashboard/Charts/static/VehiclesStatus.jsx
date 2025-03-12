import React from "react";
import PieChart from "../PieChart";

const VehiclesStatus = ({ item }) => {
  return (
    <PieChart
      data={item.chartData.data}
      labels={item.chartData.labels}
      title={item.chartData.title}
      number={item.chartData.number}
      color={item.chartData.color}
    />
  );
};

export default VehiclesStatus;
