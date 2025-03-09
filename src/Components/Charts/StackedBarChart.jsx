import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const StackedBarChart = ({ data, labels }) => {
  console.log(data);
  const [series] = useState(data);

  const [options] = useState({
    chart: {
      type: "bar",
      height: 200,
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    colors: ["#A7B4F6", "#07418C"],
    plotOptions: {
      bar: {
        columnWidth: "25%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["#A7B4F6", "#07418C"],
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: labels,
    },

    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        // formatter: function (val) {
        //   return "$ " + val + " thousands";
        // },
      },
    },
    yaxis: {
      title: {
        // text: "$ (thousands)",
      },
    },
    grid: {
      show: true,
    },
  });

  return (
    <div id="chart" style={{ width: "100%" }}>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={240}
      />
    </div>
  );
};

export default StackedBarChart;
