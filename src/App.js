import { closestCorners, DndContext } from "@dnd-kit/core";
import "./App.css";
import { useState } from "react";
import {
  horizontalListSortingStrategy,
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import Cards from "./Components/Cards/Cards";

function App() {
  let [data, setData] = useState([
    { id: 1, value: 1 },
    { id: 2, value: 2 },
    { id: 3, value: 3 },
    { id: 4, value: 4 },
    { id: 5, value: 5 },
    { id: 6, value: 6 },
    { id: 7, value: 7 },
    { id: 8, value: 8 },
  ]);
  const getTaskPos = (id) => data.findIndex((task) => task.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    // Find the indexes of the active and over items
    const activeIndex = getTaskPos(active.id);
    const overIndex = getTaskPos(over.id);

    // Swap the items in the array
    setData((tasks) => {
      const updatedTasks = [...tasks];
      [updatedTasks[activeIndex], updatedTasks[overIndex]] = [
        updatedTasks[overIndex],
        updatedTasks[activeIndex],
      ];
      return updatedTasks;
    });
  };

  console.log("Data", data);

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
      <OffCanvasTemplate
        ButtonText={"Open"}
        title={"Draggable Items"}
        backdrop={false}
      >
        <div
          className="container"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
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
      <div className="container">
        <div className="row">
          <DndContext
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={data.map((i) => i.id)}
              strategy={rectSortingStrategy}
            >
              {data.map((i) => {
                return (
                  <>
                    <div className="col-lg-3">
                      <Cards id={i.id} item={i.value} />
                    </div>
                  </>
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
