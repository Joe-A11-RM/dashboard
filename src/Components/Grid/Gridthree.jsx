/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css"; // Required styles
import Cards from "../Cards/Cards";
import {
  useCreateWidgetMutation,
  useDeleteDashboardWidgetsMutation,
  useEditDashboardWidgetsMutation,
  useGetAllDashboardsWidgetsQuery,
  useLazyGetSingleWidgetQuery,
} from "../../Redux/service/Dashboard";
import { dashboardcontext } from "../../context/DashboardContext";
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
  const [createWidget] = useCreateWidgetMutation();
  const [fetchSingle] = useLazyGetSingleWidgetQuery();
  const [allWidgets, setAllWidgets] = useState();

  let { dashboardInf, editMode, setEditMode, saveChanges, setSaveChanges } =
    useContext(dashboardcontext);
  let { data: DashboardWidgets, refetch } = useGetAllDashboardsWidgetsQuery(
    {
      id: dashboardInf?.id,
    },
    { skip: !dashboardInf?.id }
  );
  useEffect(() => {
    if (DashboardWidgets?.response?.data) {
      const widgets = DashboardWidgets.response.data.map((item) => ({
        widgetId: item.widgetId,
        position: item.position,
      }));
      setAllWidgets(widgets);
      console.log("widgets", widgets);
    }
  }, [DashboardWidgets]);

  let [editDashboardWidget] = useEditDashboardWidgetsMutation();
  let [deleDashboardWidget, { status }] = useDeleteDashboardWidgetsMutation();
  const [theme, setTheme] = useState(null);

  const [updatedWidgets, setUpdatedWidgets] = useState();
  useEffect(() => {
    if (
      !DashboardWidgets?.response?.data ||
      !Array.isArray(DashboardWidgets.response.data)
    ) {
      console.error("Invalid data structure:", DashboardWidgets);
      return;
    }
    if (DashboardWidgets?.response?.data && dashboardInf?.id) {
      setTheme(generateInitialTheme(DashboardWidgets.response.data));
    }
  }, [dashboardInf?.id, DashboardWidgets]);

  const prevThemeLengthRef = useRef(theme?.length);
  const removeWidget = (id) => {
    //setTheme((prev) => prev.filter((item) => item.i !== String(id)));
    deleDashboardWidget(id);
  };

  const generateLayouts = (themeData, columnCounts) => {
    const layouts = {};
    let prevThemeLength = prevThemeLengthRef.current;
    Object.entries(columnCounts).forEach(([breakpoint, cols]) => {
      let currentX = 0,
        currentY = 0,
        rowHeight = 0;
      if (themeData?.length > 0) {
        layouts[breakpoint] = themeData?.map(({ i, x, y, w, h }, index) => {
          let newWidth =
            breakpoint === "xs" ? 4 : Math.max(2, Math.floor((w / 12) * cols));
          if (index === 0) {
            currentX = x;
            currentY = y;
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
            newPosition = {
              i,
              x: themeData[themeData.length - 1].x,
              y: currentY,
              w: newWidth,
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
    const { widgetId, w, h } = JSON.parse(draggedData);
    const { data: singleWidgetData } = await fetchSingle({ id: widgetId });
    if (!singleWidgetData || !singleWidgetData.response) {
      console.error("Failed to fetch widget data.");
      return;
    }
    const widgetData = singleWidgetData.response.data[0]; // Extracting actual data
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
          w: w,
          h: h,
          component: (
            <Cards
              key={`${breakpoint}-${newId}`}
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
    const newI = Math.floor(Math.random() * 100);
    setAllWidgets((prevWidgets) => [
      ...prevWidgets,
      {
        widgetId,
        position: { i: `${newI}`, x: newX, y: newY, w, h },
      },
    ]);
  };

  const handleSave = () => {
    try {
      setAllWidgets((prevWidgets) => {
        const updatedWidgets = prevWidgets.map((widget) => {
          const updatedWidget = differentWidgets.find(
            (diff) => diff.position.i === widget.position.i
          );

          return updatedWidget &&
            (updatedWidget.position.x !== widget.position.x ||
              updatedWidget.position.y !== widget.position.y)
            ? updatedWidget
            : widget;
        });

        createWidget({
          id: dashboardInf?.id,
          val: updatedWidgets,
        });

        return updatedWidgets;
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

    setUpdatedWidgets(updatedWidgets);
  };
  const differentWidgets =
    DashboardWidgets?.response?.data && updatedWidgets
      ? updatedWidgets
          .map((updatedItem) => {
            const matchedWidget = DashboardWidgets.response.data.find(
              (widget) => widget.position.i === updatedItem.position.i
            );

            if (matchedWidget) {
              const { x, y, w, h } = matchedWidget.position;
              const updatedPos = updatedItem.position;
              if (
                x !== updatedPos.x ||
                y !== updatedPos.y ||
                w !== updatedPos.w ||
                h !== updatedPos.h
              ) {
                return {
                  widgetId: matchedWidget.widgetId,
                  position: updatedPos,
                };
              }
            }
            return null;
          })
          .filter((widget) => widget !== null)
      : [];

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
    console.log("data", x);
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
      {DashboardWidgets?.response.data.length > 0 ? (
        <ReactGridLayout
          key={JSON.stringify(x.i)}
          className="layout"
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
          onDragStop={handleDrag}
          onDrop={handleDrop}
          draggableCancel=".cancelSelectorName"
        >
          {j()}
        </ReactGridLayout>
      ) : (
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <></>
        </div>
      )}{" "}
    </div>
  );
}
