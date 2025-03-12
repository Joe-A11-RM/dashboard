import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const StackedBarChart = ({ data, labels }) => {
  const [series, setSeries] = useState([]);

  const [options, setOptions] = useState({});
  useEffect(() => {
    setSeries(data.map((d) => ({ ...d })));
    setOptions({
      chart: {
        type: "bar",
        height: 200,
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      colors: ["#07418C", "#A7B4F6"],
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
        colors: ["#07418C", "#A7B4F6"],
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

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
