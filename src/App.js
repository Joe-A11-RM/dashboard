import { closestCorners, DndContext } from "@dnd-kit/core";
import "./App.css";
import { useRef, useState } from "react";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

import Cards from "./Components/Cards/Cards";
import OffCanvasTemplate from "./Components/OffCanvas";

function App() {
	let [data, setData] = useState([
		{ id: 1, value: 1 },
		{ id: 2, value: 2 },
		{ id: 3, value: 3 },
		{ id: 4, value: 4 },
		{ id: 5, value: 5 },
		{ id: 6, value: 6 },
		{ id: 7, value: 7 },
		{ id: 8, value: 8 },
	]);
	const [mainData, setMainData] = useState([
		{ id: 9, value: 9 },
		{ id: 10, value: 10 },
		{ id: 11, value: 11 },
		{ id: 12, value: 12 },
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

	const handleDragStart = (e, item) => {
		e.dataTransfer.setData("text/plain", JSON.stringify(item));
		console.log(item);
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

	return (
		<div className="App container-fluid">
			<OffCanvasTemplate
				ButtonText={"Open"}
				title={"Draggable Items"}
				backdrop={false}
			>
				<div className="container">
					<div className="col">
						{mainData.map((item) => (
							<div
								key={item.id}
								className="item-card"
								draggable
								onDragStart={(e) => handleDragStart(e, item)}
								style={{
									padding: "10px",
									margin: "5px 0",
									backgroundColor: "#f8f9fa",
									border: "1px solid #ddd",
									borderRadius: "4px",
									cursor: "grab",
								}}
							>
								{item.value}
							</div>
						))}
					</div>
				</div>
			</OffCanvasTemplate>
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
					>
						<SortableContext
							items={data.map((i) => i.id)}
							strategy={rectSortingStrategy}
						>
							{data.map((i) => {
								return (
									<div key={i.id} className="col-lg-3">
										<Cards
											id={i.id}
											item={i.value}
											setData={setData}
											data={data}
										/>
									</div>
								);
							})}
						</SortableContext>
					</DndContext>
				</div>
			</div>
		</div>
	);
}

export default App;
