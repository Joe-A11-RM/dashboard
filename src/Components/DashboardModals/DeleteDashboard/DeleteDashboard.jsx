import Modal from "react-bootstrap/Modal";
import ModalsButtons from "../ModalsButtons/ModalsButtons";

export default function DeleteDashboard(props) {
	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Delete {props.text}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>Are you sure delete this dashboard?</Modal.Body>
			<Modal.Footer>
				<ModalsButtons close={props.onHide} text="delete" danger="bg-danger" />
			</Modal.Footer>
		</Modal>
	);
}
