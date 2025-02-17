import Modal from "react-bootstrap/Modal";
import ModalsButtons from "../ModalsButtons/ModalsButtons";

export default function AddDashboard({
	onHide,
	show,
	handleSubmit,
	dashboardFormAction,
	name,
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
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Create New Dashboard
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
						value={name || ""}
					/>
					{dashboardFormAction.touched.name &&
					dashboardFormAction.errors.name ? (
						<div className="label-error mt-1">
							{dashboardFormAction.errors.name}
						</div>
					) : null}
				</Modal.Body>
				<Modal.Footer>
					<ModalsButtons close={onHide} text={name ? "save" : "create"} />
				</Modal.Footer>
			</form>
		</Modal>
	);
}
