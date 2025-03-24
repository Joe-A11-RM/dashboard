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
