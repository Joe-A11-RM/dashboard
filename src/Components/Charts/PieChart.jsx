import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = ({ data, color, labels, title, style, subTitle }) => {
  const [series] = useState(data);

  const [options] = useState({
    chart: {
      width: 430,
      type: "pie",
    },
    labels: labels,
    colors: color,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  });

  return (
    <>
      <div id="chart" className="pie-chart">
        <ReactApexChart
          options={options}
          series={series}
          type="pie"
          width={430}
        />
      </div>
      <div id="html-dist"></div>
    </>
  );
};

export default PieChart;
