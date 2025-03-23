import React from "react";

const NoWidgets = () => {
  return (
    <div className="no-widgets">
      <img
        src={`${process.env.PUBLIC_URL}/assets/empty.svg`}
        alt="No widgets available"
      />
      <p>No widgets available</p>
    </div>
  );
};

export default NoWidgets;
