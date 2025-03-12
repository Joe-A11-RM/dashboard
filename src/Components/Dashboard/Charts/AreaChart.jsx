import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const AreaChart = ({ data, color, labels, chartName }) => {
  const [series] = useState([
    {
      name: chartName,
      data: data,
    },
  ]);

  const [options] = useState({
    chart: {
      type: "area",
      height: 90,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      categories: labels,
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    grid: {
      show: false,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0,
      },
    },

    colors: [color],
    tooltip: {
      enabled: true,
      theme: "light",
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
      fixed: {
        enabled: true,
        position: "topRight",
        offsetY: -50,
        offsetX: 0,
      },
    },
  });

  return (
    <div style={{ width: "150px", height: "60px" }}>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={90}
      />
    </div>
  );
};

export default AreaChart;
