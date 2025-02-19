import React, { useEffect, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css"; // Required styles
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

export default function Gridthree() {
	const [base, setBase] = useState([]);
	useEffect(() => {
		if (staticData) {
			staticData.map((i) => setBase((prev) => [...prev, i.position]));
			setBase(staticData.map((i) => i.position));
		}
	}, []);
	const generateResponsiveLayouts = (baseLayout, columnCounts) => {
		const layouts = {};

		Object.entries(columnCounts).forEach(([breakpoint, cols]) => {
			let currentX = 0;
			let currentY = 0;
			let rowHeight = 0;

			layouts[breakpoint] = baseLayout.map(({ i, x, y, w, h }, index) => {
				let newWidth =
					breakpoint === "xxs"
						? cols
						: Math.max(1, Math.floor((w / 12) * cols));

				// Ensure x position is calculated dynamically
				if (index === 0) {
					currentX = 0;
					currentY = 0;
					rowHeight = h;
				} else {
					// Check if item fits in the same row
					if (currentX + newWidth > cols) {
						// Move to the next row
						currentX = 0;
						currentY += rowHeight;
						rowHeight = h;
					}
				}

				const newPosition = { i, x: currentX, y: currentY, w: newWidth, h };

				// Update tracking variables
				currentX += newWidth;
				rowHeight = Math.max(rowHeight, h);

				return newPosition;
			});
		});

		return layouts;
	};

	const columnCounts = {
		lg: 12,
		md: 10,
		sm: 6,
		xs: 4,
		xxs: 2,
	};
	const layouts = generateResponsiveLayouts(base, columnCounts);

	console.log("Base", base);
	console.log("layouts", layouts);
	return (
		<div>
			<ReactGridLayout
				className="layout"
				layouts={layouts}
				cols={columnCounts}
				breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
				isResizable={false}
				isDroppable={true}
				allowOverlap={false}
				autoSize={true}
				draggableCancel=".cancelSelectorName"
			>
				{base.map(({ i }) => (
					<div key={i} className="grid-item">
						{i}
					</div>
				))}
			</ReactGridLayout>
		</div>
	);
}
