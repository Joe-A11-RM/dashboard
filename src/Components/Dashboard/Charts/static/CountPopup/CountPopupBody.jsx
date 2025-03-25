import React, { useEffect, useRef, useState } from "react";
import TableAntd from "../../../Helper/Table/Table";
import { Button, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

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
            Object.assign(
              { title: "ID", dataIndex: "id", key: "id" },
              getColumnSearchProps("id")
            ),
            Object.assign(
              {
                title: "Username",
                dataIndex: "user_name",
                key: "user_name",
              },
              getColumnSearchProps("user_name")
            ),
            Object.assign(
              { title: "Name", dataIndex: "name", key: "name" },
              getColumnSearchProps("name")
            ),
            Object.assign(
              {
                title: "Email",
                dataIndex: "email",
                key: "email",
              },
              getColumnSearchProps("email")
            ),
            Object.assign(
              {
                title: "Phone",
                dataIndex: "phone",
                key: "phone",
              },
              getColumnSearchProps("phone")
            ),
          ];
          break;
        case "Vehicles":
          selectedColumns = [
            Object.assign(
              { title: "ID", dataIndex: "id", key: "id" },
              getColumnSearchProps("ID")
            ),
            Object.assign(
              {
                title: "Driver Name",
                dataIndex: "driver_name",
                key: "driver_name",
              },
              getColumnSearchProps("driver_name")
            ),
            Object.assign(
              { title: "Car", dataIndex: "name", key: "name" },
              getColumnSearchProps("name")
            ),
            Object.assign(
              {
                title: "Sim Number",
                dataIndex: "sim_number",
                key: "sim_number",
              },
              getColumnSearchProps("sim_number")
            ),
            Object.assign(
              {
                title: "Speed Limit",
                dataIndex: "speed_limit",
                key: "speed_limit",
              },
              getColumnSearchProps("speed_limit")
            ),
            Object.assign(
              {
                title: "Expire",
                dataIndex: "expire",
                key: "expire",
              },
              getColumnSearchProps("expire")
            ),
          ];
          break;
        case "Drivers":
          selectedColumns = [
            Object.assign(
              { title: "ID", dataIndex: "id", key: "id" },
              getColumnSearchProps("id")
            ),
            Object.assign(
              {
                title: "Driver Name",
                dataIndex: "name",
                key: "name",
              },
              getColumnSearchProps("name")
            ),
            Object.assign(
              { title: "ID Card", dataIndex: "id_card", key: "id_card" },
              getColumnSearchProps("id_card")
            ),
            Object.assign(
              {
                title: "License Number",
                dataIndex: "licenseNumber",
                key: "licenseNumber",
              },
              getColumnSearchProps("licenseNumber")
            ),
          ];
          break;
        case "Online":
          selectedColumns = [
            Object.assign(
              { title: "ID", dataIndex: "id", key: "id" },
              getColumnSearchProps("id")
            ),
            Object.assign(
              {
                title: "Vehicle",
                dataIndex: "vehicle",
                key: "vehicle",
              },
              getColumnSearchProps("vehicle")
            ),

            Object.assign(
              {
                title: "Vehicle Type",
                dataIndex: "vehicleType",
                key: "vehicleType",
              },
              getColumnSearchProps("vehicleType")
            ),

            Object.assign(
              {
                title: "IMEI",
                dataIndex: "imei",
                key: "imei",
              },
              getColumnSearchProps("imei")
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
                title: "Speed",
                dataIndex: "speed",
                key: "speed",
              },
              getColumnSearchProps("speed")
            ),
            Object.assign(
              {
                title: "Sim Number",
                dataIndex: "simNumber",
                key: "simNumber",
              },
              getColumnSearchProps("simNumber")
            ),
            Object.assign(
              {
                title: "Plate Number",
                dataIndex: "plateNumber",
                key: "plateNumber",
              },
              getColumnSearchProps("plateNumber")
            ),
          ];
          break;
        case "Offline":
          selectedColumns = [
            Object.assign(
              { title: "ID", dataIndex: "id", key: "id" },
              getColumnSearchProps("id")
            ),
            Object.assign(
              {
                title: "Vehicle",
                dataIndex: "vehicle",
                key: "vehicle",
              },
              getColumnSearchProps("vehicle")
            ),
            Object.assign(
              {
                title: "Vehicle Type",
                dataIndex: "vehicleType",
                key: "vehicleType",
              },
              getColumnSearchProps("vehicleType")
            ),
            Object.assign(
              {
                title: "IMEI",
                dataIndex: "imei",
                key: "imei",
              },
              getColumnSearchProps("imei")
            ),
            Object.assign(
              {
                title: "Status",
                dataIndex: "status",
                key: "status",
              },
              getColumnSearchProps("platestatusNumber")
            ),
            Object.assign(
              {
                title: "Speed",
                dataIndex: "speed",
                key: "speed",
              },
              getColumnSearchProps("speed")
            ),
            Object.assign(
              {
                title: "Sim Number",
                dataIndex: "simNumber",
                key: "simNumber",
              },
              getColumnSearchProps("simNumber")
            ),
            Object.assign(
              {
                title: "Plate Number",
                dataIndex: "plateNumber",
                key: "plateNumber",
              },
              getColumnSearchProps("plateNumber")
            ),
          ];
          break;
        case "Parking":
          selectedColumns = [
            Object.assign(
              { title: "ID", dataIndex: "id", key: "id" },
              getColumnSearchProps("id")
            ),
            Object.assign(
              {
                title: "Vehicle",
                dataIndex: "vehicle",
                key: "vehicle",
              },
              getColumnSearchProps("vehicle")
            ),
            Object.assign(
              {
                title: "Vehicle Type",
                dataIndex: "vehicleType",
                key: "vehicleType",
              },
              getColumnSearchProps("vehicleType")
            ),
            Object.assign(
              {
                title: "IMEI",
                dataIndex: "imei",
                key: "imei",
              },
              getColumnSearchProps("imei")
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
                title: "Speed",
                dataIndex: "speed",
                key: "speed",
              },
              getColumnSearchProps("speed")
            ),
            Object.assign(
              {
                title: "Sim Number",
                dataIndex: "simNumber",
                key: "simNumber",
              },
              getColumnSearchProps("simNumber")
            ),
            Object.assign(
              {
                title: "Plate Number",
                dataIndex: "plateNumber",
                key: "plateNumber",
              },
              getColumnSearchProps("plateNumber")
            ),
          ];
          break;
        case "Idle":
          selectedColumns = [
            Object.assign(
              { title: "ID", dataIndex: "id", key: "id" },
              getColumnSearchProps("id")
            ),
            Object.assign(
              {
                title: "Vehicle",
                dataIndex: "vehicle",
                key: "vehicle",
              },
              getColumnSearchProps("vehicle")
            ),
            Object.assign(
              {
                title: "Vehicle Type",
                dataIndex: "vehicleType",
                key: "vehicleType",
              },
              getColumnSearchProps("vehicleType")
            ),
            Object.assign(
              {
                title: "IMEI",
                dataIndex: "imei",
                key: "imei",
              },
              getColumnSearchProps("imei")
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
                title: "Speed",
                dataIndex: "speed",
                key: "speed",
              },
              getColumnSearchProps("speed")
            ),
            Object.assign(
              {
                title: "Sim Number",
                dataIndex: "simNumber",
                key: "simNumber",
              },
              getColumnSearchProps("simNumber")
            ),
            Object.assign(
              {
                title: "Plate Number",
                dataIndex: "plateNumber",
                key: "plateNumber",
              },
              getColumnSearchProps("plateNumber")
            ),
          ];
          break;
        case "Alerts":
          selectedColumns = [
            Object.assign(
              { title: "ID", dataIndex: "id", key: "id" },
              getColumnSearchProps("id")
            ),
            Object.assign(
              {
                title: "Alarm",
                dataIndex: "alarm",
                key: "alarm",
              },
              getColumnSearchProps("alarm")
            ),
            Object.assign(
              {
                title: "Device Name",
                dataIndex: "devicename",
                key: "devicename",
              },
              getColumnSearchProps("devicename")
            ),
            Object.assign(
              {
                title: "Speed",
                dataIndex: "speed",
                key: "speed",
              },
              getColumnSearchProps("speed")
            ),
            Object.assign(
              {
                title: "Driver",
                dataIndex: "driver",
                key: "driver",
              },
              getColumnSearchProps("driver")
            ),
            Object.assign(
              {
                title: "Address",
                dataIndex: "address",
                key: "address",
              },
              getColumnSearchProps("address")
            ),
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
