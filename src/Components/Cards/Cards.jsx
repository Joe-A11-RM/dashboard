import React, { useContext, useEffect, useState } from "react";
import PieChart from "../Charts/PieChart";
import Map from "../Map/Map";
import BarChart from "../Charts/BarChart";
import { dashboardcontext } from "../../context/DashboardContext";
import Widget from "../Widget/Widget";
import CountsOverview from "../Charts/static/CountsOverview";
import Pagination from "../Helper/Pagination";
import StackedBarChart from "../Charts/StackedBarChart";
import {
	useLazyGetDistanceCoverageDataQuery,
	useLazyGetEngineHoursDataQuery,
	useLazyGetSpeedDetailsQuery,
	useLazyGetVehicleDetailsQuery,
} from "../../Redux/service/Dashboard";
import VehicleTableDetails from "../Table/VehicleTableDetails";

export default function Cards({ key, item, i, removeWidget, isDraggable }) {
	let { editMode } = useContext(dashboardcontext);

	const [currentPage, setCurrentPage] = useState(1);
	const [prevPage, setPrevPage] = useState(currentPage);
	const [limit, setLimit] = useState(5);
	const [chartData, setChartData] = useState(item.chartData);
	const [triggerFetch, { isLoading: distanceLoading, isError: distanceError }] =
		useLazyGetDistanceCoverageDataQuery();
	const [triggerSpeedFetch, { isLoading: speedLoading, isError: speedError }] =
		useLazyGetSpeedDetailsQuery();
	const [
		triggerEngineFetch,
		{ isLoading: engineLoading, isError: engineError },
	] = useLazyGetEngineHoursDataQuery();
	const [triggerVehicleDetails] = useLazyGetVehicleDetailsQuery();

	useEffect(() => {
		if (item.chartData.chartType === "BarChart" && currentPage !== prevPage) {
			const offset = (currentPage - 1) * limit;
			triggerFetch({ offset, limit }).then((response) => {
				if (response?.data?.response?.data) {
					setChartData(response.data.response.data);
				}
				setPrevPage(currentPage);
			});
		}
		if (
			item.chartData.chartType === "SpeedDetailsChart" &&
			currentPage !== prevPage
		) {
			const offset = (currentPage - 1) * limit;
			triggerSpeedFetch({ offset, limit }).then((response) => {
				if (response?.data?.response?.data) {
					setChartData(response.data.response.data);
				}
				setPrevPage(currentPage);
			});
		}
		if (
			item.chartData.chartType === "EngineHoursBarChart" &&
			currentPage !== prevPage
		) {
			const offset = (currentPage - 1) * limit;
			triggerEngineFetch({ offset, limit }).then((response) => {
				if (response?.data?.response?.data) {
					setChartData(response.data.response.data);
				}
				setPrevPage(currentPage);
			});
		}
		if (
			item.chartData.chartType === "vehicletabledetails" &&
			currentPage !== prevPage
		) {
			const offset = (currentPage - 1) * limit;
			triggerVehicleDetails({ offset, limit }).then((response) => {
				if (response?.data?.response?.data) {
					setChartData(response.data.response.data);
				}
				setPrevPage(currentPage);
			});
		}
	}, [currentPage]);

	const handleDelete = (e) => {
		e.stopPropagation();
		e.preventDefault();
		removeWidget(item?.id);
	};
	return (
		<div className="h-100 radius-8" key={key}>
			{item.chartData.chartType === "TrackingMapPositions" ? (
				<Widget
					editMode={editMode}
					handleDelete={handleDelete}
					title={item.chartData.title}
				>
					<Map title={item.chartData.title} />
				</Widget>
			) : item.chartData.chartType === "MapChart" ? (
				<div className={`dashboard-label`}>
					<div className="bin cancelSelectorName" onClick={handleDelete}>
						<img
							src={`${process.env.PUBLIC_URL}/assets/Dark/Delete.svg`}
							alt="delete"
						/>
					</div>
					<Map title={item.chartData.title} />
				</div>
			) : item.chartData.chartType === "PieChart" ? (
				<Widget
					editMode={editMode}
					handleDelete={handleDelete}
					title={item.chartData.title}
				>
					<PieChart
						data={item.chartData.data}
						labels={item.chartData.labels}
						title={item.chartData.title}
						number={item.chartData.number}
						color={["#4FD7A9", "#F6BB63", "#93AAC1", "#F17676"]}
						subTitle="Total Vehicles: 100"
					/>
				</Widget>
			) : item.chartData.chartType === "CountsOverview" ? (
				<Widget
					editMode={editMode}
					handleDelete={handleDelete}
					title={item.chartData.title}
				>
					<CountsOverview
						data={item.chartData.data}
						labels={item.chartData.labels}
						title={item.chartData.title}
						number={item.chartData.number}
						color={["#4FD7A9", "#F6BB63", "#93AAC1", "#F17676"]}
						subTitle="Total Vehicles: 100"
					/>
				</Widget>
			) : item.chartData.chartType === "BarChart" ? (
				<Widget
					editMode={editMode}
					handleDelete={handleDelete}
					title={item.chartData.title}
					subTitle="Distance coverage chart for vehicles in period : 2025-01-20 To 2025-02-20"
				>
					{distanceLoading ? (
						<p>Loading...</p>
					) : distanceError ? (
						<p>Error fetching data</p>
					) : (
						<BarChart
							data={chartData.data}
							labels={chartData.labels}
							title={chartData.title}
							number={chartData.number}
							color={chartData.color}
						/>
					)}
					{item.chartData.pagination && (
						<>
							<Pagination
								page={currentPage}
								totalPages={chartData.pagination.totalPages}
								onPageChange={(page) => setCurrentPage(page)}
								setLimit={(newLimit) => setLimit(newLimit)}
								unit="Vehicles"
							/>
						</>
					)}
				</Widget>
			) : item.chartData.chartType === "EngineHoursBarChart" ? (
				<Widget
					editMode={editMode}
					handleDelete={handleDelete}
					title={item.chartData.title}
					subTitle="Distance coverage chart for vehicles in period : 2025-01-20 To 2025-02-20"
				>
					{engineLoading ? (
						<p>Loading...</p>
					) : engineError ? (
						<p>Error fetching data</p>
					) : (
						<BarChart
							data={chartData.data}
							labels={chartData.labels}
							title={chartData.title}
							number={chartData.number}
							color={chartData.color}
						/>
					)}
					{item.chartData.pagination && (
						<>
							<Pagination
								page={currentPage}
								totalPages={chartData.pagination.totalPages}
								onPageChange={(page) => setCurrentPage(page)}
								setLimit={(newLimit) => setLimit(newLimit)}
								unit="Vehicles"
							/>
						</>
					)}
				</Widget>
			) : item.chartData.chartType === "SpeedDetailsChart" ? (
				<Widget
					editMode={editMode}
					handleDelete={handleDelete}
					title={item.chartData.title}
					subTitle="Distance coverage chart for vehicles in period : 2025-01-20 To 2025-02-20"
				>
					{engineLoading ? (
						<p>Loading...</p>
					) : engineError ? (
						<p>Error fetching data</p>
					) : (
						<StackedBarChart
							data={chartData.data}
							labels={chartData.labels}
							title={chartData.title}
							number={chartData.number}
							color={chartData.color}
						/>
					)}
					{item.chartData.pagination && (
						<>
							<Pagination
								page={currentPage}
								totalPages={chartData.pagination.totalPages}
								onPageChange={(page) => setCurrentPage(page)}
								setLimit={(newLimit) => setLimit(newLimit)}
								unit="Vehicles"
							/>
						</>
					)}
				</Widget>
			) : item.chartData.chartType === "vehicletabledetails" ? (
				<Widget
					editMode={editMode}
					handleDelete={handleDelete}
					title="Vehicles Table"
				>
					<VehicleTableDetails rows={chartData.data} />
					{item.chartData.pagination && (
						<>
							<Pagination
								page={currentPage}
								totalPages={chartData.pagination.totalPages}
								onPageChange={(page) => setCurrentPage(page)}
								setLimit={(newLimit) => setLimit(newLimit)}
								unit="Vehicles"
							/>
						</>
					)}
				</Widget>
			) : (
				<></>
			)}
		</div>
	);
}
