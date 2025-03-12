import React from "react";
import DashboardDropdown from "./DashboardDropdown/DashboardDropdown";
import DashboardOptions from "./DashboardOptions/DashboardOptions";

const Header = () => {
	return (
		<div className="dashboard-header">
			<DashboardDropdown />
			<DashboardOptions />
		</div>
	);
};

export default Header;
