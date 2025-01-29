import {
  closestCorners,
  DndContext,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import "./App.css";
import { useRef, useState } from "react";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import Cards from "./Components/Cards/Cards";
import OffCanvasTemplate from "./Components/OffCanvas";
import Header from "./Components/Header/Header";

function App() {
  let [data, setData] = useState([
    {
      id: 1,
      chartType: "LabelChart",
      style: "col-lg-3",
      ChartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    },
    {
      id: 2,
      chartType: "LabelChart",
      style: "col-lg-3",
      ChartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    },
    {
      id: 3,
      chartType: "LabelChart",
      style: "col-lg-3",
      ChartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    },
    {
      id: 4,
      chartType: "LabelChart",
      style: "col-lg-3",
      ChartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    },
    {
      id: 5,
      chartType: "LineChart",
      style: "col-lg-3",
      ChartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    },
    {
      id: 6,
      chartType: "LineChart",
      style: "col-lg-3",
      ChartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    },
    {
      id: 7,
      chartType: "LineChart",
      style: "col-lg-3",
      ChartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    },
    {
      id: 8,
      chartType: "LineChart",
      style: "col-lg-3",
      ChartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    },
  ]);
  const [mainData, setMainData] = useState([
    {
      id: 1,
      chartType: "LabelChart",
      style: "col-lg-3",
      img: "labelchart.png",
    },
    { id: 2, chartType: "LineChart", style: "col-lg-3", img: "" },
    { id: 3, chartType: "BarChart", style: "col-lg-3", img: "" },
    { id: 4, chartType: "PieChart", style: "col-lg-3", img: "" },
  ]); //Side Menu Chart types

  const [customData, setCustomData] = useState([
		{ id: 13, value: 13, style: "col-lg-3" },
		{ id: 14, value: 14, style: "col-lg-3" },
		{ id: 15, value: 15, style: "col-lg-3" },
	]);

  const getTaskPos = (id) => data.findIndex((task) => task.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeIndex = getTaskPos(active.id);
    const overIndex = getTaskPos(over.id);

    setData((tasks) => {
      const updatedTasks = [...tasks];
      [updatedTasks[activeIndex], updatedTasks[overIndex]] = [
        updatedTasks[overIndex],
        updatedTasks[activeIndex],
      ];
      return updatedTasks;
    });
  };

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(item));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const itemData = e.dataTransfer.getData("text/plain");
    const chartType = JSON.parse(itemData);

    if (!chartType) return;
    const newId = Date.now();
    const randomData = Array.from({ length: 7 }, () =>
      Math.floor(Math.random() * 100)
    );
    const labels =
      data.length > 0
        ? data[0].ChartData.labels
        : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

    const chartStyle =
      mainData.find((item) => item.chartType === chartType)?.style ||
      "col-lg-3";

    const newChart = {
      id: newId,
      chartType,
      style: chartStyle,
      ChartData: {
        labels,
        data: randomData,
      },
    };
    setData((prev) => [...prev, newChart]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };
  const containerRef = useRef(null);
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { delay: 100 },
    })
  );
  return (
    <div className="App container-fluid">
      <Header
        title={"Dynamic Dashboard"}
        subTitle={"Create Your customied dashboard now"}
      >
        <div className="d-flex justify-content-center align-items-center">
          <OffCanvasTemplate
            ButtonText={"Generate New Dashboard"}
            title={"Draggable Items"}
            backdrop={false}
          >
            <div className="container">
              <div className="col">
                {mainData.map((item) => (
                  <div
                    key={item.id}
                    className="dashboard-item"
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
                ))}
              </div>
            </div>
          </OffCanvasTemplate>
        </div>
      </Header>
      <div
        ref={containerRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          border: "2px dashed #007bff",
          padding: "20px",
          marginTop: "20px",
          maxHeight: "fit-content",
          backgroundColor: "#f8f9fa",
          overflow: "hidden",
        }}
      >
        <div className="row">
          <DndContext
            collisionDetection={closestCorners}
            modifiers={[restrictToWindowEdges]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
          >
            <SortableContext
              items={data.map((i) => i.id)}
              strategy={rectSortingStrategy}
            >
              {data.map((i) => {
                return (
                  <div key={i.id} className={i.style}>
                    <Cards id={i.id} item={i} setData={setData} data={data} />
                  </div>
                );
              })}
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  );
}

export default App;
