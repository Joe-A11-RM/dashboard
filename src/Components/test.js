import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import OffCanvasTemplate from "./Components/OffCanvas";

function App() {
  const [mainData, setMainData] = useState(["0", "1", "2", "3"]);

  const data = ["4", "5", "6", "7"];
  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("text/plain", item);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const item = e.dataTransfer.getData("text/plain");
    if (item && !mainData.includes(item)) {
      setMainData((prev) => [...prev, item]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy"; // Ensure it's set to copy/move
  };

  return (
    <div className="App">
      <OffCanvasTemplate ButtonText={"Open"} title={"Draggable Items"} backdrop={false}>
        <div className="container">
          <div className="col">
            {data.map((item) => (
              <div
                key={item}
                className="item-card"
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                style={{
                  padding: "10px",
                  margin: "5px 0",
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  cursor: "grab",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </OffCanvasTemplate>
      <div
        className="container drop-zone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          border: "2px dashed #007bff",
          padding: "20px",
          marginTop: "20px",
          minHeight: "150px",
          backgroundColor: "#f8f9fa",
          textAlign: "center",
        }}
      >
        <h5>Drop items here</h5>
        <div className="row">
          {mainData.map((item) => (
            <div key={item} className="col-lg-3">
              <div
                className="item-card"
                style={{
                  padding: "10px",
                  margin: "5px 0",
                  backgroundColor: "#e9ecef",
                  border: "1px solid #ced4da",
                  borderRadius: "4px",
                }}
              >
                {item}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
