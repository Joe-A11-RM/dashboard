/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css"; // Required styles
import Cards from "../Cards/Cards";
import {
  useCreateWidgetMutation,
  useDeleteDashboardWidgetsMutation,
  useGetAllDashboardsWidgetsQuery,
  useLazyGetSingleWidgetQuery,
} from "../../Redux/service/Dashboard";
import { dashboardcontext } from "../../context/DashboardContext";
import DashboardAddWidget from "../buttons/AddWidget";
const ReactGridLayout = WidthProvider(Responsive);

const generateInitialTheme = (data) => {
  return (
    data.length > 0 &&
    data?.map((item) => ({
      ...item.position,
      component: (
        <Cards
          key={item.id}
          i={item?.position.i}
          item={item}
          removeWidget={() => {}}
        />
      ),
    }))
  );
};

export default function Gridthree() {
  const [createWidget] = useCreateWidgetMutation();
  const [fetchSingle] = useLazyGetSingleWidgetQuery();
  const [allWidgets, setAllWidgets] = useState();
  let [deleDashboardWidget, { status }] = useDeleteDashboardWidgetsMutation();
  const [theme, setTheme] = useState(null);

  let { dashboardInf, editMode, setEditMode, saveChanges, setSaveChanges } =
    useContext(dashboardcontext);
  let { data: DashboardWidgets, refetch } = useGetAllDashboardsWidgetsQuery(
    {
      id: dashboardInf?.id,
    },
    { skip: !dashboardInf?.id }
  );
  useEffect(() => {
    let widgets = [];
    if (DashboardWidgets?.response?.data.length > 0) {
      widgets = DashboardWidgets?.response?.data.map((item) => ({
        widgetId: item.widgetId,
        position: item.position,
      }));
    }
    setAllWidgets(widgets);
  }, [dashboardInf, DashboardWidgets]);

  useEffect(() => {
    if (
      !DashboardWidgets?.response?.data ||
      !Array.isArray(DashboardWidgets.response.data)
    ) {
      console.log("no data:", DashboardWidgets);
      return;
    }
    if (DashboardWidgets?.response?.data && dashboardInf?.id) {
      setTheme(generateInitialTheme(DashboardWidgets.response.data));
    }
  }, [dashboardInf?.id, DashboardWidgets]);

  const prevThemeLengthRef = useRef(theme?.length);
  const removeWidget = (id) => {
    setAllWidgets((prev) => prev.filter((item) => item.id !== String(id)));
    if (id === "1" || id === "2" || id === "3" || id === "4") return;
    deleDashboardWidget(id);
  };
  console.log("Theme", theme);
  const generateLayouts = (themeData, columnCounts) => {
    const layouts = {};

    Object.entries(columnCounts).forEach(([breakpoint, cols]) => {
      let currentX = 0,
        currentY = 0,
        rowHeight = 0,
        itemsInRow = 0,
        rowLimit = 0; // Number of items per row before moving to next y

      if (themeData?.length > 0) {
        layouts[breakpoint] = themeData.map(
          ({ i, x, y, w, h, component }, index) => {
            let newWidth;
            switch (breakpoint) {
              case "4k":
              case "2k":
                newWidth = 3;
                break;
              case "lg":
                newWidth = 4;
                break;
              case "md":
                newWidth = 5;
                break;
              case "sm":
                newWidth = 6;
                break;
              case "xs":
              case "xss":
                newWidth = 4;
                break;
              default:
                newWidth = Math.max(2, Math.floor((w / 12) * cols));
            }

            rowLimit = newWidth === 3 ? 4 : 3;

            if (index === 0) {
              currentX = ["md"].includes(breakpoint) ? 0 : x; // Take x from themeData
              currentY = 0;
              rowHeight = h;
            } else {
              if (currentX + newWidth > cols) {
                // Move to next row
                currentX = 0;
                currentY += rowHeight; // Increment Y correctly
                if (["md"].includes(breakpoint)) {
                  itemsInRow = 0;
                }
              }
            }

            if (["4k", "2k"].includes(breakpoint)) {
              currentX = Math.floor(currentX / 3) * 3; // Force multiples of 3
            }

            if (["lg"].includes(breakpoint)) {
              currentX = x; // Force multiples of 3
              currentY = y; // Force multiples of 3
            }
            if (itemsInRow >= rowLimit) {
              currentX = ["lg"].includes(breakpoint) ? x : 0;
              currentY = ["lg"].includes(breakpoint) ? y : +1;
              itemsInRow = 0;
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
            itemsInRow++;

            return newPosition;
          }
        );
      }
    });

    return layouts;
  };

  const columnCounts = {
    "4k": 12, // 4K screens
    "2k": 12, // 2K screens
    lg: 12, // Laptop
    md: 10, // Medium
    sm: 6, // Small
    xs: 4, // Extra small
    xxs: 2, // Tiny screens
  };
  let [x, setX] = useState([]);
  //const layouts = generateLayouts(theme, columnCounts);
  useEffect(() => {
    if (DashboardWidgets?.response?.data && dashboardInf?.id) {
      if (Object.keys(DashboardWidgets?.response?.data).length === 0) {
        setX([]);
      } else {
        setX(generateLayouts(theme, columnCounts));
      }
    }
  }, [theme]);

  const handleDrop = async (layout, layoutItem, e) => {
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

    let newX = 0;
    let newY = 0;
    const { widgetId, w, h } = JSON.parse(draggedData);
    const { data: singleWidgetData } = await fetchSingle({ id: widgetId });
    if (!singleWidgetData || !singleWidgetData.response) {
      console.error("Failed to fetch widget data.");
      return;
    }
    const widgetData = singleWidgetData.response.data[0];

    setX((prevX) => {
      const updatedState = { ...prevX };

      Object.keys(columnCounts).forEach((breakpoint) => {
        const prevItems = prevX[breakpoint] || [];

        // **Find the maximum y level**
        const maxY =
          prevItems.length > 0
            ? Math.max(...prevItems.map((item) => item.y))
            : 0;

        // **Find the highest x position at max y**
        const itemsAtMaxY = prevItems.filter((item) => item.y === maxY);
        const maxX =
          itemsAtMaxY.length > 0
            ? Math.max(...itemsAtMaxY.map((item) => item.x))
            : 0;

        // **Set newX beside the last item at maxY, otherwise reset to 0 if row is full**
        let newX = maxX + w < columnCounts[breakpoint] ? maxX + w : 0;
        let newY = newX === 0 ? maxY + 1 : maxY; // Move to a new row if the current row is full

        // Generate a unique `i` value
        const existingIds = new Set(prevItems.map((item) => item.i));
        let newId = 1;
        while (existingIds.has(String(newId))) {
          newId++;
        }

        const newItem = {
          i: String(newId),
          x: newX,
          y: newY,
          w: w,
          h: h,
          component: (
            <Cards
              key={newId}
              i={newId}
              item={widgetData}
              removeWidget={removeWidget}
            />
          ),
        };

        updatedState[breakpoint] = [...prevItems, newItem];
      });

      return updatedState;
    });

    setAllWidgets((prevWidgets = []) => {
      const existingIds = new Set(
        prevWidgets.map((widget) => widget.position.i)
      );
      let newI = 1;
      while (existingIds.has(String(newI))) {
        newI++;
      }

      return [
        ...prevWidgets,
        {
          widgetId,
          position: { i: String(newI), x: newX, y: newY, w, h },
        },
      ];
    });
  };

  console.log("xx", x);
  console.log("allWidgets", allWidgets);

  const handleSave = () => {
    try {
      createWidget({
        id: dashboardInf?.id,
        val: allWidgets,
      });
      refetch();
      setEditMode(false);
    } catch (err) {
      console.error("Error saving widget:", err);
    }
  };

  useEffect(() => {
    if (saveChanges) {
      handleSave();
      setSaveChanges(false);
    }
  }, [saveChanges]);

  const handleDrag = (e) => {
    const updatedWidgets = e.map((item) => ({
      position: {
        i: item.i,
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h,
      },
    }));
    // Update allWidgets based on updatedWidgets
    setAllWidgets((prevWidgets) =>
      prevWidgets.map((widget) => {
        const updatedWidget = updatedWidgets.find(
          (updated) => updated.position.i === widget.position.i
        );
        return updatedWidget
          ? { ...widget, position: updatedWidget.position }
          : widget;
      })
    );
  };

  useEffect(() => {
    if (status === "fulfilled") {
      refetch();
    }
  }, [status, refetch]);
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
    if (data.length === 0) {
      return (
        <div
          key="no-data"
          className="empty-dashboard"
          data-grid={{ i: "no-data", x: 0, y: 0, w: 12, h: 1, static: true }}
        >
          <DashboardAddWidget />
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
        key={JSON.stringify(x.i)}
        className="layout"
        layouts={x}
        cols={columnCounts}
        rowHeight={400}
        margin={[20, 20]}
        breakpoints={{
          "4k": 2560,
          "2k": 2048,
          lg: 1200,
          md: 996,
          sm: 768,
          xs: 480,
          xxs: 0,
        }}
        isResizable={false}
        isDroppable={editMode ? true : false}
        isDraggable={editMode ? true : false}
        allowOverlap={false}
        autoSize={true}
        onDragStop={handleDrag}
        onDrop={handleDrop}
        draggableCancel=".cancelSelectorName"
      >
        {j()}
      </ReactGridLayout>
    </div>
  );
}
