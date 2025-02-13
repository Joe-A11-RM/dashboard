import React, { useState } from "react";
import OffCanvasTemplate from "../OffCanvas";
import DashboardSelection from "./DashboardSelection/DashboardSelection";
import DashboardDiagrams from "./DashboardDiagarms/DashboardDiagrams";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function DashBoardMenu({
	mainData,
	choice,
	setChoice,
	setShowDahsboardMenu,
	showDahsboardMenu,
}) {
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

	return (
		<div className="d-flex justify-content-center align-items-center">
			<OffCanvasTemplate
				ButtonText={"Generate New Dashboard"}
				title={"Select widgets"}
				backdrop={false}
				showDahsboardMenu={showDahsboardMenu}
				setShowDahsboardMenu={setShowDahsboardMenu}
			>
				<DashboardSelection
					choice={choice}
					setChoice={setChoice}
					setShown={setShown}
				/>

				<div className="container">
					{choice === "custom" && shown.value && (
						<>
							<div
								className="d-flex align-items-center pointer"
								onClick={() => {
									setShown({ value: false, type: "" });
								}}
							>
								<FaArrowLeftLong />
								<div className="ms-2">Back</div>
							</div>
						</>
					)}
					<div className="row ">
						{choice === "custom" && !shown.value && renderStaticDiagrams()}
						{(choice === "custom" && shown.value) ||
						(choice === "ready" && !shown.value)
							? renderDraggableCards(data, shown.type)
							: null}
					</div>
				</div>
			</OffCanvasTemplate>
		</div>
	);
}
