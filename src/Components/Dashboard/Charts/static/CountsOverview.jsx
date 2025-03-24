import React from "react";
import Count from "./Count";

const CountsOverview = ({ data, number }) => {
	return (
		<div className="countsOverview">
			{data?.map((i, index) => (
				<Count
					key={index}
					valuekey={index}
					title={i?.label}
					number={i?.totalCount}
				/>
			))}

		</div>
	);
};

export default CountsOverview;
