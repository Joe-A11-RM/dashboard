import React, { useEffect, useState } from "react";
import TableAntd from "../../../Helper/Table/Table";

const CountPopupBody = ({ tableData, title }) => {
  const [column, setColumn] = useState([]);
  const [data, setData] = useState([]);
  console.log("tableData", tableData);
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

        default:
          selectedColumns = Object.keys(tableData[0]).map((key) => ({
            title: key.replace("_", " ").toUpperCase(),
            dataIndex: key,
            key: key,
          }));
      }
      console.log("Count -> columns", selectedColumns);
      setColumn(selectedColumns);
      setData(tableData);
    }
  }, [tableData, title]);

  return <TableAntd columns={column} data={data} />;
};

export default CountPopupBody;
