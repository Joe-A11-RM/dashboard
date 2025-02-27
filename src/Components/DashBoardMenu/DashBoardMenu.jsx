import React, { useContext, useState } from "react";
import OffCanvasTemplate from "../OffCanvas";
import DashboardDiagrams from "./DashboardDiagarms/DashboardDiagrams";
import DashboardWidgetTypes from "./DashboardWidgetTypes/DashboardWidgetTypes";
import { dashboardcontext } from "../../context/DashboardContext";
import DashboardWidgetContent from "./DashboardWidgetContent/DashboardWidgetContent";

export default function DashBoardMenu({ mainData, choice, setChoice }) {
	const handleDragStart = (e, item) => {
		e.dataTransfer.setData("chartType", item);
	};

	const [shown, setShown] = useState({ value: false, type: "" });
	const data = mainData.filter((item) =>
		choice === "ready" ? item.type === "template" : item.type === "custom"
	);

	const renderDraggableCards = (items, filterType) =>
		items
			.filter((i) => (filterType ? i.chartType === filterType : true))
			.map((item) => (
				<div key={item.id} className="col-lg-4">
					<div
						className="item-card"
						draggable
						onDragStart={(e) => handleDragStart(e, item.chartType)}
					>
						<img src={item.img} alt={item.chartType} className="img-fluid" />
					</div>
				</div>
			));
	const renderStaticDiagrams = () => (
		<>
			<DashboardDiagrams
				title="AreaChart"
				img="AreaChart.png"
				setShown={setShown}
			/>
			<DashboardDiagrams
				title="BarChart"
				img="BarChart.png"
				setShown={setShown}
			/>
			<DashboardDiagrams
				title="ColumnChart"
				img="ColumnChart.png"
				setShown={setShown}
			/>
			<DashboardDiagrams
				title="LineChart"
				img="LineChart.png"
				setShown={setShown}
			/>
			<DashboardDiagrams
				title="PieChart"
				img="PieChart.png"
				setShown={setShown}
			/>
		</>
	);
	let { dashboardTypeWidget } = useContext(dashboardcontext);
	return (
		<div className="d-flex justify-content-center align-items-center">
			<OffCanvasTemplate ButtonText={"Generate New Dashboard"} backdrop={false}>
				{dashboardTypeWidget.value === false && <DashboardWidgetTypes />}
				{dashboardTypeWidget.value === true && <DashboardWidgetContent />}
			</OffCanvasTemplate>
		</div>
	);
}
