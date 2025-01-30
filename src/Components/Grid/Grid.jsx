import React, { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import Cards from "../Cards/Cards";

const ReactGridLayout = WidthProvider(Responsive);

export default function Grid() {
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
        data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)),
        color: "#3B82F6",
        number: Math.floor(Math.random() * 100),
        title: "Revenue Growth",
      },
    },
    {
      id: 1,
      chartType: "PieChart",
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
        data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)),
        color: "#3B82F6",
        number: Math.floor(Math.random() * 100),
        title: "Revenue Growth",
      },
    },
  ]);
  const [layout, setLayout] = useState([
    {
      i: "1",
      x: 0,
      y: 0,
      w: 3,
      h: 1,
      component: (
        <div>
          <Cards
            i={`new_${Date.now()}`}
            item={data[0]}
            setData={setData}
            data={data}
          />
        </div>
      ),
    },
    {
      i: "2",
      x: 3,
      y: 0,
      w: 4,
      h: 2,
      component: (
        <div>
          <Cards
            i={`new_${Date.now()}`}
            item={data[1]}
            setData={setData}
            data={data}
          />
        </div>
      ),
    },
    {
      i: "3",
      x: 0,
      y: 1,
      w: 3,
      h: 1,
      component: (
        <div>
          <Cards
            i={`new_${Date.now()}`}
            item={data[0]}
            setData={setData}
            data={data}
          />
        </div>
      ),
    },
    {
      i: "4",
      x: 7,
      y: 0,
      w: 3,
      h: 1,
      component: (
        <div>
          <Cards
            i={`new_${Date.now()}`}
            item={data[0]}
            setData={setData}
            data={data}
          />
        </div>
      ),
    },
    {
      i: "5",
      x: 7,
      y: 1,
      w: 3,
      h: 1,
      component: (
        <div>
          <Cards
            i={`new_${Date.now()}`}
            item={data[0]}
            setData={setData}
            data={data}
          />
        </div>
      ),
    },
    {
      i: "6",
      x: 12,
      y: 0,
      w: 2,
      h: 1,
      component: (
        <div>
          <Cards
            i={`new_${Date.now()}`}
            item={data[0]}
            setData={setData}
            data={data}
          />
        </div>
      ),
    },
    {
      i: "7",
      x: 12,
      y: 1,
      w: 2,
      h: 1,
      component: (
        <div>
          <Cards
            i={`new_${Date.now()}`}
            item={data[0]}
            setData={setData}
            data={data}
          />
        </div>
      ),
    },
    {
      i: "8",
      x: 0,
      y: 2,
      w: 6,
      h: 1,
      component: (
        <div>
          <Cards
            i={`new_${Date.now()}`}
            item={data[1]}
            setData={setData}
            data={data}
          />
        </div>
      ),
    },
  ]);
  const removeWidget = (id) => {
    setLayout((prevLayout) => prevLayout.filter((item) => item.i !== id));
  };
  const handleDrop = (layout, layoutItem, event) => {
    const chartType = event.dataTransfer.getData("chartType");
    const chartData = data.find((item) => item.chartType === chartType);

    if (chartData) {
      const newItem = {
        i: `new_${Date.now()}`,
        x: layoutItem.x,
        y: layoutItem.y,
        w: chartData.chartType === "LabelChart" ? 3 : 4,
        h: chartData.chartType === "LabelChart" ? 1 : 2,
        component: (
          <Cards
            i={`new_${Date.now()}`}
            item={chartData}
            setData={setData}
            data={data}
            layout={layout}
            setlayout={setLayout}
            removeWidget={removeWidget}
          />
        ),
      };
      setLayout((prev) => [...prev, newItem]);
    }
  };

  return (
    <div>
      <ReactGridLayout
        className="dashboard-drop-area"
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        width={1200}
        isResizable={false}
        isDroppable={true}
        onDrop={handleDrop}
        allowOverlap={false}
        autoSize={true}
        onLayoutChange={(newLayout) => console.log("New Layout: ", newLayout)}
      >
        {layout.map((item) => (
          <div key={item.i} data-grid={item}>
            {item.component}
          </div>
        ))}
      </ReactGridLayout>
    </div>
  );
}
