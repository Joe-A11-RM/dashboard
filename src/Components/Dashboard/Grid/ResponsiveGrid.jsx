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

export default function ResponsiveGrid() {
	let [responsive, setResponsive] = useState({
		lg: [],
		md: [],
		"4k": [],
		"2k": [],
		s: [],
	});
	let [deleteSuccess, setDeleteSuccess] = useState({ val: false, id: null });
	let [dropped, setDropped] = useState([]);
	const widgetsRef = useRef({ widgets: [] });
	let {
		dashboardInf,
		editMode,
		setEditMode,
		saveChanges,
		setSaveChanges,
		setCurrentWidgets,
		setChanges,
	} = useContext(dashboardcontext);
	let {
		data: DashboardWidgets,
		isLoading,
		refetch,
	} = useGetAllDashboardsWidgetsQuery(
		{
			id: dashboardInf?.id,
		},
		{ skip: !dashboardInf?.id }
	);
	const [createWidget] = useCreateWidgetMutation();
	const [fetchSingle] = useLazyGetSingleWidgetQuery();
	let [deleDashboardWidget] = useDeleteDashboardWidgetsMutation();
	const removeWidget = useCallback(
		(id, i) => {
			if (
				id === "1" ||
				id === "2" ||
				id === "3" ||
				id === "4" ||
				id === "5" ||
				id === "6" ||
				id === "7" ||
				id === "8" ||
				id === "9"
			)
				return;
			console.log("AAAAAAAAA", i);
			if (Number(DashboardWidgets?.response?.data?.length) === 1) {
				alert("You must have at leat one widget");
				return;
			} else {
				deleDashboardWidget(id).then(() => {
					setDeleteSuccess({ val: true, id: i });
					refetch();
				});
			}
		},
		[deleDashboardWidget, DashboardWidgets]
	);

	/*useEffect(() => {
		if (deleteSuccess) {
			refetch();
		}
	}, [deleteSuccess, refetch]);*/
	useEffect(() => {
		setCurrentWidgets(DashboardWidgets?.response.data);
	}, [DashboardWidgets]);
	/*	useEffect(() => {
		if (!DashboardWidgets?.response?.data || !responsive) return;
		if (deleteSuccess) {
			setChanges(true);

			const widgetIds = DashboardWidgets.response.data.map((i) => i.widgetId);

			const getPosition = (index, size) => ({
				i: responsive[size]?.[index]?.i ?? "",
				x: responsive[size]?.[index]?.x ?? 0,
				y: responsive[size]?.[index]?.y ?? 0,
				w: responsive[size]?.[index]?.w ?? 1,
				h: responsive[size]?.[index]?.h ?? 1,
			});

			widgetsRef.current = {
				widgets: widgetIds.map((id, index) => ({
					widgetId: id,
					position: [
						{
							"4k": getPosition(index, "4k"),
							"2k": getPosition(index, "2k"),
							lg: getPosition(index, "lg"),
							md: getPosition(index, "md"),
							s: getPosition(index, "s"),
						},
					],
				})),
			};
		}
	}, [DashboardWidgets, deleteSuccess, responsive]);*/
	useEffect(() => {
		if (!DashboardWidgets?.response?.data?.length) return;

		const groupedPositions = {
			lg: [],
			md: [],
			"4k": [],
			"2k": [],
			s: [],
		};

		const createCard = (index, item) => (
			<Cards
				valuekey={index}
				i={index}
				item={item}
				removeWidget={removeWidget}
			/>
		);

		DashboardWidgets.response.data.forEach((item) => {
			item.position.forEach((pos, index) => {
				["lg", "md", "s", "4k", "2k"].forEach((size) => {
					groupedPositions[size].push({
						...(pos[size] ?? {}), // Default to empty object if undefined
						component: createCard(index, item),
					});
				});
			});
		});

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

	useEffect(() => {
		const widgetIds =
			DashboardWidgets?.response?.data?.map((i) => i.widgetId) || [];
		widgetsRef.current = {
			widgets: widgetIds.map((id, index) => ({
				widgetId: id,
				position: [
					["4k", "2k", "lg", "md", "s"].reduce((acc, bp) => {
						acc[bp] = {
							i: responsive[bp]?.[index]?.i ?? "",
							x: responsive[bp]?.[index]?.x ?? 0,
							y: responsive[bp]?.[index]?.y ?? 0,
							w: responsive[bp]?.[index]?.w ?? 0,
							h: responsive[bp]?.[index]?.h ?? 0,
						};
						return acc;
					}, {}),
				],
			})),
		};
	}, [DashboardWidgets]);
	const handleDrag = async (e) => {
		// Extract updated widget positions
		const updatedWidgets = e.map(({ i, x, y, w, h }) => ({ i, x, y, w, h }));

		// Define a mapping of width values to responsive breakpoints
		const widthToBreakpoint = {
			4: ["lg"],
			3: ["4k", "2k"],
			6: ["md"],
			12: ["s"],
		};

		// Clone responsive state to avoid mutating directly
		const newResponsive = { ...responsive };

		updatedWidgets.forEach((pos) => {
			const breakpoints = widthToBreakpoint[pos.w] || [];
			breakpoints.forEach((bp) => {
				newResponsive[bp] = newResponsive[bp]?.map((item) =>
					item.i === pos.i ? { ...item, x: pos.x, y: pos.y } : item
				);
			});
		});

		// Update state with new responsive positions
		setResponsive(newResponsive);
		setChanges(true);

		// Update widget reference
		const widgetIds =
			DashboardWidgets?.response?.data?.map((i) => i.widgetId) || [];
		widgetsRef.current = {
			widgets: widgetIds.map((id, index) => ({
				widgetId: id,
				position: [
					["4k", "2k", "lg", "md", "s"].reduce((acc, bp) => {
						acc[bp] = {
							i: newResponsive[bp]?.[index]?.i ?? "",
							x: newResponsive[bp]?.[index]?.x ?? 0,
							y: newResponsive[bp]?.[index]?.y ?? 0,
							w: newResponsive[bp]?.[index]?.w ?? 0,
							h: newResponsive[bp]?.[index]?.h ?? 0,
						};
						return acc;
					}, {}),
				],
			})),
		};
	};
	const handleDropDragOver = () => {
		setChanges(true);

		const widgetIds =
			DashboardWidgets?.response?.data?.map((i) => i.widgetId) || [];
		widgetsRef.current = {
			widgets: widgetIds.map((id, index) => ({
				widgetId: id,
				position: [
					["4k", "2k", "lg", "md", "s"].reduce((acc, bp) => {
						acc[bp] = {
							i: responsive[bp]?.[index]?.i ?? "",
							x: responsive[bp]?.[index]?.x ?? 0,
							y: responsive[bp]?.[index]?.y ?? 0,
							w: responsive[bp]?.[index]?.w ?? 0,
							h: responsive[bp]?.[index]?.h ?? 0,
						};
						return acc;
					}, {}),
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
		const { data: singleWidgetData } = await fetchSingle({
			id: widgetId,
		}).catch((e) => console.log(e));
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
		setDropped((prev) => [...prev, newAdd]);
		setResponsive(newResponsive);
	};
	useEffect(() => {
		if (dropped) {
			widgetsRef.current = {
				widgets: [...widgetsRef.current.widgets, ...dropped], // Add new widget
			};
			console.log(widgetsRef.current.widgets);
		}
	}, [dropped]);
	const handleSave = async () => {
		try {
			if (widgetsRef.current.widgets.length === 0) {
				alert("You must have at least one widget");
				return;
			} else {
				await createWidget({
					id: 17,
					val: widgetsRef.current.widgets,
				}).unwrap();
				refetch();
				setEditMode(false);
			}
		} catch (err) {
			console.error("Error saving widget:", err);
		}
	};
	console.log("ll", responsive);
	useEffect(() => {
		if (saveChanges) {
			handleSave();
			setSaveChanges(false);
		}
	}, [saveChanges]);

	return (
		<div className="">
			<ReactGridLayout
				key={JSON.stringify(responsive.lg.i)}
				className="layout "
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
