import React, { useEffect, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import Cards from "../Cards/Cards";
import axios from "axios";
import Map from "../Map/Map";

const ReactGridLayout = WidthProvider(Responsive);

export default function Grid() {
	const [isDraggable, setIsDraggable] = useState(true);
	const [id, setId] = useState(1);
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
				title: "Revenue Growth",
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

	const [layout, setLayout] = useState([]);
	const [apiStatus, setApiStatus] = useState();
	const [dashboardTotal, setDashboardTotal] = useState();
	useEffect(() => {
		async function getDashboard() {
			try {
				const { data } = await axios.get(
					`https://metal-banks-wonder.loca.lt/api/v1/dashboard`
				);
				setDashboardTotal(data.dashboardResponse);
			} catch (err) {
				console.log(err);
			}
		}

		getDashboard();
	}, []);
	useEffect(() => {
		async function getDashboard() {
			try {
				const { data } = await axios.get(
					`https://metal-banks-wonder.loca.lt/api/v1/dashboard/${id}`
				);
				console.log(data);
				setApiStatus(data);
			} catch (err) {
				console.log(err);
			}
		}

		getDashboard();
	}, [id]);

	useEffect(() => {
		if (apiStatus?.data.dashboardResponse?.length > 0) {
			console.log("apiStatus", apiStatus);

			let newLayout = apiStatus?.data?.dashboardResponse.map((i) => ({
				i: i?.position?.i,
				x: i?.position.x,
				y: i?.position.y,
				w: i?.position.w,
				h: i?.position.h,
				component: (
					<Cards
						i={i.position.i}
						item={i}
						setData={setData}
						data={data}
						layout={layout}
						setlayout={setLayout}
						removeWidget={removeWidget}
						setIsDraggable={setIsDraggable}
						isDraggable={isDraggable}
					/>
				),
			}));
			console.log("newLayout", newLayout);
			setLayout(newLayout);
		}
	}, [apiStatus]);

	const removeWidget = (id) => {
		setLayout((prevLayout) => prevLayout.filter((item) => item.i !== id));
	};
	const handleDrop = (layout, layoutItem, event) => {
		const chartType = event.dataTransfer.getData("chartType");
		console.log(chartType);
		const id = layout.length + 1;
		setLayout((prev) => [
			...prev,
			{
				i: String(id),
				x: 0,
				y: 0,
				w: 12,
				h: 2,
				component: (
					<Cards
						i={String(id)}
						item={data[0]}
						setData={setData}
						data={data}
						layout={layout}
						setlayout={setLayout}
						removeWidget={removeWidget}
						setIsDraggable={setIsDraggable}
						isDraggable={isDraggable}
					/>
				),
			},
		]);
	};
	const handleClick = (id) => {
		setId(id);
	};
	console.log("data", apiStatus?.data?.dashboardResponse);
	console.log("layout", layout);
	return (
		<div>
			{dashboardTotal?.map((i) => (
				<>
					<button
						className="btn btn-primary me-2 my-2"
						onClick={() => handleClick(i.dashboardId)}
					>
						{i.title}
					</button>
				</>
			))}
			<ReactGridLayout
				className="dashboard-drop-area"
				cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
				width={1200}
				isResizable={false}
				isDroppable={true}
				onDrop={handleDrop}
				allowOverlap={false}
				autoSize={true}
				draggableCancel=".cancelSelectorName"
				onLayoutChange={(newLayout) => console.log("New Layout: ", newLayout)}
			>
				{layout.map((item) => (
					<div key={item.i} data-grid={item}>
						{item.component}
					</div>
				))}
			</ReactGridLayout>
		</div>
	);
}
