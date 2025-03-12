/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css"; // Required styles
import Cards from "../Cards/Cards";
import {
	useCreateWidgetMutation,
	useDeleteDashboardWidgetsMutation,
	useEditDashboardWidgetsMutation,
	useGetAllDashboardsWidgetsQuery,
	useLazyGetSingleWidgetQuery,
} from "../../Redux/service/Dashboard";
import { dashboardcontext } from "../../context/DashboardContext";
const ReactGridLayout = WidthProvider(Responsive);

const generateInitialTheme = (data) => {
	return (
		data.length > 0 &&
		data?.map((item) => ({
			...item.position,
			component: (
				<Cards
					key={item.id}
					i={item?.position.i}
					item={item}
					removeWidget={() => {}}
				/>
			),
		}))
	);
};

export default function Gridthree() {
	const [createWidget] = useCreateWidgetMutation();
	const [fetchSingle] = useLazyGetSingleWidgetQuery();
	const [allWidgets, setAllWidgets] = useState();
	let [editDashboardWidget] = useEditDashboardWidgetsMutation();
	let [deleDashboardWidget, { status }] = useDeleteDashboardWidgetsMutation();
	const [theme, setTheme] = useState(null);

	const [updatedWidgets, setUpdatedWidgets] = useState();
	let { dashboardInf, editMode, setEditMode, saveChanges, setSaveChanges } =
		useContext(dashboardcontext);
	let { data: DashboardWidgets, refetch } = useGetAllDashboardsWidgetsQuery(
		{
			id: dashboardInf?.id,
		},
		{ skip: !dashboardInf?.id }
	);
	useEffect(() => {
		if (DashboardWidgets?.response?.data.length > 0) {
			const widgets = DashboardWidgets?.response.data.map((item) => ({
				widgetId: item.widgetId,
				position: item.position,
			}));
			setAllWidgets(widgets);
		}
	}, [DashboardWidgets]);

	useEffect(() => {
		if (
			!DashboardWidgets?.response?.data ||
			!Array.isArray(DashboardWidgets.response.data)
		) {
			console.error("Invalid data structure:", DashboardWidgets);
			return;
		}
		if (DashboardWidgets?.response?.data && dashboardInf?.id) {
			setTheme(generateInitialTheme(DashboardWidgets.response.data));
		}
	}, [dashboardInf?.id, DashboardWidgets]);

	const prevThemeLengthRef = useRef(theme?.length);
	const removeWidget = (id) => {
		setAllWidgets((prev) => prev.filter((item) => item.id !== String(id)));
		deleDashboardWidget(id);
	};

	const generateLayouts = (themeData, columnCounts) => {
		const layouts = {};
		Object.entries(columnCounts).forEach(([breakpoint, cols]) => {
			let currentX = 0,
				currentY = 0,
				rowHeight = 0;
			if (themeData?.length > 0) {
				layouts[breakpoint] = themeData.map(
					({ i, x, y, w, h, component }, index) => {
						let newWidth;
						switch (breakpoint) {
							case "4k":
							case "2k":
								newWidth = 3;
								break;
							case "lg":
								newWidth = 4;
								break;
							case "md":
								newWidth = 5;
								break;
							case "sm":
								newWidth = 6;
								break;
							case "xs":
							case "xss":
								newWidth = 4;
								break;
							default:
								newWidth = Math.max(2, Math.floor((w / 12) * cols));
						}
						//console.log("component", component.props.item.chartData.chartType);
						/*if (component.props.item.chartData.chartType === "BarChart") {
							newWidth = w - 4;
						}*/
						if (index === 0) {
							currentX = 0;
							currentY = 0;
							rowHeight = h;
						} else {
							if (currentX + newWidth > cols) {
								// Move to next row
								currentX = 0;
								currentY += rowHeight;
								rowHeight = h;
							}
						}

						// ✅ Set proper position for each card
						let newPosition = {
							i,
							x: x, //currentX
							y: y, //currentY
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

						currentX += newWidth; // ✅ Move x forward for next card
						rowHeight = Math.max(rowHeight, h);

						return newPosition;
					}
				);
			}
		});
		return layouts;
	};

	const columnCounts = {
		"4k": 12, // 4K screens
		"2k": 12, // 2K screens
		lg: 12, // Laptop
		md: 10, // Medium
		sm: 6, // Small
		xs: 4, // Extra small
		xxs: 2, // Tiny screens
	};
	let [x, setX] = useState([]);
	//const layouts = generateLayouts(theme, columnCounts);
	useEffect(() => {
		if (DashboardWidgets?.response?.data && dashboardInf?.id) {
			if (Object.keys(DashboardWidgets?.response?.data).length === 0) {
				setX([]);
			} else {
				setX(generateLayouts(theme, columnCounts));
			}
		}
	}, [theme]);

	useEffect(() => {
		if (DashboardWidgets?.response?.data && dashboardInf?.id) {
			if (Object.keys(DashboardWidgets?.response?.data).length === 0) {
				setX([]);
			} else {
				setTheme(generateInitialTheme(DashboardWidgets.response.data));
			}
		}
	}, [dashboardInf?.id, DashboardWidgets]);

	const handleDrop = async (layout, layoutItem, e) => {
		e.preventDefault();
		if (!e.dataTransfer) {
			console.error("Invalid drop event: No dataTransfer available.");
			return;
		}
		const draggedData = e.dataTransfer.getData("widget");
		if (!draggedData) {
			console.error("Drop rejected: No valid widget data found.");
			return;
		}
		const { widgetId, w, h } = JSON.parse(draggedData);
		const { data: singleWidgetData } = await fetchSingle({ id: widgetId });
		if (!singleWidgetData || !singleWidgetData.response) {
			console.error("Failed to fetch widget data.");
			return;
		}
		const widgetData = singleWidgetData.response.data[0]; // Extracting actual data
		let newX = 0;
		let newY = 0;

		setX((prevX) => {
			const updatedState = { ...prevX };

			Object.keys(columnCounts).forEach((breakpoint) => {
				const prevItems = prevX[breakpoint] || [];
				const lastItem =
					prevItems.length > 0 ? prevItems[prevItems.length - 1] : null;

				if (lastItem) {
					newX =
						lastItem.x + lastItem.w >= columnCounts[breakpoint]
							? 0
							: lastItem.x + lastItem.w;
					const sameYCount = prevItems.filter(
						(item) => item.y === lastItem.y
					).length;
					newY = sameYCount >= 4 ? lastItem.y + 1 : lastItem.y;
				}

				const newId = String(prevItems.length + 1);
				const newItem = {
					i: newId,
					x: newX,
					y: newY,
					w: w,
					h: h,
					component: (
						<Cards
							key={`${breakpoint}-${newId}`}
							i={newId}
							item={widgetData}
							removeWidget={removeWidget}
						/>
					),
				};
				updatedState[breakpoint] = [...prevItems, newItem];
			});

			return updatedState;
		});
		const newI = allWidgets.length + 1;
		setAllWidgets((prevWidgets = []) => [
			...prevWidgets,
			{
				widgetId,
				position: { i: `${newI}`, x: newX, y: newY, w, h },
			},
		]);
	};

	const handleSave = () => {
		try {
			createWidget({
				id: dashboardInf?.id,
				val: allWidgets,
			});
			refetch();
			setEditMode(false);
		} catch (err) {
			console.error("Error saving widget:", err);
		}
	};

	useEffect(() => {
		if (saveChanges) {
			handleSave();
			setSaveChanges(false);
		}
	}, [saveChanges]);

	const handleDrag = (e) => {
		const updatedWidgets = e.map((item) => ({
			position: {
				i: item.i,
				x: item.x,
				y: item.y,
				w: item.w,
				h: item.h,
			},
		}));

		setUpdatedWidgets(updatedWidgets);

		// Update allWidgets based on updatedWidgets
		setAllWidgets((prevWidgets) =>
			prevWidgets.map((widget) => {
				const updatedWidget = updatedWidgets.find(
					(updated) => updated.position.i === widget.position.i
				);
				return updatedWidget
					? { ...widget, position: updatedWidget.position }
					: widget;
			})
		);
	};
	console.log("AllWidgets", allWidgets);
	console.log("Updated widget", updatedWidgets);
	useEffect(() => {
		if (status === "fulfilled") {
			refetch();
		}
	}, [status, refetch]);
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
		console.log("Data", x);
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
			<ReactGridLayout
				key={JSON.stringify(x.i)}
				className="layout"
				layouts={x}
				cols={columnCounts}
				rowHeight={400}
				margin={[20, 20]}
				breakpoints={{
					"4k": 2560,
					"2k": 2048,
					lg: 1200,
					md: 996,
					sm: 768,
					xs: 480,
					xxs: 0,
				}}
				isResizable={false}
				isDroppable={editMode ? true : false}
				isDraggable={editMode ? true : false}
				allowOverlap={false}
				autoSize={true}
				onDragStop={handleDrag}
				onDrop={handleDrop}
				draggableCancel=".cancelSelectorName"
			>
				{j()}
			</ReactGridLayout>
		</div>
	);
}
