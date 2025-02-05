import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { BiSolidTrashAlt } from "react-icons/bi";

const PieChart = ({ data, color, labels, title, style, onDelete }) => {
	const [series] = useState(data);

	const [options] = useState({
		chart: {
			width: 340,
			type: "pie",
		},
		labels: labels,
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
		<div className={`dashboard-label ${style}`}>
			<div className="bin cancelSelectorName" onClick={onDelete}>
				<BiSolidTrashAlt />
			</div>
			<div className="dashboard-label-body">
				<h5 className="fs-16 fw-600">{title}</h5>
			</div>
			<div id="chart">
				<ReactApexChart
					options={options}
					series={series}
					type="pie"
					width={340}
				/>
			</div>
			<div id="html-dist"></div>
		</div>
	);
};

export default PieChart;
