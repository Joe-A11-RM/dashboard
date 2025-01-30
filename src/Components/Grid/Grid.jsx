import React, { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(Responsive);

export default function NonResizableGrid() {
  const [layout, setLayout] = useState([
    { i: "1", x: 0, y: 0, w: 2, h: 2 },
    { i: "2", x: 2, y: 0, w: 2, h: 2 },
  ]);

  return (
    <div>
      <ReactGridLayout
        className="layout"
        cols={{ lg: 12 }}
        rowHeight={30}
        width={1200}
        layout={layout}
        isResizable={false} // Disable resizing
        onLayoutChange={(newLayout) => setLayout(newLayout)}
      >
        {layout.map((item) => (
          <div
            key={item.i}
            data-grid={item}
            style={{ background: "lightgray" }}
          >
            Component {item.i}
          </div>
        ))}
      </ReactGridLayout>
    </div>
  );
}
