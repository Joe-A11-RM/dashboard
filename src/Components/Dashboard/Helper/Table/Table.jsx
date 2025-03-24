import React, { useEffect, useState } from "react";
import { Table } from "antd";

const TableAntd = ({ columns, data }) => {
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const paginatedData = data.slice(
    (tableParams.pagination.current - 1) * tableParams.pagination.pageSize,
    tableParams.pagination.current * tableParams.pagination.pageSize
  );

  const handleTableChange = (pagination) => {
    setTableParams({
      pagination,
    });
  };

  //   const handleTableChange = (pagination, filters, sorter) => {
  //     setTableParams({
  //       pagination,
  //       filters,
  //       sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
  //       sortField: Array.isArray(sorter) ? undefined : sorter.field,
  //     });
  //   };
  return (
    <Table
      columns={columns}
      rowKey={(record) => record.id || record.login?.uuid || Math.random()}
      dataSource={data}
      loading={loading}
      onChange={handleTableChange}
      scroll={{ x: "max-content" }}
      pagination={{
        current: tableParams.pagination.current,
        pageSize: tableParams.pagination.pageSize,
        total: data.length,
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "20"], // Limit page size options
        onChange: (page, pageSize) =>
          setTableParams({ pagination: { current: page, pageSize } }),
      }}
    />
  );
};
export default TableAntd;
