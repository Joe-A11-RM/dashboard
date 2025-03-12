import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTrash } from "react-icons/fa";

const GeoTable = ({ data }) => {
  return (
    <div className="geo-table card">
      <div className="table-responsive geo-table-scroll">
        <div className="card-body" id="table">
          <table className="table table-borderless align-middle">
            <thead className="geo-table-header">
              <tr>
                <th>
                  <input type="checkbox" className="form-check-input" />
                </th>
                <th className="geo-table-head">Object Name</th>
                <th className="text-end geo-table-head">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.response?.data.map((item) => (
                <tr key={item.id}>
                  <td>
                    <input type="checkbox" className="form-check-input" />
                  </td>
                  <td className="geo-table-body">{item.name}</td>
                  <td className="text-end">
                    <button className="btn btn-link geo-table-trash p-0">
                      <FaTrash size={12} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GeoTable;
