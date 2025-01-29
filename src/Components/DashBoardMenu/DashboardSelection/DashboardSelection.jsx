export default function DashboardSelection({ choice, setChoice }) {
	return (
		<div className="dashboard-selection row">
			<div className="dashboard-selection-button col-lg-6">
				<div
					className={` ${
						choice === "ready"
							? "dashboard-selected-active"
							: "dashboard-selected"
					}`}
					onClick={() => setChoice("ready")}
				>
					<div>ready-to-use</div>
				</div>
			</div>
			<div className="dashboard-selection-button col-lg-6">
				<div
					className={` ${
						choice === "custom"
							? "dashboard-selected-active"
							: "dashboard-selected"
					}`}
					onClick={() => setChoice("custom")}
				>
					<div>custom</div>
				</div>
			</div>
		</div>
	);
}
