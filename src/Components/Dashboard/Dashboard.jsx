import React, { useState } from "react";
import Header from "./DashboardHeader/Header";
import DashBoardMenu from "./DashBoardMenu/DashBoardMenu";
import WidgetSettings from "./WidgetSettings/WidgetSettings";
import Gridthree from "./Grid/Gridthree";
import Trial from "./Grid/Trial";

export default function Dashboard() {
	const [widgetSettings, setWidgetSettings] = useState(false);
	const [choice, setChoice] = useState("ready");
	console.log("sessionStorage", sessionStorage);
	return (
		<div>
			<div className="App">
				<Header />
				<DashBoardMenu choice={choice} setChoice={setChoice} />
				<WidgetSettings
					show={widgetSettings}
					onHide={() => setWidgetSettings(false)}
				/>
				<Trial />
			</div>
		</div>
	);
}
