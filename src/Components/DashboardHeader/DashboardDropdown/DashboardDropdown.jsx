import React, { useContext, useState } from "react";
import { dashboardcontext } from "../../../context/DashboardContext";

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
	const [title, setTitle] = useState(data[0]);
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
				{editMode && (
					<>
						<img src="assets/Dark/Edit.svg" alt="edit" />
						<img src="assets/Dark/Delete.svg" alt="delete" className="mx-3" />
						<span className="me-3">|</span>
						<div>Edit Mode</div>
					</>
				)}
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
				<div className="dashboard-dropdown-menu">
					<div className="dashboard-dropdown-values-layout ">
						{data.map((i, index) => (
							<>
								<div
									key={index}
									className="dashboard-dropdown-value"
									onClick={() => handleSelect(i)}
								>
									<div> {i} </div>
									<div>
										<img
											src="assets/Dark/Edit.svg"
											alt="edit"
											className="me-1"
										/>
										<img src="assets/Dark/Delete.svg" alt="delete" />
									</div>
								</div>
							</>
						))}
					</div>
					<div className="dashboard-dropdown-value-new">
						create new dashboard
					</div>
				</div>
			)}
		</div>
	);
}
