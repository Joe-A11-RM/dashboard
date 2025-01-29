import React, { useState } from "react";
import OffCanvasTemplate from "../OffCanvas";
import DashboardSelection from "./DashboardSelection/DashboardSelection";

export default function DashBoardMenu({ mainData }) {
  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(item));
  };
  const [choice, setChoice] = useState("ready");

  const data = mainData.filter((item) =>
    choice === "ready" ? item.type === "template" : item.type === "custom"
  );
  return (
    <div className="d-flex justify-content-center align-items-center">
      <OffCanvasTemplate
        ButtonText={"Generate New Dashboard"}
        title={"Select widgets"}
        backdrop={false}
      >
        <DashboardSelection choice={choice} setChoice={setChoice} />

        <div className="container">
          <div className="row ">
            {data.map((item) => (
              <div key={item.id} className="col-lg-4">
                <div
                  className="item-card"
                  draggable
                  onDragStart={(e) => handleDragStart(e, item.chartType)}
                  style={{
                    padding: "10px",
                    margin: "5px 0",
                    backgroundColor: "#f8f9fa",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    cursor: "grab",
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.chartType}
                    className="img-fluid"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </OffCanvasTemplate>
    </div>
  );
}
