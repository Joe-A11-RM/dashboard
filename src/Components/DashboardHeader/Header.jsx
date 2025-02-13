import React from "react";
import DashboardDropdown from "./DashboardDropdown/DashboardDropdown";
import DashboardOptions from "./DashboardOptions/DashboardOptions";

const Header = ({ showDahsboardMenu, setShowDahsboardMenu }) => {
	return (
		<div className="dashboard-header">
			<DashboardDropdown />
			<DashboardOptions
				showDahsboardMenu={showDahsboardMenu}
				setShowDahsboardMenu={setShowDahsboardMenu}
			/>
		</div>
	);
};

export default Header;
