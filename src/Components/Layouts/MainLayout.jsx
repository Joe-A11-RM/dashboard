/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import WidgetSettings from "../WidgetSettings/WidgetSettings";
import Gridthree from "../Grid/Gridthree";
import Header from "../DashboardHeader/Header";
import DashBoardMenu from "../DashBoardMenu/DashBoardMenu";

export default function MainLayout() {
	const [mainData, setMainData] = useState([
		{
			id: 1,
			chartType: "LabelChart",
			style: "col-lg-3",
			img: "labelchart.png",
			type: "template",
		},
		{
			id: 2,
			chartType: "LineChart",
			style: "col-lg-3",
			img: "labelchart.png",
			type: "template",
		},
		{
			id: 3,
			chartType: "BarChart",
			style: "col-lg-3",
			img: "labelchart.png",
			type: "template",
		},
		{
			id: 4,
			chartType: "PieChart",
			style: "col-lg-3",
			img: "labelchart.png",
			type: "template",
		},
		{
			id: 5,
			chartType: "LabelChart",
			style: "col-lg-3",
			img: "chart.svg",
			type: "custom",
		},
		{
			id: 6,
			chartType: "LineChart",
			style: "col-lg-3",
			img: "chart.svg",
			type: "custom",
		},
		{
			id: 7,
			chartType: "BarChart",
			style: "col-lg-3",
			img: "chart.svg",
			type: "custom",
		},
		{
			id: 8,
			chartType: "PieChart",
			style: "col-lg-3",
			img: "chart.svg",
			type: "custom",
		},
	]);
	const [widgetSettings, setWidgetSettings] = useState(false);
	const [choice, setChoice] = useState("ready");
	console.log("sessionStorage", sessionStorage);
	return (
		<div>
			<div className="App">
				<Header />

				<DashBoardMenu
					mainData={mainData}
					choice={choice}
					setChoice={setChoice}
				/>

				<WidgetSettings
					show={widgetSettings}
					onHide={() => setWidgetSettings(false)}
				/>

				<Gridthree />
			</div>
		</div>
	);
}
