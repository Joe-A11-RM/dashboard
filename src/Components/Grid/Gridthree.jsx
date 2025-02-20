import React, { useRef, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css"; // Required styles
import Cards from "../Cards/Cards";
const ReactGridLayout = WidthProvider(Responsive);

const staticData = [
	{
		id: 1,
		chartData: {
			labels: ["January", "February", "March", "April", "May", "June", "July"],
			chartType: "LabelChart",
			data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)),
			color: "#3B82F6",
			number: Math.floor(Math.random() * 100),
			title: "Growth Chart",
		},
		position: {
			i: "1",
			x: 0,
			y: 0,
			w: 3,
			h: 1,
			static: true,
		},
	},
	{
		id: 2,
		chartData: {
			labels: ["January", "February", "March", "April", "May", "June", "July"],
			chartType: "LabelChart",
			data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)),
			color: "#3B82F6",
			number: Math.floor(Math.random() * 100),
			title: "Growth Chart",
		},
		position: {
			i: "2",
			x: 3,
			y: 0,
			w: 3,
			h: 1,
		},
	},
	{
		id: 3,
		chartData: {
			labels: ["January", "February", "March", "April", "May", "June", "July"],
			chartType: "PieChart",
			data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)),
			color: "#3B82F6",
			number: Math.floor(Math.random() * 100),
			title: "Growth Chart",
		},
		position: {
			i: "3",
			x: 6,
			y: 0,
			w: 4,
			h: 2,
		},
	},
	{
		id: 4,
		chartData: {
			labels: ["January", "February", "March", "April", "May", "June", "July"],
			chartType: "LabelChart",
			data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)),
			color: "#3B82F6",
			number: Math.floor(Math.random() * 100),
			title: "Growth Chart",
		},
		position: {
			i: "4",
			x: 10,
			y: 0,
			w: 2,
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

const generateInitialTheme = (data) =>
	data.map((item) => ({
		...item.position,
		component: (
			<Cards
				key={item.id}
				i={item.position.i}
				item={item}
				removeWidget={() => {}}
			/>
		),
	}));

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
			chartType: "PieChart",
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
				data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)),
				color: "#3B82F6",
				number: Math.floor(Math.random() * 100),
				title: "Revenue Growth",
			},
		},
	]);
	const [theme, setTheme] = useState(generateInitialTheme(staticData));
	const prevThemeLengthRef = useRef(theme.length); // Store previous theme length

	const removeWidget = (id) => {
		setTheme((prev) => prev.filter((item) => item.i !== String(id)));
	};

	const generateLayouts = (themeData, columnCounts) => {
		const layouts = {};
		let prevThemeLength = prevThemeLengthRef.current;
		Object.entries(columnCounts).forEach(([breakpoint, cols]) => {
			let currentX = 0,
				currentY = 0,
				rowHeight = 0;
			layouts[breakpoint] = themeData.map(({ i, x, y, w, h }, index) => {
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
				let newPosition = { i, x: currentX, y: currentY, w: newWidth, h };
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
					};
				}
				return newPosition;
			});
		});
		if (layouts) {
			["lg", "md"].forEach((breakpoint) => {
				if (layouts[breakpoint]) {
					const y0Items = layouts[breakpoint].filter((item) => item.y === 0);

					// Dynamically determine the next `y` value based on the max height in y0Items
					const maxHeight = Math.max(...y0Items.map((item) => item.h), 0);
					const yNextItems = layouts[breakpoint].filter(
						(item) => item.y === maxHeight
					);

					y0Items.forEach((y0Item) => {
						yNextItems.forEach((yNextItem, index) => {
							if (y0Item.x === yNextItem.x) {
								if (y0Item.h > yNextItem.h) {
									console.log(
										`Match found in ${breakpoint}: Item ${y0Item.i} (y=0) and Item ${yNextItem.i} (y=${maxHeight}) have the same x: ${y0Item.x}`
									);

									// Move x position
									yNextItem.x = y0Item.w + yNextItem.x;

									// Find the next item in yNextItems
									if (index + 1 < yNextItems.length) {
										const nextItem = yNextItems[index + 1];
										nextItem.x = 0; // Set x to 0
										console.log(
											`Updated nextItem in ${breakpoint}: i=${nextItem.i}, x=0`
										);
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
	const layouts = generateLayouts(theme, columnCounts);

	const handleDrop = (layout, layoutItem, event) => {
		//const chartType = event.dataTransfer.getData("chartType");

		// Find available position
		const lastItem = layouts.lg[layouts.lg.length - 1];
		console.log("lastItem", lastItem);
		const newX = lastItem
			? lastItem.x + lastItem.w >= 10
				? 0
				: lastItem.x + 3
			: 0;
		console.log("newX", newX);

		const newY = lastItem ? (newX === 0 ? lastItem.y + 1 : lastItem.y) : 0;

		const newId = String(theme.length + 1);
		const newItem = {
			i: newId,
			x: newX,
			y: newY,
			w: 3,
			h: 1,
			component: (
				<Cards
					key={newId}
					i={newId}
					item={data[0]}
					removeWidget={removeWidget}
				/>
			),
		};

		setTheme((prev) => [...prev, newItem]);
		layouts.lg[layouts.lg.length - 1].x = newX;
		layouts.lg[layouts.lg.length - 1].y = newY;
	};
	console.log("layout", layouts);
	console.log("theme", theme);

	return (
		<div>
			<ReactGridLayout
				className="layout bg-body"
				layouts={layouts}
				cols={columnCounts}
				breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
				isResizable={false}
				isDroppable={true}
				allowOverlap={false}
				autoSize={true}
				onDrop={handleDrop}
				draggableCancel=".cancelSelectorName"
			>
				{theme.map(({ i, component }) => (
					<div key={i} className="grid-item">
						{component}
					</div>
				))}
			</ReactGridLayout>
		</div>
	);
}
