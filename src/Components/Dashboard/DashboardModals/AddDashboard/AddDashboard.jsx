import Modal from "react-bootstrap/Modal";
import ModalsButtons from "../ModalsButtons/ModalsButtons";

export default function AddDashboard({
	onHide,
	show,
	handleSubmit,
	dashboardFormAction,
	name,
	modal,
}) {
	const formlabel =
		dashboardFormAction.errors.name && dashboardFormAction.touched.name
			? "form-label label-error"
			: "form-label";
	const formcontrol =
		dashboardFormAction.errors.name && dashboardFormAction.touched.name
			? "form-control form-error"
			: "form-control";
	return (
		<Modal
			show={show}
			onHide={onHide}
			onExit={onHide}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					{modal.type === "add" ? "Create new dashboard" : "Edit dashboard"}
				</Modal.Title>
			</Modal.Header>
			<form onSubmit={handleSubmit}>
				<Modal.Body>
					<label htmlFor="name" className={formlabel}>
						Name
					</label>
					<input
						type="text"
						className={formcontrol}
						id="name"
						placeholder="Dashboard Name"
						onBlur={dashboardFormAction.handleBlur}
						onChange={dashboardFormAction.handleChange}
						errors={dashboardFormAction.errors.name}
						touched={dashboardFormAction.touched.name}
						value={dashboardFormAction.values.name || ""}
					/>
					{dashboardFormAction.touched.name &&
					dashboardFormAction.errors.name ? (
						<div className="label-error mt-1">
							{dashboardFormAction.errors.name}
						</div>
					) : null}
				</Modal.Body>
				<Modal.Footer>
					<ModalsButtons
						close={onHide}
						text={modal.type === "add" ? "create" : "save changes"}
					/>
				</Modal.Footer>
			</form>
		</Modal>
	);
}
