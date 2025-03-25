import React, { useEffect, useRef, useState } from "react";
import TableAntd from "../../../Helper/Table/Table";
import { Button, Input, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
const CountPopupBody = ({ tableData, title }) => {
	const [column, setColumn] = useState([]);
	const [data, setData] = useState([]);
	const [searchText, setSearchText] = useState("");
	const [searchedColumn, setSearchedColumn] = useState("");
	const searchInput = useRef(null);
	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};
	const handleReset = (clearFilters) => {
		clearFilters();
		setSearchText("");
	};
	const getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
			close,
		}) => (
			<div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
				<Input
					ref={searchInput}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
					style={{ marginBottom: 8, display: "block" }}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
						icon={<SearchOutlined />}
						size="small"
						style={{
							width: 90,
							backgroundColor: "#2E3387",
							borderColor: "#2E3387",
							color: "white",
						}}
					>
						Search
					</Button>
					<Button
						className="reset-btn"
						onClick={() => clearFilters && handleReset(clearFilters)}
						size="small"
						style={{ width: 90 }}
					>
						Reset
					</Button>
					<Button
						type="link"
						size="small"
						onClick={() => {
							close();
						}}
					>
						close
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered) => (
			<SearchOutlined style={{ color: filtered ? "#2E3387" : undefined }} />
		),
		onFilter: (value, record) =>
			record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
		filterDropdownProps: {
			getPopupContainer: (triggerNode) =>
				triggerNode.closest(".modal-body") || document.body,
		},
		render: (text) =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ""}
				/>
			) : (
				text
			),
	});
	useEffect(() => {
		if (tableData && tableData.length > 0) {
			let selectedColumns = [];

			switch (title) {
				case "Users":
					selectedColumns = [
						{ title: "ID", dataIndex: "id", key: "id" },
						{ title: "Username", dataIndex: "user_name", key: "user_name" },
						{ title: "Name", dataIndex: "name", key: "name" },
						{ title: "Email", dataIndex: "email", key: "email" },
						{ title: "Phone", dataIndex: "phone", key: "phone" },
					];
					break;
				case "Vehicles":
					selectedColumns = [
						{ title: "ID", dataIndex: "id", key: "id" },
						{
							title: "Driver Name",
							dataIndex: "driver_name",
							key: "driver_name",
						},
						{ title: "Car", dataIndex: "name", key: "name" },
						{ title: "Sim Number", dataIndex: "sim_number", key: "sim_number" },
						{
							title: "Speed Limit",
							dataIndex: "speed_limit",
							key: "speed_limit",
						},
						{
							title: "Expire",
							dataIndex: "expire",
							key: "expire",
						},
					];
					break;
				case "Drivers":
					selectedColumns = [
						{ title: "ID", dataIndex: "id", key: "id" },
						{
							title: "Driver Name",
							dataIndex: "name",
							key: "name",
						},
						{ title: "ID Card", dataIndex: "id_card", key: "id_card" },
						{
							title: "License Number",
							dataIndex: "licenseNumber",
							key: "licenseNumber",
						},
					];
					break;
				case "Online":
					selectedColumns = [
						{ title: "ID", dataIndex: "id", key: "id" },
						{
							title: "Vehicle",
							dataIndex: "vehicle",
							key: "vehicle",
						},
						{
							title: "Vehicle Type",
							dataIndex: "vehicleType",
							key: "vehicleType",
						},
						{
							title: "IMEI",
							dataIndex: "imei",
							key: "imei",
						},
						{
							title: "Status",
							dataIndex: "status",
							key: "status",
						},
						{
							title: "Speed",
							dataIndex: "speed",
							key: "speed",
						},
						{
							title: "Sim Number",
							dataIndex: "simNumber",
							key: "simNumber",
						},
						{
							title: "Plate Number",
							dataIndex: "plateNumber",
							key: "plateNumber",
						},
					];
					break;
				case "Offline":
					selectedColumns = [
						{ title: "ID", dataIndex: "id", key: "id" },
						{
							title: "Vehicle",
							dataIndex: "vehicle",
							key: "vehicle",
						},
						{
							title: "Vehicle Type",
							dataIndex: "vehicleType",
							key: "vehicleType",
						},
						{
							title: "IMEI",
							dataIndex: "imei",
							key: "imei",
						},
						{
							title: "Status",
							dataIndex: "status",
							key: "status",
						},
						{
							title: "Speed",
							dataIndex: "speed",
							key: "speed",
						},
						{
							title: "Sim Number",
							dataIndex: "simNumber",
							key: "simNumber",
						},
						{
							title: "Plate Number",
							dataIndex: "plateNumber",
							key: "plateNumber",
						},
					];
					break;
				case "Parking":
					selectedColumns = [
						{ title: "ID", dataIndex: "id", key: "id" },
						{
							title: "Vehicle",
							dataIndex: "vehicle",
							key: "vehicle",
						},
						{
							title: "Vehicle Type",
							dataIndex: "vehicleType",
							key: "vehicleType",
						},
						{
							title: "IMEI",
							dataIndex: "imei",
							key: "imei",
						},
						{
							title: "Status",
							dataIndex: "status",
							key: "status",
						},
						{
							title: "Speed",
							dataIndex: "speed",
							key: "speed",
						},
						{
							title: "Sim Number",
							dataIndex: "simNumber",
							key: "simNumber",
						},
						{
							title: "Plate Number",
							dataIndex: "plateNumber",
							key: "plateNumber",
						},
					];
					break;
				case "Idle":
					selectedColumns = [
						{ title: "ID", dataIndex: "id", key: "id" },
						{
							title: "Vehicle",
							dataIndex: "vehicle",
							key: "vehicle",
						},
						{
							title: "Vehicle Type",
							dataIndex: "vehicleType",
							key: "vehicleType",
						},
						{
							title: "IMEI",
							dataIndex: "imei",
							key: "imei",
						},
						{
							title: "Status",
							dataIndex: "status",
							key: "status",
						},
						{
							title: "Speed",
							dataIndex: "speed",
							key: "speed",
						},
						{
							title: "Sim Number",
							dataIndex: "simNumber",
							key: "simNumber",
						},
						{
							title: "Plate Number",
							dataIndex: "plateNumber",
							key: "plateNumber",
						},
					];
					break;
				case "Alerts":
					selectedColumns = [
						{ title: "ID", dataIndex: "id", key: "id" },
						{
							title: "Alarm",
							dataIndex: "alarm",
							key: "alarm",
						},
						{
							title: "Device Name",
							dataIndex: "devicename",
							key: "devicename",
						},
						{
							title: "Speed",
							dataIndex: "speed",
							key: "speed",
						},
						{
							title: "Driver",
							dataIndex: "driver",
							key: "driver",
						},
						{
							title: "Address",
							dataIndex: "address",
							key: "address",
						},
					];
					break;
				case "Speed":
					selectedColumns = [
						Object.assign({
							title: "Id",
							dataIndex: "vehicleId",
							key: "vehicleId",
						}),
						Object.assign(
							{
								title: "Name",
								dataIndex: "vehicleName",
								key: "vehicleName",
							},
							getColumnSearchProps("vehicleName")
						),
						Object.assign(
							{
								title: "Plate Number",
								dataIndex: "plateNumber",
								key: "plateNumber",
							},
							getColumnSearchProps("plateNumber")
						),
						Object.assign(
							{
								title: "Status",
								dataIndex: "status",
								key: "status",
							},
							getColumnSearchProps("status")
						),
						Object.assign({
							title: "Alarm Type",
							dataIndex: "alarm",
							key: "alarm",
						}),
						Object.assign({
							title: "Date",
							dataIndex: "timestamp",
							key: "timestamp",
						}),
					];
					break;
				case "Geofence":
					selectedColumns = [
						Object.assign({
							title: "Id",
							dataIndex: "vehicleId",
							key: "vehicleId",
						}),
						Object.assign(
							{
								title: "Name",
								dataIndex: "vehicleName",
								key: "vehicleName",
							},
							getColumnSearchProps("vehicleName")
						),
						Object.assign(
							{
								title: "Plate Number",
								dataIndex: "plateNumber",
								key: "plateNumber",
							},
							getColumnSearchProps("plateNumber")
						),
						Object.assign(
							{
								title: "Status",
								dataIndex: "status",
								key: "status",
							},
							getColumnSearchProps("status")
						),
						Object.assign({
							title: "Alarm Type",
							dataIndex: "alarm",
							key: "alarm",
						}),
						Object.assign({
							title: "Date",
							dataIndex: "timestamp",
							key: "timestamp",
						}),
					];
					break;
				case "Others":
					selectedColumns = [
						Object.assign({
							title: "Id",
							dataIndex: "vehicleId",
							key: "vehicleId",
						}),
						Object.assign(
							{
								title: "Name",
								dataIndex: "vehicleName",
								key: "vehicleName",
							},
							getColumnSearchProps("vehicleName")
						),
						Object.assign(
							{
								title: "Plate Number",
								dataIndex: "plateNumber",
								key: "plateNumber",
							},
							getColumnSearchProps("plateNumber")
						),
						Object.assign(
							{
								title: "Status",
								dataIndex: "status",
								key: "status",
							},
							getColumnSearchProps("status")
						),
						Object.assign({
							title: "Alarm Type",
							dataIndex: "alarm",
							key: "alarm",
						}),
						Object.assign({
							title: "Date",
							dataIndex: "timestamp",
							key: "timestamp",
						}),
					];
					break;
				case "Malfunctions":
					selectedColumns = [
						Object.assign({
							title: "Id",
							dataIndex: "vehicleId",
							key: "vehicleId",
						}),
						Object.assign(
							{
								title: "Name",
								dataIndex: "vehicleName",
								key: "vehicleName",
							},
							getColumnSearchProps("vehicleName")
						),
						Object.assign(
							{
								title: "Plate Number",
								dataIndex: "plateNumber",
								key: "plateNumber",
							},
							getColumnSearchProps("plateNumber")
						),
						Object.assign(
							{
								title: "Last Status",
								dataIndex: "lastStatus",
								key: "lastStatus",
							},
							getColumnSearchProps("lastStatus")
						),
						Object.assign({
							title: "No Update",
							dataIndex: "daysWithoutUpdate",
							key: "daysWithoutUpdate",
						}),
						Object.assign({
							title: "Last Update",
							dataIndex: "lastUpdate",
							key: "lastUpdate",
						}),
					];
					break;
				case "Accidents":
					selectedColumns = [
						Object.assign({
							title: "Id",
							dataIndex: "vehicleId",
							key: "vehicleId",
						}),
						Object.assign(
							{
								title: "Name",
								dataIndex: "vehicleName",
								key: "vehicleName",
							},
							getColumnSearchProps("vehicleName")
						),
						Object.assign(
							{
								title: "Plate Number",
								dataIndex: "plateNumber",
								key: "plateNumber",
							},
							getColumnSearchProps("plateNumber")
						),
						Object.assign(
							{
								title: "Status",
								dataIndex: "status",
								key: "status",
							},
							getColumnSearchProps("status")
						),
						Object.assign(
							{
								title: "Location",
								dataIndex: "location",
								key: "location",
							},
							getColumnSearchProps("location")
						),
						Object.assign(
							{
								title: "Description",
								dataIndex: "description",
								key: "description",
							},
							getColumnSearchProps("description")
						),

						Object.assign(
							{
								title: "Police Report",
								dataIndex: "policeReport",
								key: "policeReport",
							},
							getColumnSearchProps("policeReport")
						),
						Object.assign({
							title: "Date",
							dataIndex: "timestamp",
							key: "timestamp",
						}),
					];
					break;
				case "Expenses":
					selectedColumns = [
						Object.assign({
							title: "Id",
							dataIndex: "vehicleId",
							key: "vehicleId",
						}),
						Object.assign(
							{
								title: "Name",
								dataIndex: "vehicleName",
								key: "vehicleName",
							},
							getColumnSearchProps("vehicleName")
						),
						Object.assign(
							{
								title: "Plate Number",
								dataIndex: "plateNumber",
								key: "plateNumber",
							},
							getColumnSearchProps("plateNumber")
						),
						Object.assign(
							{
								title: "Type",
								dataIndex: "type",
								key: "type",
							},
							getColumnSearchProps("type")
						),
						Object.assign({
							title: "Date",
							dataIndex: "timestamp",
							key: "timestamp",
						}),
						Object.assign(
							{
								title: "Cost",
								dataIndex: "cost",
								key: "cost",
							},
							getColumnSearchProps("cost")
						),
						Object.assign(
							{
								title: "Remarks",
								dataIndex: "remarks",
								key: "remarks",
							},
							getColumnSearchProps("remarks")
						),
					];
					break;
				default:
					selectedColumns = Object.keys(tableData[0]).map((key) => ({
						title: key.replace("_", " ").toUpperCase(),
						dataIndex: key,
						key: key,
					}));
			}
			setColumn(selectedColumns);
			setData(tableData);
		}
	}, [tableData, title]);

	return <TableAntd columns={column} data={data} />;
};

export default CountPopupBody;
