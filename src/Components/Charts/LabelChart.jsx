import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import the skeleton styles
import AreaChart from "./AreaChart";
import { BiSolidTrashAlt } from "react-icons/bi";

export default function LabelChart({
  data,
  labels,
  style,
  title,
  number,
  color,
  onDelete
}) {
  return (
    <>
      {data && labels ? (
        <div className={`dashboard-label ${style}`}>
          <div className="bin" onClick={onDelete}>
            <BiSolidTrashAlt />
          </div>
          <div className="dashboard-label-body">
            <h5 className="fs-16 fw-600">{title}</h5>
          </div>

          {/* Left Column: Number + Percentage */}
          <div className="dashboard-label-stats">
            <p>{number}</p>
          </div>

          {/* Right Column: Chart */}
          <div className="dashboard-label-chart">
            <AreaChart data={data} color={color} labels={labels} />
          </div>
        </div>
      ) : (
        <div className={`dashboard-total skeleton ${style}`}>
          <div className="flex-between">
            <div>
              <p className="fs-16 fw-600">
                <Skeleton width={150} height={20} />
              </p>
              <div className="mb-3 flex-center">
                <Skeleton circle width={30} height={30} className="me-3" />
                <Skeleton width={100} height={20} />
              </div>
              <div className="flex-center">
                <Skeleton width={50} height={30} />
                <div className="dashboard-total-chart">
                  <Skeleton width={150} height={60} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
