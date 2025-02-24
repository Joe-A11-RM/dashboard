import React from "react";
import Count from "./Count";

const CountsOverview = () => {
  return (
    <div className="countsOverview">
      <Count title="Users" number="20" />
      <Count title="Vehicles" number="20000" />
      <Count title="Drivers" number="250" />
      <Count title="Sectors" number="8" />
      <Count title="Projects" number="11" />
      <Count title="Companies" number="6" />
      <Count title="Service lines" number="8" />
      <Count title="Projects" number="11" />
      <Count title="Companies" number="6" />
    </div>
  );
};

export default CountsOverview;
