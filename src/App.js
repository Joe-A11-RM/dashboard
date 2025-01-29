import {
	closestCorners,
	DndContext,
	MouseSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import "./App.css";
import { useRef, useState } from "react";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import Cards from "./Components/Cards/Cards";
import Header from "./Components/Header/Header";
import DashBoardMenu from "./Components/DashBoardMenu/DashBoardMenu";
import WidgetSettings from "./Components/WidgetSettings/WidgetSettings";

function App() {
	let [data, setData] = useState([
		{
			id: 1,
			chartType: "LabelChart",
			style: "col-lg-3",
			ChartData: {
				labels: [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
				],
				data: [65, 59, 80, 81, 56, 55, 40],
			},
		},
		{
			id: 2,
			chartType: "LabelChart",
			style: "col-lg-3",
			ChartData: {
				labels: [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
				],
				data: [65, 59, 80, 81, 56, 55, 40],
			},
		},
		{
			id: 3,
			chartType: "LabelChart",
			style: "col-lg-3",
			ChartData: {
				labels: [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
				],
				data: [65, 59, 80, 81, 56, 55, 40],
			},
		},
		{
			id: 4,
			chartType: "LabelChart",
			style: "col-lg-3",
			ChartData: {
				labels: [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
				],
				data: [65, 59, 80, 81, 56, 55, 40],
			},
		},
		{
			id: 5,
			chartType: "LineChart",
			style: "col-lg-3",
			ChartData: {
				labels: [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
				],
				data: [65, 59, 80, 81, 56, 55, 40],
			},
		},
		{
			id: 6,
			chartType: "LineChart",
			style: "col-lg-3",
			ChartData: {
				labels: [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
				],
				data: [65, 59, 80, 81, 56, 55, 40],
			},
		},
		{
			id: 7,
			chartType: "LineChart",
			style: "col-lg-3",
			ChartData: {
				labels: [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
				],
				data: [65, 59, 80, 81, 56, 55, 40],
			},
		},
		{
			id: 8,
			chartType: "LineChart",
			style: "col-lg-3",
			ChartData: {
				labels: [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
				],
				data: [65, 59, 80, 81, 56, 55, 40],
			},
		},
	]);
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
		{
			id: 9,
			chartType: "AreaChart",
			style: "col-lg-3",
			img: "chart.svg",
			type: "custom",
		},
		{
			id: 10,
			chartType: "ColumnChart",
			style: "col-lg-3",
			img: "chart.svg",
			type: "custom",
		},
	]); //Side Menu Chart types
	const [widgetSettings, setWidgetSettings] = useState(false);
	const [choice, setChoice] = useState("ready");

	const getTaskPos = (id) => data.findIndex((task) => task.id === id);

	const handleDragEnd = (event) => {
		const { active, over } = event;
		if (!over || active.id === over.id) return;

		const activeIndex = getTaskPos(active.id);
		const overIndex = getTaskPos(over.id);

		setData((tasks) => {
			const updatedTasks = [...tasks];
			[updatedTasks[activeIndex], updatedTasks[overIndex]] = [
				updatedTasks[overIndex],
				updatedTasks[activeIndex],
			];
			return updatedTasks;
		});
	};

	const handleDrop = (e) => {
		if (choice !== "ready") {
			setWidgetSettings(true);
		} else {
			try {
				e.preventDefault();

				const itemData = e.dataTransfer.getData("text/plain");
				if (!itemData) {
					console.warn("No valid data found in the drop event.");
					return;
				}

				let chartType;
				try {
					chartType = JSON.parse(itemData);
				} catch (parseError) {
					console.warn("Invalid data format. Dropped item is not supported.");
					alert("Click on chart type");
					return;
				}

				const isValidChart = mainData.some(
					(item) => item.chartType === chartType
				);
				if (!isValidChart) {
					console.warn(`"${chartType}" is not a valid droppable chart type.`);
					return;
				}

				const newId = Date.now();
				const randomData = Array.from({ length: 7 }, () =>
					Math.floor(Math.random() * 100)
				);

				const labels =
					data.length > 0
						? data[0].ChartData.labels
						: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

				const chartStyle =
					mainData.find((item) => item.chartType === chartType)?.style ||
					"col-lg-3";

				const newChart = {
					id: newId,
					chartType,
					style: chartStyle,
					ChartData: {
						labels,
						data: randomData,
					},
				};
				setData((prev) => [...prev, newChart]);
			} catch (error) {
				console.error("An error occurred while handling the drop:", error);
			}
		}
	};

	const handleDragOver = (e) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = "copy";
	};
	const containerRef = useRef(null);
	const sensors = useSensors(
		useSensor(MouseSensor, {
			activationConstraint: { delay: 100 },
		})
	);
	return (
		<div className="App container-fluid">
			<Header
				title={"Dynamic Dashboard"}
				subTitle={"Create Your customied dashboard now"}
			>
				<DashBoardMenu
					mainData={mainData}
					choice={choice}
					setChoice={setChoice}
				/>
			</Header>
			<div
				ref={containerRef}
				onDrop={handleDrop}
				onDragOver={handleDragOver}
				style={{
					border: "2px dashed #007bff",
					padding: "20px",
					marginTop: "20px",
					maxHeight: "fit-content",
					backgroundColor: "#f8f9fa",
					overflow: "hidden",
				}}
			>
				<div className="row">
					<DndContext
						collisionDetection={closestCorners}
						modifiers={[restrictToWindowEdges]}
						onDragEnd={handleDragEnd}
						sensors={sensors}
					>
						<SortableContext
							items={data.map((i) => i.id)}
							strategy={rectSortingStrategy}
						>
							{data.map((i) => {
								return (
									<div key={i.id} className={i.style}>
										<Cards id={i.id} item={i} setData={setData} data={data} />
									</div>
								);
							})}
						</SortableContext>
					</DndContext>
				</div>
			</div>
			<WidgetSettings
				show={widgetSettings}
				onHide={() => setWidgetSettings(false)}
			/>
		</div>
	);
}

export default App;
