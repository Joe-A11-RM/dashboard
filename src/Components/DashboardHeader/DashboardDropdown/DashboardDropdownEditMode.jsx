import React from "react";
import { useContext } from "react";
import { dashboardcontext } from "../../../context/DashboardContext";

export default function DashboardDropdownEditMode() {
	let { setModal } = useContext(dashboardcontext);
	return (
		<>
			<div
				className="icon-wrapper"
				onClick={() => setModal({ type: "edit", value: true })}
			>
				<img
					src={`${process.env.PUBLIC_URL}/assets/Dark/Edit.svg`}
					alt="edit"
				/>
			</div>
			<div
				className="icon-wrapper"
				onClick={() => setModal({ type: "delete", value: true })}
			>
				<img
					src={`${process.env.PUBLIC_URL}/assets/Dark/Delete.svg`}
					alt="delete"
					className="mx-3"
				/>
			</div>
			<span className="me-3">|</span>
			<div>Edit Mode</div>
		</>
	);
}
