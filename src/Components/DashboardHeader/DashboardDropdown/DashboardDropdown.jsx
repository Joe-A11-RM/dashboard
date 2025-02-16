import React, { useContext, useEffect, useRef, useState } from "react";
import { dashboardcontext } from "../../../context/DashboardContext";
import DashboardDropdownEditMode from "./DashboardDropdownEditMode";
import AddDashboard from "../../DashboardModals/AddDashboard/AddDashboard";
import DeleteDashboard from "../../DashboardModals/DeleteDashboard/DeleteDashboard";
import EditDashboard from "../../DashboardModals/EditDashboard/EditDashboard";
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

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsShown(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [setIsShown]);
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
				/>
			)}
			<AddDashboard
				show={modal.value && modal.type === "add"}
				onHide={() => setModal({ type: "add", value: false })}
			/>
			<DeleteDashboard
				show={modal.value && modal.type === "delete"}
				onHide={() => setModal({ type: "delete", value: false })}
				text="dashboard"
			/>
			<EditDashboard
				show={modal.value && modal.type === "edit"}
				onHide={() => setModal({ type: "edit", value: false })}
				text="dashboard"
			/>
		</div>
	);
}
