import React from "react";
import { LuExternalLink } from "react-icons/lu";

const Count = ({ title, number, valuekey }) => {
	return (
		<div key={valuekey} className="count">
			<div className="count-header">
				<p>{title}</p>
				<LuExternalLink color="#CCCCCC" size={16} className="count-link" />
			</div>
			<p className="count-number">{number}</p>
		</div>
	);
};

export default Count;
