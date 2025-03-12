import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css"; // Required styles

const ReactGridLayout = WidthProvider(Responsive);

const generateResponsiveLayouts = (baseLayout, columnCounts) => {
	const layouts = {};
	Object.entries(columnCounts).forEach(([breakpoint, cols]) => {
		layouts[breakpoint] = baseLayout.map(({ i, x, y, w, h }) => ({
			i,
			x: breakpoint === "xxs" ? 0 : Math.floor((x / 12) * cols), // Scale x position based on columns
			y, // Keep y position the same to maintain order
			w: breakpoint === "xxs" ? cols : Math.max(1, Math.floor((w / 12) * cols)), // Scale width but ensure min width
			h,
		}));
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

const baseLayout = [
	{ i: "1", x: 0, y: 0, w: 3, h: 1 },
	{ i: "2", x: 3, y: 0, w: 6, h: 1 },
	{ i: "3", x: 9, y: 0, w: 3, h: 1 },
	{ i: "4", x: 0, y: 1, w: 4, h: 1 },
	{ i: "5", x: 4, y: 1, w: 3, h: 1 },
	{ i: "6", x: 7, y: 1, w: 3, h: 1 },
	{ i: "7", x: 10, y: 1, w: 2, h: 1 },
	{ i: "8", x: 0, y: 2, w: 6, h: 1 },
	{ i: "9", x: 6, y: 2, w: 6, h: 1 },
	{ i: "10", x: 0, y: 3, w: 3, h: 1 },
	{ i: "11", x: 3, y: 3, w: 3, h: 1 },
];

const layouts = generateResponsiveLayouts(baseLayout, columnCounts);


export default function GridTwo() {
	return (
		<div>
			<ReactGridLayout
				className="layout"
				layouts={layouts}
				cols={columnCounts}
				breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
				isResizable={true}
				isDroppable={true}
				allowOverlap={false}
				autoSize={true}
				draggableCancel=".cancelSelectorName"
			>
				{baseLayout.map(({ i }) => (
					<div key={i} className="grid-item">
						{i}
					</div>
				))}
			</ReactGridLayout>
		</div>
	);
}
