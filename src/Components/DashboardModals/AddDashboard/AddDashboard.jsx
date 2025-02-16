import Modal from "react-bootstrap/Modal";
import ModalsButtons from "../ModalsButtons/ModalsButtons";

export default function AddDashboard(props) {
	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Create New Dashboard
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<label for="name" class="form-label">
					Name
				</label>
				<input
					type="text"
					class="form-control"
					id="name"
					placeholder="Dashboard Name"
				/>
			</Modal.Body>
			<Modal.Footer>
				<ModalsButtons close={props.onHide} text="create" />
			</Modal.Footer>
		</Modal>
	);
}
