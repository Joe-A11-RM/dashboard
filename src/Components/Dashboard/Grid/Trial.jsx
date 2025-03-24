import React, {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import Cards from "../Cards/Cards";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import {
	useCreateWidgetMutation,
	useDeleteDashboardWidgetsMutation,
	useGetAllDashboardsWidgetsQuery,
	useLazyGetSingleWidgetQuery,
} from "../../../Redux/service/Dashboard";
import { dashboardcontext } from "../../../context/DashboardContext";
import DashboardAddWidget from "../DashboardHeader/DashboardOptions/DashboardAddWidget/DashboardAddWidget";
const ReactGridLayout = WidthProvider(Responsive);

export default function Trial() {
	let [responsive, setResponsive] = useState({
		lg: [],
		md: [],
		"4k": [],
		"2k": [],
		s: [],
	});
	const widgetsRef = useRef({ widgets: [] });
	let { dashboardInf, editMode, setEditMode, saveChanges, setSaveChanges } =
		useContext(dashboardcontext);
	let {
		data: DashboardWidgets,
		isLoading,
		refetch,
	} = useGetAllDashboardsWidgetsQuery({
		id: 17,
	});
	const [createWidget] = useCreateWidgetMutation();
	const [fetchSingle] = useLazyGetSingleWidgetQuery();
	let [deleDashboardWidget, { status }] = useDeleteDashboardWidgetsMutation();
	const removeWidget = useCallback(
		(id) => {
			if (id === "1" || id === "2" || id === "3" || id === "4") return;
			deleDashboardWidget(id);
		},
		[deleDashboardWidget]
	);
	useEffect(() => {
		if (status === "fulfilled") {
			console.log("Useffect_1 fullfilled");
			refetch();
		}
		console.log("Useffect_1");
	}, [status, refetch]);
	useEffect(() => {
		let groupedPositions = {
			lg: [],
			md: [],
			"4k": [],
			"2k": [],
			s: [],
		};
		if (DashboardWidgets?.response?.data?.length > 0) {
			DashboardWidgets?.response?.data.forEach((item) => {
				item.position.forEach((pos, index) => {
					groupedPositions.lg.push({
						...pos.lg,
						component: (
							<Cards
								valuekey={index}
								i={index}
								item={item}
								removeWidget={removeWidget}
							/>
						),
					});
					groupedPositions.md.push({
						...pos.md,
						component: (
							<Cards
								valuekey={index}
								i={index}
								item={item}
								removeWidget={removeWidget}
							/>
						),
					});
					groupedPositions.s.push({
						...pos.s,
						component: (
							<Cards
								valuekey={index}
								i={index}
								item={item}
								removeWidget={removeWidget}
							/>
						),
					});
					groupedPositions["4k"].push({
						...pos["4k"],
						component: (
							<Cards
								valuekey={index}
								i={index}
								item={item}
								removeWidget={removeWidget}
							/>
						),
					});
					groupedPositions["2k"].push({
						...pos["2k"],
						component: (
							<Cards
								valuekey={index}
								i={index}
								item={item}
								removeWidget={removeWidget}
							/>
						),
					});
				});
			});
		}
		console.log("Useffect_2");
		setResponsive(groupedPositions);
	}, [DashboardWidgets, removeWidget]);
	const ResponsiveLayout = () => {
		let data = [];
		if (window.innerWidth > 1200) {
			data = responsive?.lg || [];
		} else if (window.innerWidth > 996 && window.innerWidth <= 1200) {
			data = responsive?.md || [];
		} else if (window.innerWidth > 768) {
			data = responsive?.s || [];
		}
		if (data.length === 0) {
			return (
				<div
					key="no-data"
					className="empty-dashboard"
					data-grid={{ i: "no-data", x: 0, y: 0, w: 12, h: 1, static: true }}
				>
					<DashboardAddWidget />
				</div>
			);
		}
		return data.map(({ i, component }) => (
			<div key={i} className="grid-item">
				{component}
			</div>
		));
	};
	const columnCounts = {
		"4k": 12,
		"2k": 12,
		lg: 12,
		md: 12,
		s: 12,
		xs: 4,
		xxs: 2,
	};
	const widths = {
		"4k": 3,
		"2k": 3,
		lg: 4,
		md: 6,
		s: 12,
	};

	const handleDrag = async (e) => {
		const updatedWidgets = e.map((item) => ({
			i: item.i,
			x: item.x,
			y: item.y,
			w: item.w,
			h: item.h,
		}));
		updatedWidgets.forEach((pos) => {
			if (pos.w === 4) {
				responsive.lg.map((i) => {
					if (i.i === pos.i) {
						i.x = pos.x;
						i.y = pos.y;
					}
				});
			} else if (pos.w === 3) {
				responsive[("4k", "2k")].map((i) => {
					if (i.i === pos.i) {
						i.x = pos.x;
						i.y = pos.y;
					}
				});
			} else if (pos.w === 6) {
				responsive.md.map((i) => {
					if (i.i === pos.i) {
						i.x = pos.x;
						i.y = pos.y;
					}
				});
			} else if (pos.w === 12) {
				responsive.s.map((i) => {
					if (i.i === pos.i) {
						i.x = pos.x;
						i.y = pos.y;
					}
				});
			}
		});
		let widgetIds = DashboardWidgets?.response?.data?.map((i) => i.widgetId);
		widgetsRef.current = {
			widgets: widgetIds.map((id, index) => ({
				widgetId: id,
				position: [
					{
						"4k": {
							i: responsive["4k"][index].i,
							x: responsive["4k"][index].x,
							y: responsive["4k"][index].y,
							w: responsive["4k"][index].w,
							h: responsive["4k"][index].h,
						},
						"2k": {
							i: responsive["2k"][index].i,
							x: responsive["2k"][index].x,
							y: responsive["2k"][index].y,
							w: responsive["2k"][index].w,
							h: responsive["2k"][index].h,
						},
						lg: {
							i: responsive.lg[index].i,
							x: responsive.lg[index].x,
							y: responsive.lg[index].y,
							w: responsive.lg[index].w,
							h: responsive.lg[index].h,
						},
						md: {
							i: responsive.md[index].i,
							x: responsive.md[index].x,
							y: responsive.md[index].y,
							w: responsive.md[index].w,
							h: responsive.md[index].h,
						},
						s: {
							i: responsive.s[index].i,
							x: responsive.s[index].x,
							y: responsive.s[index].y,
							w: responsive.s[index].w,
							h: responsive.s[index].h,
						},
					},
				],
			})),
		};
	};
	const handleDropDragOver = () => {
		let widgetIds = DashboardWidgets?.response?.data?.map((i) => i.widgetId);
		widgetsRef.current = {
			widgets: widgetIds.map((id, index) => ({
				widgetId: id,
				position: [
					{
						"4k": {
							i: responsive["4k"][index].i,
							x: responsive["4k"][index].x,
							y: responsive["4k"][index].y,
							w: responsive["4k"][index].w,
							h: responsive["4k"][index].h,
						},
						"2k": {
							i: responsive["2k"][index].i,
							x: responsive["2k"][index].x,
							y: responsive["2k"][index].y,
							w: responsive["2k"][index].w,
							h: responsive["2k"][index].h,
						},
						lg: {
							i: responsive.lg[index].i,
							x: responsive.lg[index].x,
							y: responsive.lg[index].y,
							w: responsive.lg[index].w,
							h: responsive.lg[index].h,
						},
						md: {
							i: responsive.md[index].i,
							x: responsive.md[index].x,
							y: responsive.md[index].y,
							w: responsive.md[index].w,
							h: responsive.md[index].h,
						},
						s: {
							i: responsive.s[index].i,
							x: responsive.s[index].x,
							y: responsive.s[index].y,
							w: responsive.s[index].w,
							h: responsive.s[index].h,
						},
					},
				],
			})),
		};
	};
	/*	const handleDrop = async (layout, layoutItem, e) => {
		e.preventDefault();
		if (!e.dataTransfer) {
			console.error("Invalid drop event: No dataTransfer available.");
			return;
		}
		const draggedData = e.dataTransfer.getData("widget");
		const { widgetId, w, h } = JSON.parse(draggedData);
		const { data: singleWidgetData } = await fetchSingle({ id: widgetId });
		const widgetData = singleWidgetData.response.data[0];

		console.log("singleWidgetData", singleWidgetData);
		let newX = 0;
		let newY = 0;
		let newW = 0;
		let lastIndex = [responsive[("2k", "4k")].length - 1];
		console.log("LastIndex", lastIndex);

		if (window.innerWidth > 2048) {
			if (responsive[("2k", "4k")][lastIndex].x < 9) {
				console.log("4k2k");
				newX = responsive[("2k", "4k")][lastIndex].x + 3;
				newY = responsive[("2k", "4k")][lastIndex].y;
			} else {
				newX = 0;
				newY = responsive[("2k", "4k")][lastIndex].y + 1;
			}
			newW = 3;
		} else if (window.innerWidth > 1200) {
			if (responsive.lg[lastIndex].x < 8) {
				console.log("Large");
				newX = responsive.lg[lastIndex].x + 4;
				newY = responsive.lg[lastIndex].y;
			} else {
				newX = 0;
				newY = responsive.lg[lastIndex].y + 1;
			}
			newW = 4;
		} else if (window.innerWidth > 996 && window.innerWidth <= 1200) {
			if (responsive.md[lastIndex].x < 6) {
				console.log("Medium");
				newX = responsive.md[lastIndex].x + 6;
				newY = responsive.md[lastIndex].y;
			} else {
				newX = 0;
				newY = responsive.md[lastIndex].y + 1;
			}
			newW = 6;
		} else if (window.innerWidth > 768) {
			if (responsive.s[lastIndex].x <= 12) {
				console.log("Small");
				newX = 12;
				newY = responsive.s[lastIndex].y + 1;
			} else {
				newX = 0;
				newY = responsive.s[lastIndex].y + 1;
			}
			newW = 12;
		}
		const newItem = {
			i: String(
				Number(responsive[("2k", "4k", "lg", "md", "s")][lastIndex].i) + 1
			),
			x: newX,
			y: newY,
			w: newW,
			h: h,
			component: (
				<Cards
					key={Number(lastIndex) + 1}
					i={Number(lastIndex) + 1}
					item={widgetData}
				/>
			),
		};
		setResponsive((prevState) => ({
			...prevState,
			"4k": [...prevState["4k"], newItem],
			"2k": [...prevState["2k"], newItem],
			lg: [...prevState.lg, newItem],
			md: [...prevState.md, newItem],
			s: [...prevState.s, newItem],
		}));

		console.log("X Value", newX);
		console.log("Y Value", newY);
		console.log("W Value", newW);
		console.log("Responsive", responsive);
		if (!draggedData) {
			console.error("Drop rejected: No valid widget data found.");
			return;
		}
	};*/
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

		const { widgetId, h } = JSON.parse(draggedData);
		const { data: singleWidgetData } = await fetchSingle({ id: widgetId });
		const widgetData = singleWidgetData.response.data[0];

		const newResponsive = { ...responsive };

		// 🔹 Initialize `newAdd` with correct structure
		const newAdd = {
			widgetId: widgetId,
			position: [{}], // Start with an array containing an empty object
		};

		// 🔹 Loop through each screen size
		Object.keys(newResponsive).forEach((screen) => {
			if (!newResponsive[screen]) {
				console.warn(`Screen "${screen}" is undefined in responsive state!`);
				return;
			}

			const lastItemIndex = newResponsive[screen].length - 1;
			let newX = 0,
				newY = 0,
				newW = widths[screen] || 3; // Default width

			if (lastItemIndex >= 0) {
				const lastItem = newResponsive[screen][lastItemIndex];
				if (lastItem.x + newW < (columnCounts[screen] || 12)) {
					newX = lastItem.x + newW;
					newY = lastItem.y;
				} else {
					newX = 0;
					newY = lastItem.y + 1;
				}
			}

			// 🔹 Create new item
			const newItem = {
				i: String(Number(newResponsive[screen][lastItemIndex]?.i || 0) + 1),
				x: newX,
				y: newY,
				w: newW,
				h: h,
				component: (
					<Cards
						key={lastItemIndex + 1}
						i={lastItemIndex + 1}
						item={widgetData}
						removeWidget={removeWidget}
					/>
				),
			};

			// 🔹 Add to responsive state
			newResponsive[screen] = [...newResponsive[screen], newItem];

			// 🔹 Ensure `newAdd.position[0]` has all screens inside the single object
			newAdd.position[0][screen] = {
				i: newItem.i,
				x: newX,
				y: newY,
				w: newW,
				h: h,
			};
		});

		// 🔹 Update `widgetsRef.current`
		widgetsRef.current = {
			widgets: [...widgetsRef.current.widgets, newAdd], // Add new widget
		};

		setResponsive(newResponsive);
	};
	const handleSave = async () => {
		try {
			await createWidget({
				id: 17,
				val: widgetsRef.current.widgets,
			}).unwrap();
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
			console.log("Useffect_3 save");
		}
		console.log("Useffect_3");
	}, [saveChanges]);
	return (
		<div className="">
			<ReactGridLayout
				key={JSON.stringify(responsive.lg.i)}
				className="layout"
				layouts={responsive}
				cols={columnCounts}
				rowHeight={400}
				margin={[20, 20]}
				breakpoints={{
					"4k": 2560,
					"2k": 2048,
					lg: 1200,
					md: 996,
					s: 768,
				}}
				isResizable={false}
				allowOverlap={false}
				isDroppable={editMode ? true : false}
				isDraggable={editMode ? true : false}
				autoSize={true}
				onDragStop={handleDrag}
				onDrop={handleDrop}
				onDropDragOver={handleDropDragOver}
				draggableCancel=".cancelSelectorName"
			>
				{ResponsiveLayout()}
			</ReactGridLayout>
		</div>
	);
}
