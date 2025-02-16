import React from "react";

export default function DashboardDropdownEditMode() {
	return (
		<>
			<div className="icon-wrapper">
				<img src="assets/Dark/Edit.svg" alt="edit" />
			</div>
			<div className="icon-wrapper">
				<img src="assets/Dark/Delete.svg" alt="delete" className="mx-3" />
			</div>
			<span className="me-3">|</span>
			<div>Edit Mode</div>
		</>
	);
}
