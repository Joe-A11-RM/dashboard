import React, { useContext, useEffect, useRef, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css"; // Required styles
import Cards from "../Cards/Cards";
import {
  useCreateWidgetMutation,
  useGetAllDashboardsWidgetsQuery,
} from "../../Redux/service/Dashboard";
import { dashboardcontext } from "../../context/DashboardContext";
import DashboardAddWidget from "../DashboardHeader/DashboardOptions/DashboardAddWidget/DashboardAddWidget";
const ReactGridLayout = WidthProvider(Responsive);

const generateInitialTheme = (data) => {
  return (
    data.length > 0 &&
    data?.map((item) => ({
      ...item.position,
      component: (
        <Cards
          key={item.id}
          i={item.position.i}
          item={item}
          removeWidget={() => {}}
        />
      ),
    }))
  );
};

export default function Gridthree() {
  const [createdWidgets, setCreatedWidgets] = useState([]); // Store widgets in state
  const [createWidget] = useCreateWidgetMutation();
  let [data, setData] = useState([
    {
      id: 1,
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
      style: "col-lg-3",
      chartData: {
        chartType: "PieChart",
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
  let { dashboardInf, editMode } = useContext(dashboardcontext);
  let { data: DashboardWidgets } = useGetAllDashboardsWidgetsQuery(
    {
      id: dashboardInf?.id,
    },
    { skip: !dashboardInf?.id }
  );
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    if (DashboardWidgets?.response?.data && dashboardInf?.id) {
      setTheme(generateInitialTheme(DashboardWidgets.response.data)); // ✅ Set fresh data
    }
  }, [dashboardInf?.id, DashboardWidgets]); // Depend on dashboardInf.id to trigger reset

  const prevThemeLengthRef = useRef(theme?.length);
  const removeWidget = (id) => {
    setTheme((prev) => prev.filter((item) => item.i !== String(id)));
  };

  const generateLayouts = (themeData, columnCounts) => {
    console.log("Theme Data", themeData);
    const layouts = {};
    let prevThemeLength = prevThemeLengthRef.current;
    Object.entries(columnCounts).forEach(([breakpoint, cols]) => {
      let currentX = 0,
        currentY = 0,
        rowHeight = 0;
      if (themeData?.length > 0) {
        layouts[breakpoint] = themeData?.map(({ i, x, y, w, h }, index) => {
          console.log("themeData[index]?.component?.props.item", i);
          let newWidth =
            breakpoint === "xs" ? 4 : Math.max(2, Math.floor((w / 12) * cols));
          if (index === 0) {
            currentX = 0;
            currentY = 0;
            rowHeight = h;
          } else {
            if (currentX + newWidth > cols) {
              currentX = 0;
              currentY += rowHeight;
              rowHeight = h;
            }
          }
          let newPosition = {
            i,
            x: currentX,
            y: currentY,
            w: newWidth,
            h,
            component: (
              <Cards
                key={index}
                i={index}
                item={themeData[index]?.component?.props.item}
                removeWidget={removeWidget}
              />
            ),
          };
          currentX += newWidth;
          rowHeight = Math.max(rowHeight, h);
          if (
            index === themeData.length - 1 &&
            prevThemeLength !== themeData.length
          ) {
            console.log("Updating last item position!");
            newPosition = {
              i,
              x: themeData[themeData.length - 1].x,
              y: currentY,
              w: themeData[themeData.length - 1].w,
              h: themeData[themeData.length - 1].h,
              component: (
                <Cards
                  key={index}
                  i={index}
                  item={themeData[themeData.length - 1]?.component?.props.item}
                  removeWidget={removeWidget}
                />
              ),
            };
          }
          return newPosition;
        });
      }
    });
    if (layouts) {
      ["lg", "md"].forEach((breakpoint) => {
        if (layouts[breakpoint]) {
          const y0Items = layouts[breakpoint].filter((item) => item.y === 0);

          // Dynamically determine the next y value based on the max height in y0Items
          const maxHeight = Math.max(...y0Items.map((item) => item.h), 0);
          const yNextItems = layouts[breakpoint].filter(
            (item) => item.y === maxHeight
          );

          y0Items.forEach((y0Item) => {
            yNextItems.forEach((yNextItem, index) => {
              if (y0Item.x === yNextItem.x) {
                if (y0Item.h > yNextItem.h) {
                  // Move x position
                  yNextItem.x = y0Item.w + yNextItem.x;

                  // Find the next item in yNextItems
                  if (index + 1 < yNextItems.length) {
                    const nextItem = yNextItems[index + 1];
                    nextItem.x = 0; // Set x to 0
                  }
                }
              }
            });
          });
        }
      });
    }
    return layouts;
  };

  const columnCounts = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };
  let [x, setX] = useState([]);
  //const layouts = generateLayouts(theme, columnCounts);
  useEffect(() => {
    setX(generateLayouts(theme, columnCounts));
  }, [theme]);

  const handleDrop = (layout, layoutItem, e) => {
    e.preventDefault();
    if (!e.dataTransfer) {
      console.error("Invalid drop event: No dataTransfer available.");
      return;
    }
    const draggedData = e.dataTransfer.getData("widget");
    if (!draggedData) {
      console.error("Drop rejected: No valid widget data found.");
      return;
    }
    const { widgetId, w, h } = JSON.parse(draggedData);

    let newX = 0;
    let newY = 0;

    setX((prevX) => {
      const updatedState = { ...prevX };

      Object.keys(columnCounts).forEach((breakpoint) => {
        const prevItems = prevX[breakpoint] || [];
        const lastItem =
          prevItems.length > 0 ? prevItems[prevItems.length - 1] : null;

        if (lastItem) {
          newX =
            lastItem.x + lastItem.w >= columnCounts[breakpoint]
              ? 0
              : lastItem.x + lastItem.w;
          const sameYCount = prevItems.filter(
            (item) => item.y === lastItem.y
          ).length;
          newY = sameYCount >= 4 ? lastItem.y + 1 : lastItem.y;
        }

        const newId = String(prevItems.length + 1);
        const newItem = {
          i: newId,
          x: newX,
          y: newY,
          w: w, // Adjust width based on columns
          h: h,
          component: (
            <Cards
              key={`${breakpoint}-${newId}`}
              i={newId}
              item={data[0]}
              removeWidget={removeWidget}
            />
          ),
        };
        updatedState[breakpoint] = [...prevItems, newItem];
      });

      return updatedState;
    });
    const newI = Math.floor(Math.random() * 100);
    const newWidget = {
      widgetId,
      position: {
        i: newI,
        w: w,
        h: h,
        x: newX,
        y: newY,
      },
    };
    setCreatedWidgets((prevWidgets) => [
      ...prevWidgets,
      {
        widgetId,
        position: { i: newI, x: newX, y: newY, w, h },
      },
    ]);
  };

  const handleSave = () => {
    try {
      createWidget({ id: dashboardInf?.id, val: { widgets: createdWidgets } });
    } catch (err) {
      console.error("Error saving widget");
    }
  };

  const j = () => {
    let data = [];

    if (window.innerWidth > 1200) {
      data = x?.lg || [];
    } else if (window.innerWidth > 996) {
      data = x?.md || [];
    } else if (window.innerWidth > 768) {
      data = x?.sm || [];
    } else if (window.innerWidth > 480) {
      data = x?.xs || [];
    } else {
      data = x?.xss || [];
    }
    // Return "No Data" if empty
    if (data.length === 0) {
      return (
        <div className="no-data">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis nemo
          hic ullam eligendi iste? Qui aut, unde, ducimus autem exercitationem
          fugiat iste vitae cupiditate voluptatum assumenda laborum hic quisquam
          modi aperiam dolor aspernatur? Voluptatibus, laborum. Ipsa, magni sed
          exercitationem libero voluptate vel esse facere porro. Totam cum atque
          illum, illo, beatae asperiores magnam architecto reiciendis corrupti
          assumenda sed laboriosam. Ab fugiat distinctio beatae est! Ducimus
          laudantium deleniti ab libero. Veniam repellat sequi nobis molestias.
          Eum dolorem libero officiis veniam nostrum est, nesciunt magni nulla
          tempore excepturi provident expedita adipisci voluptate eligendi ab
          rerum cupiditate quaerat distinctio, itaque eos? Ullam, sunt.
        </div>
      );
    }

    return data.map(({ i, component }) => (
      <div key={i} className="grid-item">
        {component}
      </div>
    ));
  };
  return (
    <div className="">
      <ReactGridLayout
        key={JSON.stringify(x)}
        className="layout bg-body"
        layouts={x}
        cols={columnCounts}
        rowHeight={400}
        margin={[20, 20]}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        isResizable={false}
        isDroppable={editMode ? true : false}
        isDraggable={editMode ? true : false}
        allowOverlap={false}
        autoSize={true}
        onDrop={handleDrop}
        draggableCancel=".cancelSelectorName"
      >
        {j()}
      </ReactGridLayout>
    </div>
  );
}
