import React, { useContext } from "react";

import { dashboardcontext } from "../../../../context/DashboardContext";
export default function DashboardDropdownMenu({
	ref,
	handleSelect,
	data,
	error,
	truncateText,
}) {
	let { setModal, setDashboardInf } = useContext(dashboardcontext);

	if (error) return <div>error</div>;
	return (
		<>
			<div ref={ref} className="dashboard-dropdown-menu">
				<div className="dashboard-dropdown-values-layout ">
					{data?.response?.data.map((i) => (
						<div
							key={i.id}
							className="dashboard-dropdown-value"
							onClick={() => {
								handleSelect(i.name);
								setDashboardInf(i);
							}}
						>
							<div title={i.name}> {truncateText(i.name)} </div>
							<div>
								<img
									src={`${process.env.PUBLIC_URL}/assets/Dark/Edit.svg`}
									alt="edit"
									className="me-1"
									onClick={() => {
										setModal({ type: "edit", value: true });
										setDashboardInf(i);
									}}
								/>
								<img
									src={`${process.env.PUBLIC_URL}/assets/Dark/Delete.svg`}
									alt="delete"
									onClick={() => {
										setModal({ type: "delete", value: true });
										setDashboardInf(i);
									}}
								/>
							</div>
						</div>
					))}
				</div>
				<div
					className="dashboard-dropdown-value-new"
					onClick={() => setModal({ type: "add", value: true })}
				>
					create new dashboard
				</div>
			</div>
		</>
	);
}
