import Modal from "react-bootstrap/Modal";
import ModalsButtons from "../ModalsButtons/ModalsButtons";

export default function DeleteDashboard({
	show,
	onHide,
	text,
	id,
	deleteDashboard,
}) {
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
					Delete {text}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>Are you sure delete this dashboard?</Modal.Body>
			<Modal.Footer>
				<ModalsButtons
					close={onHide}
					action={deleteDashboard}
					id={id}
					text="delete"
					danger="bg-danger"
				/>
			</Modal.Footer>
		</Modal>
	);
}
