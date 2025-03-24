import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

export default function DonutPieChart({ data, labels }) {
	const [series] = useState(data);
	const [options] = useState({
		chart: {
			width: 430,
			type: "donut",
		},
		labels: labels,
		colors: ["#F6BB63", "#76E7F1", "#F17676", "#2E93FA", "#775DD0", "#93AAC1"],
		dataLabels: {
			enabled: false, // ✅ Hides values inside the chart
		},
		legend: {
			position: "right",
			// ✅ Moves labels with values beside the chart
			formatter: function (seriesName, opts) {
				return `${seriesName}: ${opts.w.globals.series[opts.seriesIndex]}`;
			},
		},
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
		<div>
			<div id="chart" className="donut-chart">
				<ReactApexChart
					options={options}
					series={series}
					type="donut"
					width={430}
				/>
			</div>
			<div id="html-dist"></div>
		</div>
	);
}
