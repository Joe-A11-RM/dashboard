/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import Cards from "../Cards/Cards";
import axios from "axios";

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
	const staticData = [
		{
			id: 1,
			chartData: {
				labels: [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
				],
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
				labels: [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
				],
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
				labels: [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
				],
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
				labels: [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
				],
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
				labels: [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
				],
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
				labels: [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
				],
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
				labels: [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
				],
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
				labels: [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
				],
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
	const [oldLayout, setOldLayout] = useState([]);
	const [layout, setLayout] = useState([]);
	const [apiStatus, setApiStatus] = useState();
	const [dashboardTotal, setDashboardTotal] = useState();
	useEffect(() => {
		async function getDashboard() {
			try {
				const { data } = await axios.get(
					`https://tame-bananas-brake.loca.lt/api/v1/dashboard`
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
					`https://tame-bananas-brake.loca.lt/api/v1/dashboard/${id}`
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
		if (staticData?.length > 0) {
			let newLayout = staticData.map((i) => ({
				i: i?.position?.i,
				x: i?.position.x,
				y: i?.position.y,
				w: i?.position.w,
				h: i?.position.h,
				component: (
					<Cards
						i={i.position.i}
						item={i}
						layout={layout}
						setlayout={setLayout}
						removeWidget={removeWidget}
						setIsDraggable={setIsDraggable}
						isDraggable={isDraggable}
					/>
				),
			}));
			setLayout(newLayout);
			setOldLayout(newLayout);
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

	const handleLayoutChange = () => {
		if (layout.length > 0) {
			if (window.innerWidth >= 1400) {
				if (oldLayout) setLayout(oldLayout);
			} else {
				const updatedLayout = layout.map((item, index) => {
					if (window.innerWidth < 768) {
						return {
							...item,
							x: 0,
							y: item.y,
							w: 12,
						};
					}
					if (item.x + item.w >= 12) {
						if (window.innerWidth < 993 && window.innerWidth > 768) {
							if (item.x + item.w >= 10) {
								return {
									...item,
									x: 0,
									y: item.y,
								};
							}
						}

						if (item.i < layout[index + 1]) {
							return {
								...item,
								x: layout[index - 1].x - 1,
								y: layout[index - 1].y + 1,
								w: layout[index - 1].w,
							};
						}

						return {
							...item,
							x: 0,
							y: item.y + 2,
							w: layout[index - 1].w,
						};
					}

					return item;
				});
				console.log("updatedLayout", updatedLayout);
				setLayout(updatedLayout);
				console.log("Layout", layout);
			}
		}
	};
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
				layouts={{ lg: staticData }}
				breakpoints={{ lg: 1200, md: 992, sm: 768, xs: 576, xxs: 0 }}
				width={1200}
				isResizable={false}
				isDroppable={true}
				onDrop={handleDrop}
				allowOverlap={false}
				autoSize={true}
				draggableCancel=".cancelSelectorName"
				onLayoutChange={handleLayoutChange}
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
