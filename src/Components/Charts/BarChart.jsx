import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

// series: [
//   {
//     name: "Net Profit",
//     data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
//   },
//   {
//     name: "Revenue",
//     data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
//   },
//   {
//     name: "Free Cash Flow",
//     data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
//   },
// ],

const BarChart = ({ data, color, labels, chartName }) => {
  const [series] = useState([
    {
      name: "Net Profit",
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
    },
  ]);

  const [options] = useState({
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
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
        formatter: function (val) {
          return "$ " + val + " thousands";
        },
      },
    },
    yaxis: {
      title: {
        text: "$ (thousands)",
      },
    },
    grid: {
      show: false,
    },
  });

  const [state, setState] = React.useState({});

  return (
      <div id="chart" style={{ width: "100%", height: "100%" }}>
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
        />
      </div>
  );
};

export default BarChart;
