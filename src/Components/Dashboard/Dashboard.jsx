import React, { useRef, useState } from "react";
import Header from "./DashboardHeader/Header";
import DashBoardMenu from "./DashBoardMenu/DashBoardMenu";
import WidgetSettings from "./WidgetSettings/WidgetSettings";
import ResponsiveGrid from "./Grid/ResponsiveGrid";
import { useSelector } from "react-redux";
import DraggableItems from "./Helper/DraggableItem/DraggableItems";

export default function Dashboard() {
	const [widgetSettings, setWidgetSettings] = useState(false);
	const [choice, setChoice] = useState("ready");
	console.log("sessionStorage", sessionStorage);
	const draggableItems = useSelector(
		(state) => state.dashboards.draggableItems
	);
	const nodesRef = useRef({});
	console.log("object", draggableItems);
	return (
		<div>
			<div className="App">
				<Header />
				<DashBoardMenu choice={choice} setChoice={setChoice} />
				<WidgetSettings
					show={widgetSettings}
					onHide={() => setWidgetSettings(false)}
				/>
				<ResponsiveGrid />
				{draggableItems?.map((item) => {
					if (!nodesRef.current[item.id]) {
						nodesRef.current[item.id] = React.createRef();
					}
					return (
						<>
							<DraggableItems
								item={item}
								nodesRef={nodesRef}
							/>
						</>
					);
				})}
			</div>
		</div>
	);
}
