/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import Cards from "../Cards/Cards";

const ReactGridLayout = WidthProvider(Responsive);

export default function Grid() {
  const [isDraggable, setIsDraggable] = useState(true);
  const [id, setId] = useState(1);
  let [data, setData] = useState([
    {
      id: 1,

      style: "col-lg-3",
      chartData: {
        chartType: "LabelChart",
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
        title: "Chart #1",
      },
      postion: {
        i: "1",
        x: 0,
        y: 0,
        w: 3,
        h: 1,
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
  const staticData = [
    {
      id: 1,
      chartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        chartType: "LabelChart",
        data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)),
        color: "#3B82F6",
        number: Math.floor(Math.random() * 100),
        title: "Growth Chart",
      },
      position: {
        i: "1",
        x: 0,
        y: 0,
        w: 3,
        h: 1,
        static: true,
      },
    },
    {
      id: 2,
      chartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        chartType: "LabelChart",
        data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)),
        color: "#3B82F6",
        number: Math.floor(Math.random() * 100),
        title: "Growth Chart",
      },
      position: {
        i: "2",
        x: 3,
        y: 0,
        w: 3,
        h: 1,
      },
    },
    {
      id: 3,
      chartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        chartType: "PieChart",
        data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)),
        color: "#3B82F6",
        number: Math.floor(Math.random() * 100),
        title: "Growth Chart",
      },
      position: {
        i: "3",
        x: 6,
        y: 0,
        w: 4,
        h: 2,
      },
    },
    {
      id: 4,
      chartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        chartType: "LabelChart",
        data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)),
        color: "#3B82F6",
        number: Math.floor(Math.random() * 100),
        title: "Growth Chart",
      },
      position: {
        i: "4",
        x: 10,
        y: 0,
        w: 2,
        h: 1,
      },
    },
    {
      id: 5,
      chartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        chartType: "LabelChart",
        data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)),
        color: "#3B82F6",
        number: Math.floor(Math.random() * 100),
        title: "Growth Chart",
      },
      position: {
        i: "5",
        x: 0,
        y: 1,
        w: 3,
        h: 1,
      },
    },
    {
      id: 6,
      chartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        chartType: "LabelChart",
        data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)),
        color: "#3B82F6",
        number: Math.floor(Math.random() * 100),
        title: "Growth Chart",
      },
      position: {
        i: "6",
        x: 3,
        y: 1,
        w: 3,
        h: 1,
      },
    },
    {
      id: 7,
      chartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        chartType: "LabelChart",
        data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)),
        color: "#3B82F6",
        number: Math.floor(Math.random() * 100),
        title: "Growth Chart",
      },
      position: {
        i: "7",
        x: 10,
        y: 1,
        w: 2,
        h: 1,
      },
    },
    {
      id: 8,
      chartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        chartType: "LabelChart",
        data: Array.from({ length: 8 }, () => Math.floor(Math.random() * 100)),
        color: "#3B82F6",
        number: Math.floor(Math.random() * 100),
        title: "Growth Chart",
      },
      position: {
        i: "8",
        x: 10,
        y: 1,
        w: 2,
        h: 1,
      },
    },
  ];
  const [oldLayout, setOldLayout] = useState([]);
  const [layout, setLayout] = useState([]);
  const [apiStatus, setApiStatus] = useState();
  const [dashboardTotal, setDashboardTotal] = useState();

  useEffect(() => {
    if (staticData?.length > 0) {
      let newLayout = staticData.map((i) => ({
        i: i?.position?.i,
        x: i?.position.x,
        y: i?.position.y,
        w: i?.position.w,
        h: i?.position.h,
        component: (
          <Cards
            i={i.position.i}
            item={i}
            layout={layout}
            setlayout={setLayout}
            removeWidget={removeWidget}
            setIsDraggable={setIsDraggable}
            isDraggable={isDraggable}
          />
        ),
      }));
      setLayout(newLayout);
      setOldLayout(newLayout);
    }
  }, [apiStatus]);

  console.log("Layout", layout);
  console.log("OldLayout", oldLayout);
  const removeWidget = (id) => {
    setOldLayout((prevLayout) =>
      prevLayout.filter((item) => item.i !== String(id))
    );
    setLayout((prevLayout) =>
      prevLayout.filter((item) => item.i !== String(id))
    );
  };
  const handleDrop = (layout, layoutItem, event) => {
    console.log(event);
    const chartType = event.dataTransfer.getData("chartType");
    const posX = (pos, width) => {
      console.log("poX", pos);
      console.log("width", width);
      if (pos === 10) {
        return 0;
      } else if (pos < 10) {
        if (width >= 4) {
          if (pos + 4 >= 10) {
            return 0;
          }
          return pos + 4;
        }
        return pos + 3;
      } else {
        return 0;
      }
    };
    const posY = (posX, posY) => {
      if (posX >= 10) {
        return posY + 1;
      } else {
        return posY;
      }
    };
    console.log(chartType);
    const id = layout.length + 1;
    setLayout((prev) => [
      ...prev,
      {
        i: String(id),
        x: posX(prev[prev.length - 1].x, prev[prev.length - 1].w),
        y: posY(prev[prev.length - 1].x, prev[prev.length - 1].y),
        w: 4,
        h: 1,
        component: (
          <Cards
            i={String(id)}
            item={data[0]}
            setData={setData}
            data={data}
            layout={layout}
            setlayout={setLayout}
            removeWidget={removeWidget}
            setIsDraggable={setIsDraggable}
            isDraggable={isDraggable}
          />
        ),
      },
    ]);
    setOldLayout((prev) => [
      ...prev,
      {
        i: String(id),
        x: posX(prev[prev.length - 1].x, prev[prev.length - 1].w),
        y: posY(prev[prev.length - 1].x, prev[prev.length - 1].y),
        w: 4,
        h: 1,
        component: (
          <Cards
            i={String(id)}
            item={data[0]}
            setData={setData}
            data={data}
            layout={layout}
            setlayout={setLayout}
            removeWidget={removeWidget}
            setIsDraggable={setIsDraggable}
            isDraggable={isDraggable}
          />
        ),
      },
    ]);
  };

  const handleClick = (id) => {
    setId(id);
  };

  const handleLayoutChange = () => {
    if (layout.length > 0) {
      const updatedLayout = layout.map((item, index) => {
        if (window.innerWidth <= 576 && window.innerWidth < 768) {
          return { ...item, x: 0, y: item.y, w: 2 };
        }
        if (window.innerWidth >= 768 && window.innerWidth < 992) {
          return {
            ...item,
            x: index % 2 === 0 ? 0 : 3,
            y: Math.floor(index / 2) * 4,
            w: 2,
          };
        }
        if (window.innerWidth >= 992 && window.innerWidth < 1200) {
          return {
            ...item,
            x: index % 2 === 0 ? 0 : 4,
            y: Math.floor(index / 2) * 4,
            w: 3,
          };
        }
        if (window.innerWidth >= 1200 && window.innerWidth < 1400) {
          return {
            ...item,
            x: index % 2 === 0 ? 0 : 6, // Even indices (0,2,4) go to x=0, odd indices (1,3,5) go to x=6
            y: Math.floor(index / 2) * 5, // Every 2 items go to a new row
            w: 5,
          };
        }

        return item;
      });
      if (window.innerWidth >= 1400) {
        setLayout(oldLayout);
        return;
      } else {
        setLayout(updatedLayout);
      }
      console.log("updatedLayout", updatedLayout);
    }
  };

  return (
    <div>
      {dashboardTotal?.map((i) => (
        <>
          <button
            className="btn btn-primary me-2 my-2"
            onClick={() => handleClick(i.dashboardId)}
          >
            {i.title}
          </button>
        </>
      ))}
      <ReactGridLayout
        className="dashboard-drop-area"
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        layouts={layout}
        breakpoints={{ lg: 1200, md: 992, sm: 768, xs: 576, xxs: 0 }}
        isResizable={false}
        isDroppable={true}
        onDrop={handleDrop}
        allowOverlap={false}
        autoSize={true}
        draggableCancel=".cancelSelectorName"
        onLayoutChange={handleLayoutChange}
        onBreakpointChange={handleLayoutChange}
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
