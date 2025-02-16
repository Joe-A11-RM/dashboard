import React from "react";

export default function DashboardDropdownMenu({ handleSelect, ref, data , setModal }) {
	return (
		<div ref={ref} className="dashboard-dropdown-menu">
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
									onClick={() => setModal({ type: "edit", value: true })}
								/>
								<img
									src="assets/Dark/Delete.svg"
									alt="delete"
									onClick={() => setModal({ type: "delete", value: true })}
								/>
							</div>
						</div>
					</>
				))}
			</div>
			<div
				className="dashboard-dropdown-value-new"
				onClick={() => setModal({ type: "add", value: true })}
			>
				create new dashboard
			</div>
		</div>
	);
}
