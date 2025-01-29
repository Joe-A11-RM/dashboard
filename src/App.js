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

function App() {
	let [data, setData] = useState([
		{ id: 1, value: 1, style: "col-lg-3" },
		{ id: 2, value: 1, style: "col-lg-3" },
		{ id: 3, value: 1, style: "col-lg-3" },
		{ id: 4, value: 1, style: "col-lg-3" },
		{ id: 5, value: 5, style: "col-lg-3" },
		{ id: 6, value: 6, style: "col-lg-3" },
		{ id: 7, value: 7, style: "col-lg-3" },
		{ id: 8, value: 8, style: "col-lg-3" },
	]);
	const [mainData, setMainData] = useState([
		{ id: 9, value: 9, style: "col-lg-3" },
		{ id: 10, value: 10, style: "col-lg-3" },
		{ id: 11, value: 11, style: "col-lg-3" },
		{ id: 12, value: 12, style: "col-lg-3" },
	]);

	const [customData, setCustomData] = useState([
		{ id: 13, value: 13, style: "col-lg-3" },
		{ id: 14, value: 14, style: "col-lg-3" },
		{ id: 15, value: 15, style: "col-lg-3" },
	]);

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
		e.preventDefault();
		const itemData = e.dataTransfer.getData("text/plain");

		const item = JSON.parse(itemData);

		console.log("Dropped Item:", item);
		if (item && !data.includes(item)) {
			setData((prev) => [...prev, item]);
		}
	};

	const handleDragOver = (e) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = "copy";
	};
	const containerRef = useRef(null);
	const sensors = useSensors(
		useSensor(MouseSensor, {
			activationConstraint: { delay: 140 },
		})
	);

	return (
		<div className="App container-fluid">
			<Header
				title={"Dynamic Dashboard"}
				subTitle={"Create Your customied dashboard now"}
			>
				<DashBoardMenu mainData={mainData} customData={customData} />
			</Header>
			<div
				ref={containerRef}
				onDrop={handleDrop}
				onDragOver={handleDragOver}
				className="dashboard-drop-area row"
			>
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
								<div key={i.id} className="col-lg-3">
									<Cards id={i.id} item={i} setData={setData} data={data} />
								</div>
							);
						})}
					</SortableContext>
				</DndContext>
			</div>
		</div>
	);
}

export default App;
