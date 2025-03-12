import React from "react";
import { CiWarning } from "react-icons/ci";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import the skeleton styles

export default function AlertWidget({ style, title, number, icon, color }) {
  return (
    <>
      {number && title ? (
        <>
          <div className="dashboard-label-body">
            <div className="alert-widget">
              <CiWarning
                size={40}
                className="alert-widget-icon"
                style={{
                  background: "#ffcc00",
                  padding: "4px",
                  borderRadius: "50%",
                }}
              />{" "}
              <h5 className="m-0">{title}</h5>
            </div>
          </div>
          <div className="dashboard-label-stats">
            <p>{number}</p>
          </div>
        </>
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
