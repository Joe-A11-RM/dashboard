import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const BarChart = ({ data, labels }) => {
  const [series] = useState([
    {
      data: data,
    },
  ]);

  const [options] = useState({
    chart: {
      type: "bar",
      height: 200,
    },
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
      show: true,
    },
  });

  return (
    <div id="chart" style={{ width: "100%", height: "100%" }}>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={300}
      />
    </div>
  );
};

export default BarChart;
