import React, { useContext, useRef, useState } from "react";
import { dashboardcontext } from "../../../context/DashboardContext";
import DashboardDropdownEditMode from "./DashboardDropdownEditMode";

import DashboardDropdownMenu from "./DashboardDropdownMenu";

export default function DashboardDropdown() {
	let data = [
		"dashboard",
		"vehicle dashboard",
		"fleet dashboard",
		"driver dashboard",
		"management dashboard",
		"report dashboard",
		"pay dashboard",
	];
	const [shown, setIsShown] = useState(false);
	const [modal, setModal] = useState({ type: "", value: false });
	const [title, setTitle] = useState(data[0]);
	const dropdownRef = useRef(null);
	let { editMode } = useContext(dashboardcontext);
	const handleClick = () => {
		setIsShown(!shown);
	};
	const handleSelect = (val) => {
		setTitle(val);
		setIsShown(false);
	};

	return (
		<div className="dashboard-dropdown-layout">
			<div className="dashboard-dropdown-main-title-layout">
				<div className="dashboard-dropdown-main-title">{title}</div>
				{editMode && <DashboardDropdownEditMode />}
			</div>
			{!editMode && (
				<div className="dropdown-arrow" onClick={handleClick}>
					<img
						src="assets/Dark/DownArrow.svg"
						alt="arrow"
						className={`dashboard-arrow ${shown && "dashboard-arrow-rotated"}`}
					/>
				</div>
			)}
			{shown && (
				<DashboardDropdownMenu
					handleSelect={handleSelect}
					ref={dropdownRef}
					data={data}
					setModal={setModal}
					modal={modal}
				/>
			)}
		</div>
	);
}
