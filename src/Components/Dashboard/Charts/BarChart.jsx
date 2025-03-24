import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const BarChart = ({ data, labels }) => {
	const [series, setSeries] = useState([]);
	const [options, setOptions] = useState({});
	useEffect(() => {
		setSeries([
			{
				data: data,
			},
		]);
		setOptions({
			chart: {
				type: "bar",
				height: 200,
				toolbar: {
					show: false,
				},
			},
			colors: ["#023E8A"],
			plotOptions: {
				bar: {
					columnWidth: "32px",
					borderRadius: 5,
					borderRadiusApplication: "end",
				},
			},
			stroke: {
				show: true,
				width: 2,
				colors: ["#023E8A"],
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

export default BarChart;
