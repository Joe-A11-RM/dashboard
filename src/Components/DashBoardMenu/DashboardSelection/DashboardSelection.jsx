export default function DashboardSelection({ choice, setChoice, setShown }) {
	return (
		<div className="dashboard-selection row gx-0">
			<div className="dashboard-selection-button col-lg-6">
				<div
					className={` ${
						choice === "ready"
							? "dashboard-selected-active"
							: "dashboard-selected"
					}`}
					onClick={() => {
						setChoice("ready");
						setShown(false);
					}}
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
