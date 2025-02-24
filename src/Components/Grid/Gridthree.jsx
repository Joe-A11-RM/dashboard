import React, { useContext, useEffect, useRef, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css"; // Required styles
import Cards from "../Cards/Cards";
import { useGetAllDashboardsWidgetsQuery } from "../../Redux/service/Dashboard";
import { dashboardcontext } from "../../context/DashboardContext";
import DashboardAddWidget from "../DashboardHeader/DashboardOptions/DashboardAddWidget/DashboardAddWidget";
const ReactGridLayout = WidthProvider(Responsive);

const staticData = [
	{
		id: 1,
		chartData: {
			chartType: "CountsOverview",
			data: [
				{ label: "Users", total: "20" },
				{ label: "Vehicles", total: "20000" },
				{ label: "Drivers", total: "250" },
			],
			title: "Counts Overview",
		},
		position: {
			i: "1",
			x: 0,
			y: 0,
			w: 6,
			h: 1,
		},
	},
	{
		id: 2,
		chartData: {
			labels: ["Moving", "Idle", "Offline", "Stopped"],
			chartType: "VehiclesStatus",
			data: Array.from({ length: 4 }, () => Math.floor(Math.random() * 100)),
			color: "#3B82F6",
			number: Math.floor(Math.random() * 100),
			title: "Vehicles Status",
		},
		position: {
			i: "2",
			x: 6,
			y: 0,
			w: 6,
			h: 1,
		},
	},
	{
		id: 3,
		chartData: {
			labels: [
				"Vehicle 01",
				"Vehicle 01",
				"Vehicle 01",
				"Vehicle 01",
				"Vehicle 01",
				"Vehicle 01",
				"Vehicle 01",
				"Vehicle 01",
				"Vehicle 01",
				"Vehicle 01",
				"Vehicle 01",
				"Vehicle 01",
			],
			chartType: "DistanceCoverage",
			data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100)),
			color: "#3B82F6",
			number: Math.floor(Math.random() * 100),
			title: "Distance Analytics",
		},
		position: {
			i: "3",
			x: 0,
			y: 1,
			w: 12,
			h: 1,
		},
	},
	{
		id: 5,
		chartData: {
			labels: ["January", "February", "March", "April", "May", "June", "July"],
			chartType: "LabelChart",
			data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)),
			color: "#3B82F6",
			number: Math.floor(Math.random() * 100),
			title: "Growth Chart",
		},
		position: {
			i: "5",
			x: 0,
			y: 1,
			w: 3,
			h: 1,
		},
	},
	{
		id: 6,
		chartData: {
			labels: ["January", "February", "March", "April", "May", "June", "July"],
			chartType: "LabelChart",
			data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)),
			color: "#3B82F6",
			number: Math.floor(Math.random() * 100),
			title: "Growth Chart",
		},
		position: {
			i: "6",
			x: 3,
			y: 1,
			w: 3,
			h: 1,
		},
	},
	{
		id: 7,
		chartData: {
			labels: ["January", "February", "March", "April", "May", "June", "July"],
			chartType: "LabelChart",
			data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)),
			color: "#3B82F6",
			number: Math.floor(Math.random() * 100),
			title: "Growth Chart",
		},
		position: {
			i: "7",
			x: 10,
			y: 1,
			w: 2,
			h: 1,
		},
	},
	{
		id: 8,
		chartData: {
			labels: ["January", "February", "March", "April", "May", "June", "July"],
			chartType: "LabelChart",
			data: Array.from({ length: 8 }, () => Math.floor(Math.random() * 100)),
			color: "#3B82F6",
			number: Math.floor(Math.random() * 100),
			title: "Growth Chart",
		},
		position: {
			i: "8",
			x: 10,
			y: 1,
			w: 2,
			h: 1,
		},
	},
];

const generateInitialTheme = (data) => {
	return (
		data.length > 0 &&
		data?.map((item) => ({
			...item.position,
			component: (
				<Cards
					key={item.id}
					i={item.position.i}
					item={item}
					removeWidget={() => {}}
				/>
			),
		}))
	);
};

export default function Gridthree() {
	let [data, setData] = useState([
		{
			id: 1,

			style: "col-lg-3",
			chartData: {
				chartType: "LabelChart",
				labels: [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
				],
				data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)),
				color: "#3B82F6",
				number: Math.floor(Math.random() * 100),
				title: "Chart #1",
			},
			postion: {
				i: "1",
				x: 0,
				y: 0,
				w: 3,
				h: 1,
			},
		},
		{
			id: 1,
			style: "col-lg-3",
			chartData: {
				chartType: "PieChart",
				labels: [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
				],
				data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)),
				color: "#3B82F6",
				number: Math.floor(Math.random() * 100),
				title: "Revenue Growth",
			},
		},
	]);
	let { dashboardInf, editMode } = useContext(dashboardcontext);
	let { data: DashboardWidgets } = useGetAllDashboardsWidgetsQuery(
		{
			id: dashboardInf?.id,
		},
		{ skip: !dashboardInf?.id }
	);
	const [theme, setTheme] = useState(null);

	useEffect(() => {
		if (DashboardWidgets?.response?.data && dashboardInf?.id) {
			setTheme(generateInitialTheme(DashboardWidgets.response.data)); // ✅ Set fresh data
		}
	}, [dashboardInf?.id, DashboardWidgets]); // Depend on dashboardInf.id to trigger reset

	const prevThemeLengthRef = useRef(theme?.length);
	const removeWidget = (id) => {
		setTheme((prev) => prev.filter((item) => item.i !== String(id)));
	};

	const generateLayouts = (themeData, columnCounts) => {
		console.log("Theme Data", themeData);
		const layouts = {};
		let prevThemeLength = prevThemeLengthRef.current;
		Object.entries(columnCounts).forEach(([breakpoint, cols]) => {
			let currentX = 0,
				currentY = 0,
				rowHeight = 0;
			if (themeData?.length > 0) {
				layouts[breakpoint] = themeData?.map(({ i, x, y, w, h }, index) => {
					console.log("themeData[index]?.component?.props.item", i);
					let newWidth =
						breakpoint === "xs" ? 4 : Math.max(2, Math.floor((w / 12) * cols));
					if (index === 0) {
						currentX = 0;
						currentY = 0;
						rowHeight = h;
					} else {
						if (currentX + newWidth > cols) {
							currentX = 0;
							currentY += rowHeight;
							rowHeight = h;
						}
					}
					let newPosition = {
						i,
						x: currentX,
						y: currentY,
						w: newWidth,
						h,
						component: (
							<Cards
								key={index}
								i={index}
								item={themeData[index]?.component?.props.item}
								removeWidget={removeWidget}
							/>
						),
					};
					currentX += newWidth;
					rowHeight = Math.max(rowHeight, h);
					if (
						index === themeData.length - 1 &&
						prevThemeLength !== themeData.length
					) {
						console.log("Updating last item position!");
						newPosition = {
							i,
							x: themeData[themeData.length - 1].x,
							y: currentY,
							w: themeData[themeData.length - 1].w,
							h: themeData[themeData.length - 1].h,
							component: (
								<Cards
									key={index}
									i={index}
									item={themeData[themeData.length - 1]?.component?.props.item}
									removeWidget={removeWidget}
								/>
							),
						};
					}
					return newPosition;
				});
			}
		});
		if (layouts) {
			["lg", "md"].forEach((breakpoint) => {
				if (layouts[breakpoint]) {
					const y0Items = layouts[breakpoint].filter((item) => item.y === 0);

					// Dynamically determine the next y value based on the max height in y0Items
					const maxHeight = Math.max(...y0Items.map((item) => item.h), 0);
					const yNextItems = layouts[breakpoint].filter(
						(item) => item.y === maxHeight
					);

					y0Items.forEach((y0Item) => {
						yNextItems.forEach((yNextItem, index) => {
							if (y0Item.x === yNextItem.x) {
								if (y0Item.h > yNextItem.h) {
									// Move x position
									yNextItem.x = y0Item.w + yNextItem.x;

									// Find the next item in yNextItems
									if (index + 1 < yNextItems.length) {
										const nextItem = yNextItems[index + 1];
										nextItem.x = 0; // Set x to 0
									}
								}
							}
						});
					});
				}
			});
		}
		return layouts;
	};

	const columnCounts = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };
	let [x, setX] = useState([]);
	//const layouts = generateLayouts(theme, columnCounts);
	useEffect(() => {
		setX(generateLayouts(theme, columnCounts));
	}, [theme]);

	const handleDrop = (e) => {
		//e.preventDefault(); // Prevent default browser behavior

		// Ensure dataTransfer exists
		if (!e.dataTransfer) {
			console.error("Invalid drop event: No dataTransfer available.");
			return;
		}

		// Check the dataTransfer type (should match what your sidebar sets)
		const draggedData = e.dataTransfer.getData("widget"); // Ensure this key matches the sidebar
		if (!draggedData) {
			console.error("Drop rejected: No valid widget data found.");
			return;
		}
		setX((prevX) => {
			const updatedState = { ...prevX };

			Object.keys(columnCounts).forEach((breakpoint) => {
				const prevItems = prevX[breakpoint] || [];
				const lastItem =
					prevItems.length > 0 ? prevItems[prevItems.length - 1] : null;

				let newX = 0;
				let newY = 0;

				if (lastItem) {
					newX =
						lastItem.x + lastItem.w >= columnCounts[breakpoint]
							? 0
							: lastItem.x + lastItem.w;

					// Count how many items exist with the current Y value
					const sameYCount = prevItems.filter(
						(item) => item.y === lastItem.y
					).length;

					// If 4 items already exist at lastItem.y, increase Y; otherwise, keep it the same
					newY = sameYCount >= 4 ? lastItem.y + 1 : lastItem.y;
				}

				const newId = String(prevItems.length + 1);
				const newItem = {
					i: newId,
					x: newX,
					y: newY,
					w: Math.max(2, Math.floor((3 / 12) * columnCounts[breakpoint])), // Adjust width based on columns
					h: 1,
					component: (
						<Cards
							key={`${breakpoint}-${newId}`}
							i={newId}
							item={data[0]}
							removeWidget={removeWidget}
						/>
					),
				};

				updatedState[breakpoint] = [...prevItems, newItem];
			});

			return updatedState;
		});
	};
	console.log("KIIIIIIIIIIIII", DashboardWidgets);
	const j = () => {
		let data = [];

		if (window.innerWidth > 1200) {
			data = x?.lg || [];
		} else if (window.innerWidth > 996) {
			data = x?.md || [];
		} else if (window.innerWidth > 768) {
			data = x?.sm || [];
		} else if (window.innerWidth > 480) {
			data = x?.xs || [];
		} else {
			data = x?.xss || [];
		}
		// Return "No Data" if empty
		if (data.length === 0) {
			return (
				<div className="no-data">
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis nemo
					hic ullam eligendi iste? Qui aut, unde, ducimus autem exercitationem
					fugiat iste vitae cupiditate voluptatum assumenda laborum hic quisquam
					modi aperiam dolor aspernatur? Voluptatibus, laborum. Ipsa, magni sed
					exercitationem libero voluptate vel esse facere porro. Totam cum atque
					illum, illo, beatae asperiores magnam architecto reiciendis corrupti
					assumenda sed laboriosam. Ab fugiat distinctio beatae est! Ducimus
					laudantium deleniti ab libero. Veniam repellat sequi nobis molestias.
					Eum dolorem libero officiis veniam nostrum est, nesciunt magni nulla
					tempore excepturi provident expedita adipisci voluptate eligendi ab
					rerum cupiditate quaerat distinctio, itaque eos? Ullam, sunt.
				</div>
			);
		}

		return data.map(({ i, component }) => (
			<div key={i} className="grid-item">
				{component}
			</div>
		));
	};
	return (
		<div className="">
			{DashboardWidgets?.response.data.length > 0 ? (
				<ReactGridLayout
					key={JSON.stringify(x)}
					className="layout bg-body"
					layouts={x}
					cols={columnCounts}
					rowHeight={400}
					margin={[20, 20]}
					breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
					isResizable={false}
					isDroppable={editMode ? true : false}
					isDraggable={editMode ? true : false}
					allowOverlap={false}
					autoSize={true}
					onDrop={handleDrop}
					draggableCancel=".cancelSelectorName"
				>
					{j()}
				</ReactGridLayout>
			) : (
				<div className="vh-100 d-flex justify-content-center align-items-center">
					<DashboardAddWidget />
				</div>
			)}
		</div>
	);
}
