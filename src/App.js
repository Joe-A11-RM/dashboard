/* eslint-disable no-unused-vars */
import "./App.css";
import { useState } from "react";

import Header from "./Components/DashboardHeader/Header";
import DashBoardMenu from "./Components/DashBoardMenu/DashBoardMenu";
import WidgetSettings from "./Components/WidgetSettings/WidgetSettings";
import Grid from "./Components/Grid/Grid";
import DashboardContext from "./context/DashboardContext";

function App() {
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
	const [showDahsboardMenu, setShowDahsboardMenu] = useState(false);
	return (
		<>
			<DashboardContext>
				<div className="App">
					<Header
						showDahsboardMenu={showDahsboardMenu}
						setShowDahsboardMenu={setShowDahsboardMenu}
					/>
					<DashBoardMenu
						mainData={mainData}
						choice={choice}
						setChoice={setChoice}
						showDahsboardMenu={showDahsboardMenu}
						setShowDahsboardMenu={setShowDahsboardMenu}
					/>

					<WidgetSettings
						show={widgetSettings}
						onHide={() => setWidgetSettings(false)}
					/>
					<Grid />
				</div>
			</DashboardContext>
		</>
	);
}

export default App;
