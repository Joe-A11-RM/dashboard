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
const staticData = [
	{
		id: 3651,
		dashboard_id: 3,
		widgetId: 1,
		position: [
			{
				"4k": {
					i: "1",
					x: 0,
					y: 0,
					w: 3,
					h: 1,
				},
				"2k": {
					i: "1",
					x: 0,
					y: 0,
					w: 3,
					h: 1,
				},
				lg: {
					i: "1",
					x: 0,
					y: 0,
					w: 4,
					h: 1,
				},
				md: {
					i: "1",
					x: 0,
					y: 0,
					w: 6,
					h: 1,
				},
				s: {
					i: "1",
					x: 0,
					y: 0,
					w: 12,
					h: 1,
				},
			},
		],
		dashboard_title: "Dashboard3",
		CreatedBy: 3,
		chartData: {
			chartType: "CountsOverview",
			data: [
				{
					label: "Users",
					totalCount: 2,
					tableData: [
						{
							id: 3,
							user_name: "demo_us3",
							name: "user3",
							phone: "00201014764570",
							email: "us3@gmail.com",
							parentID: 2,
							time_zone: "3",
							phone1: null,
							phone2: null,
							address: null,
							profilePicture: null,
							fmsAccountDefaultLanguage: "English",
							company: 1,
							acc_token: "ox8tSBkfKKYoRoJBRlNOmYC0zeX16bisNFSArKi39mAA1",
						},
						{
							id: 4,
							user_name: "demo_us4",
							name: "user4",
							phone: "00201066183486",
							email: "us4@gmail.com",
							parentID: 2,
							time_zone: "3",
							phone1: null,
							phone2: null,
							address: null,
							profilePicture: null,
							fmsAccountDefaultLanguage: "English",
							company: 1,
							acc_token: "ox8tSBkfKKYoRoJBRlNOmYC0zeX16bisNFSArKi39mAA1",
						},
					],
				},
				{
					label: "Vehicles",
					totalCount: 4,
					tableData: [
						{
							id: 1,
							name: "Volvo",
							uniqueId: "a-344083300892",
							status: "1",
							lastUpdate: "2025-03-23T18:16:09.000Z",
							speed_limit: "100",
							driver_name: "No name",
							sim_number: "+966555535235",
							expire: "2025-09-09",
						},
						{
							id: 2,
							name: "BMW",
							uniqueId: "a-344083300883",
							status: "1",
							lastUpdate: "2025-03-23T18:37:18.000Z",
							speed_limit: "100",
							driver_name: "No name",
							sim_number: "+966555535235",
							expire: "2025-09-09",
						},
						{
							id: 9,
							name: "Hyundai",
							uniqueId: "a-344083300885",
							status: "0",
							lastUpdate: "2025-03-23T18:37:18.000Z",
							speed_limit: "100",
							driver_name: "No name",
							sim_number: "+966555535235",
							expire: "2025-09-09",
						},
						{
							id: 10,
							name: "Kia",
							uniqueId: "a-344083300886",
							status: "1",
							lastUpdate: "2025-03-23T18:37:18.000Z",
							speed_limit: "100",
							driver_name: "No name",
							sim_number: "+966555535235",
							expire: "2025-09-09",
						},
					],
				},
				{
					label: "Drivers",
					totalCount: 1,
					tableData: [
						{
							id: 3,
							name: "حسين الشحات",
							id_card: "965658",
							phone1: "",
							phone2: "",
							address: "",
							profilePicture: "",
							licenseNumber: "2175232459",
						},
					],
				},
				{
					label: "Online",
					totalCount: 3,
					tableData: [
						{
							id: 1,
							vehicle: "Volvo-archived",
							imei: "a-344083300892",
							status: "1",
							lastUpdate: "2025-02-11 09:25:41",
							acc: "0",
							plateNumber: "s i d 2123",
							simNumber: "+966555535235",
							vehicleType: "Cargo Vans",
							parent: "demo",
							speed: 95,
						},
						{
							id: 2,
							vehicle: "BMW-archived",
							imei: "a-344083300883",
							status: "1",
							lastUpdate: "2025-02-11 07:25:41",
							acc: "1",
							plateNumber: "g k d 2123",
							simNumber: "+966555535235",
							vehicleType: "Cargo Vans",
							parent: "demo",
							speed: 95,
						},
						{
							id: 10,
							vehicle: "Kia-archived",
							imei: "a-344083300886",
							status: "1",
							lastUpdate: "2025-02-10 17:20:41",
							acc: "0",
							plateNumber: "k i d 6183",
							simNumber: "+966555535235",
							vehicleType: "Cargo Vans",
							parent: "demo",
							speed: 99,
						},
					],
				},
				{
					label: "Offline",
					totalCount: 1,
					tableData: [
						{
							id: 9,
							vehicle: "Hyundai-archived",
							imei: "a-344083300885",
							status: "0",
							lastUpdate: "2025-02-10 23:20:41",
							acc: "0",
							plateNumber: "h y d 5183",
							simNumber: "+966555535235",
							vehicleType: "Cargo Vans",
							parent: "demo",
							speed: 70,
						},
					],
				},
				{
					label: "Parking",
					totalCount: 0,
					tableData: [],
				},
				{
					label: "Idle",
					totalCount: 0,
					tableData: [],
				},
				{
					label: "Alerts",
					totalCount: 3,
					tableData: [
						{
							id: 1,
							deviceid: 1,
							speed: "93",
							lat: "20.4547",
							lng: "41.3265",
							alarm: "speed alarm",
							ar_alarm: null,
							address: "Speed alarm",
							devicename: "أ س و 2498",
							time: "2025-02-10T05:26:37.000Z",
							driver: "No name",
							read: 0,
							route: null,
							user: null,
							outRead: 0,
							alertType: 0,
							pushed: 0,
							username: null,
							module: "tracking",
							email: 0,
							fatigue: 0,
						},
						{
							id: 2,
							deviceid: 2,
							speed: "93",
							lat: "20.4547",
							lng: "41.3265",
							alarm: "geofence alarm",
							ar_alarm: null,
							address: "Speed alarm",
							devicename: "أ س و 2498",
							time: "2025-02-10T05:26:37.000Z",
							driver: "No name",
							read: 0,
							route: null,
							user: null,
							outRead: 0,
							alertType: 0,
							pushed: 0,
							username: null,
							module: "tracking",
							email: 0,
							fatigue: 0,
						},
						{
							id: 11,
							deviceid: 2,
							speed: "93",
							lat: "20.4547",
							lng: "41.3265",
							alarm: "LOL alarm",
							ar_alarm: null,
							address: "Speed alarm",
							devicename: "أ س و 2498",
							time: "2025-02-10T05:26:37.000Z",
							driver: "No name",
							read: 0,
							route: null,
							user: null,
							outRead: 0,
							alertType: 0,
							pushed: 0,
							username: null,
							module: "tracking",
							email: 0,
							fatigue: 0,
						},
					],
				},
			],
			title: "Counts Overview",
		},
	},
	{
		id: 3652,
		dashboard_id: 3,
		widgetId: 2,
		position: [
			{
				"4k": {
					i: "2",
					x: 3,
					y: 0,
					w: 3,
					h: 1,
				},
				"2k": {
					i: "2",
					x: 3,
					y: 0,
					w: 3,
					h: 1,
				},
				lg: {
					i: "2",
					x: 4,
					y: 1,
					w: 4,
					h: 1,
				},
				md: {
					i: "2",
					x: 6,
					y: 0,
					w: 6,
					h: 1,
				},
				s: {
					i: "2",
					x: 0,
					y: 1,
					w: 12,
					h: 1,
				},
			},
		],
		dashboard_title: "Dashboard3",
		CreatedBy: 3,
		chartData: {
			chartType: "PieChart",
			labels: ["Speed", "Geofences", "Idle", "Power", "Expires", "Other"],
			data: [1, 1, 0, 0, 0, 1],
			color: ["#4FD7A9", "#F6BB63", "#93AAC1", "#F17676", "#93Ae", "#52359c"],
			title: "Alerts Overview",
		},
	},
	{
		id: 3653,
		dashboard_id: 3,
		widgetId: 3,
		position: [
			{
				"4k": {
					i: "3",
					x: 6,
					y: 0,
					w: 3,
					h: 1,
				},
				"2k": {
					i: "3",
					x: 6,
					y: 0,
					w: 3,
					h: 1,
				},
				lg: {
					i: "3",
					x: 8,
					y: 1,
					w: 4,
					h: 1,
				},
				md: {
					i: "3",
					x: 0,
					y: 1,
					w: 6,
					h: 1,
				},
				s: {
					i: "3",
					x: 0,
					y: 2,
					w: 12,
					h: 1,
				},
			},
		],
		dashboard_title: "Dashboard3",
		CreatedBy: 3,
		chartData: {
			chartType: "PieChart",
			labels: ["Offline", "Parking", "Moving", "Idle"],
			data: [1, 0, 3, 0],
			color: ["#4FD7A9", "#F6BB63", "#93AAC1", "#F17676"],
			title: "Vehicle Status",
		},
	},
	{
		id: 3654,
		dashboard_id: 3,
		widgetId: 4,
		position: [
			{
				"4k": {
					i: "4",
					x: 9,
					y: 0,
					w: 3,
					h: 1,
				},
				"2k": {
					i: "4",
					x: 9,
					y: 0,
					w: 3,
					h: 1,
				},
				lg: {
					i: "4",
					x: 0,
					y: 1,
					w: 4,
					h: 1,
				},
				md: {
					i: "4",
					x: 6,
					y: 1,
					w: 6,
					h: 1,
				},
				s: {
					i: "4",
					x: 0,
					y: 3,
					w: 12,
					h: 1,
				},
			},
		],
		dashboard_title: "Dashboard3",
		CreatedBy: 3,
		chartData: {
			chartType: "BarChart",
			labels: ["Volvo", "BMW", "Hyundai", "Kia"],
			data: [0, 0, 0, 0],
			color: ["#4FD7A9"],
			title: "Distance Coverage",
			pagination: {
				limit: 5,
				totalData: 4,
				totalPages: 1,
				previousPage: null,
				currentPage: 1,
				nextPage: null,
			},
		},
	},
	{
		id: 3655,
		dashboard_id: 3,
		widgetId: 5,
		position: [
			{
				"4k": {
					i: "5",
					x: 0,
					y: 0,
					w: 3,
					h: 1,
				},
				"2k": {
					i: "5",
					x: 0,
					y: 1,
					w: 3,
					h: 1,
				},
				lg: {
					i: "5",
					x: 4,
					y: 0,
					w: 4,
					h: 1,
				},
				md: {
					i: "5",
					x: 0,
					y: 3,
					w: 6,
					h: 1,
				},
				s: {
					i: "5",
					x: 0,
					y: 4,
					w: 12,
					h: 1,
				},
			},
		],
		dashboard_title: "Dashboard3",
		CreatedBy: 3,
		chartData: {
			chartType: "EngineHoursBarChart",
			labels: ["Volvo", "BMW", "Hyundai", "Kia"],
			data: ["4h :35m", "7h :45m", "1h :30m", "3h :30m"],
			color: ["#4FD7A9"],
			title: "Engine Hours",
			pagination: {
				limit: 5,
				totalData: 4,
				totalPages: 1,
				previousPage: null,
				currentPage: 1,
				nextPage: null,
			},
		},
	},
	{
		id: 3656,
		dashboard_id: 3,
		widgetId: 6,
		position: [
			{
				"4k": {
					i: "6",
					x: 3,
					y: 1,
					w: 3,
					h: 1,
				},
				"2k": {
					i: "6",
					x: 3,
					y: 1,
					w: 3,
					h: 1,
				},
				lg: {
					i: "6",
					x: 8,
					y: 0,
					w: 4,
					h: 1,
				},
				md: {
					i: "6",
					x: 6,
					y: 3,
					w: 6,
					h: 1,
				},
				s: {
					i: "6",
					x: 0,
					y: 5,
					w: 12,
					h: 1,
				},
			},
		],
		dashboard_title: "Dashboard3",
		CreatedBy: 3,
		chartData: {
			chartType: "TrackingMapPositions",
			data: [
				{
					id: 1,
					vehicleName: "Volvo",
					vehicleUniqueId: "a-344083300892",
					latitude: 16.6947,
					longitude: 42.1356,
					speed: 95,
					course: 231,
					status: "Offline",
					lastMessage: "2025-02-11 09:25:41",
					fixtime: "2025-02-10T03:25:41.000Z",
				},
				{
					id: 2,
					vehicleName: "BMW",
					vehicleUniqueId: "a-344083300883",
					latitude: 17.2779,
					longitude: 42.5683,
					speed: 95,
					course: 231,
					status: "Offline",
					lastMessage: "2025-02-11 07:25:41",
					fixtime: "2025-02-11T01:25:41.000Z",
				},
				{
					id: 9,
					vehicleName: "Hyundai",
					vehicleUniqueId: "a-344083300885",
					latitude: 19.2779,
					longitude: 42.5683,
					speed: 70,
					course: 231,
					status: "Offline",
					lastMessage: "2025-02-10 23:20:41",
					fixtime: "2025-02-11T01:25:41.000Z",
				},
				{
					id: 10,
					vehicleName: "Kia",
					vehicleUniqueId: "a-344083300886",
					latitude: 19.2779,
					longitude: 42.5683,
					speed: 99,
					course: 231,
					status: "Offline",
					lastMessage: "2025-02-10 17:20:41",
					fixtime: "2025-02-11T01:25:41.000Z",
				},
			],
			title: "Tracking Map",
		},
	},
	{
		id: 3657,
		dashboard_id: 3,
		widgetId: 7,
		position: [
			{
				"4k": {
					i: "7",
					x: 6,
					y: 1,
					w: 3,
					h: 1,
				},
				"2k": {
					i: "7",
					x: 6,
					y: 1,
					w: 3,
					h: 1,
				},
				lg: {
					i: "7",
					x: 0,
					y: 2,
					w: 4,
					h: 1,
				},
				md: {
					i: "7",
					x: 0,
					y: 4,
					w: 6,
					h: 1,
				},
				s: {
					i: "7",
					x: 0,
					y: 6,
					w: 12,
					h: 1,
				},
			},
		],
		dashboard_title: "Dashboard3",
		CreatedBy: 3,
		chartData: {
			chartType: "vehicletabledetails",
			data: [
				{
					id: 1,
					vehicleName: "Volvo",
					vehicleUniqueId: "a-344083300892",
					latitude: 16.6947,
					longitude: 42.1356,
					speed: 95,
					course: 231,
					status: "Offline",
					lastMessage: "2025-02-11 09:25:41",
					fixtime: "2025-02-10T03:25:41.000Z",
				},
				{
					id: 2,
					vehicleName: "BMW",
					vehicleUniqueId: "a-344083300883",
					latitude: 17.2779,
					longitude: 42.5683,
					speed: 95,
					course: 231,
					status: "Offline",
					lastMessage: "2025-02-11 07:25:41",
					fixtime: "2025-02-11T01:25:41.000Z",
				},
				{
					id: 9,
					vehicleName: "Hyundai",
					vehicleUniqueId: "a-344083300885",
					latitude: 19.2779,
					longitude: 42.5683,
					speed: 70,
					course: 231,
					status: "Offline",
					lastMessage: "2025-02-10 23:20:41",
					fixtime: "2025-02-11T01:25:41.000Z",
				},
				{
					id: 10,
					vehicleName: "Kia",
					vehicleUniqueId: "a-344083300886",
					latitude: 19.2779,
					longitude: 42.5683,
					speed: 99,
					course: 231,
					status: "Offline",
					lastMessage: "2025-02-10 17:20:41",
					fixtime: "2025-02-11T01:25:41.000Z",
				},
			],
			title: "Vehicles Table Details",
			pagination: {
				limit: 5,
				totalData: 4,
				totalPages: 1,
				previousPage: null,
				currentPage: 1,
				nextPage: null,
			},
		},
	},
];

export default function ResponsiveGrid() {
	let [responsive, setResponsive] = useState({
		lg: [],
		md: [],
		"4k": [],
		"2k": [],
		s: [],
	});
	let [deleteSuccess, setDeleteSuccess] = useState({ val: false, id: null });
	let [dropped, setDropped] = useState(staticData);
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
		{ skip: !dashboardInf?.id },
	);
	// const [createWidget] = useCreateWidgetMutation();
	// const [fetchSingle] = useLazyGetSingleWidgetQuery();
	// let [deleDashboardWidget] = useDeleteDashboardWidgetsMutation();
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
			if (Number(staticData?.length) === 1) {
				alert("You must have at leat one widget");
				return;
			} else {
				// deleDashboardWidget(id).then(() => {
				// 	setDeleteSuccess({ val: true, id: i });
				// 	refetch();
				// });
				setDropped((prev) => prev.filter((item) => item.id !== id));
			}
		},
		[staticData], //deleDashboardWidget
	);

	/*useEffect(() => {
		if (deleteSuccess) {
			refetch();
		}
	}, [deleteSuccess, refetch]);*/
	useEffect(() => {
		setCurrentWidgets(staticData);
	}, [staticData]);
	/*	useEffect(() => {
		if (!staticData?.response?.data || !responsive) return;
		if (deleteSuccess) {
			setChanges(true);

			const widgetIds = staticData.response.data?.map((i) => i.widgetId);

			const getPosition = (index, size) => ({
				i: responsive[size]?.[index]?.i ?? "",
				x: responsive[size]?.[index]?.x ?? 0,
				y: responsive[size]?.[index]?.y ?? 0,
				w: responsive[size]?.[index]?.w ?? 1,
				h: responsive[size]?.[index]?.h ?? 1,
			});

			widgetsRef.current = {
				widgets: widgetIds?.map((id, index) => ({
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
	}, [staticData, deleteSuccess, responsive]);*/
	useEffect(() => {
		if (!staticData?.length) return;

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

		staticData?.forEach((item) => {
			item?.position.forEach((pos, index) => {
				["lg", "md", "s", "4k", "2k"].forEach((size) => {
					groupedPositions[size].push({
						...(pos[size] ?? {}), // Default to empty object if undefined
						component: createCard(index, item),
					});
				});
			});
		});

		setResponsive(groupedPositions);
	}, [staticData, removeWidget]);

	const ResponsiveLayout = () => {
		let data = [];
		if (window.innerWidth > 1200) {
			data = responsive?.lg || [];
		} else if (window.innerWidth > 996 && window.innerWidth <= 1200) {
			data = responsive?.md || [];
		} else if (window.innerWidth > 768) {
			data = responsive?.s || [];
		}
		if (data?.length === 0) {
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
		return data?.map(({ i, component }) => (
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
		const widgetIds = staticData?.map((i) => i.widgetId) || [];
		widgetsRef.current = {
			widgets: widgetIds?.map((id, index) => ({
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
	}, [staticData]);
	const handleDrag = async (e) => {
		// Extract updated widget positions
		const updatedWidgets = e?.map(({ i, x, y, w, h }) => ({ i, x, y, w, h }));

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
					item.i === pos.i ? { ...item, x: pos.x, y: pos.y } : item,
				);
			});
		});

		// Update state with new responsive positions
		setResponsive(newResponsive);
		setChanges(true);

		// Update widget reference
		const widgetIds = staticData?.map((i) => i.widgetId) || [];
		widgetsRef.current = {
			widgets: widgetIds?.map((id, index) => ({
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

		const widgetIds = staticData?.map((i) => i.widgetId) || [];
		widgetsRef.current = {
			widgets: widgetIds?.map((id, index) => ({
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
		// const { data: singleWidgetData } = await fetchSingle({
		// 	id: widgetId,
		// }).catch((e) => console.log(e));
		// const widgetData = singleWidgetData?.response?.data[0];

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
						item={staticData[0]}
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
		}
	}, [dropped]);
	const handleSave = async () => {
		try {
			if (widgetsRef.current.widgets.length === 0) {
				alert("You must have at least one widget");
				return;
			} else {
				// await createWidget({
				// 	id: dashboardInf?.id,
				// 	val: widgetsRef.current.widgets,
				// }).unwrap();
				// refetch();
				// setEditMode(false);
			}
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
