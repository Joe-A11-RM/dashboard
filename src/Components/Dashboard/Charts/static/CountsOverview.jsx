import React from "react";
import Count from "./Count";

const CountsOverview = ({ data, number }) => {

	return (
		<div className="countsOverview">
			{data?.map((i, index) => (
				<Count key={index} title={i?.label} number={i?.totalCount} />
			))}

			<Count title="Sectors" number="0" />
			<Count title="Projects" number="0" />
			<Count title="Companies" number="0" />
			<Count title="Service lines" number="0" />
			<Count title="Projects" number="0" />
		</div>
	);
};

export default CountsOverview;
