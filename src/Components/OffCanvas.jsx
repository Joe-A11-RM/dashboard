import React, { useContext } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { dashboardcontext } from "../context/DashboardContext";

const OffCanvasTemplate = ({ title, scroll, backdrop, children }) => {
	let { dashboardMenu, setDashboardMenu } = useContext(dashboardcontext);
	const handleClose = () => setDashboardMenu(false);

	return (
		<>
			<Offcanvas
				show={dashboardMenu}
				onHide={handleClose}
				scroll={scroll ? "true" : "false"}
				backdrop={backdrop ? true : false}
				placement="end"
			>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>{title}</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>{children}</Offcanvas.Body>
			</Offcanvas>
		</>
	);
};

export default OffCanvasTemplate;
