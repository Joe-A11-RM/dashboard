import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import DashboardAddWidget from "./DashboardHeader/DashboardOptions/DashboardAddWidget/DashboardAddWidget";

const OffCanvasTemplate = ({
	showDahsboardMenu,
	setShowDahsboardMenu,
	title,
	scroll,
	backdrop,
	children,
}) => {
	const handleClose = () => setShowDahsboardMenu(false);

	return (
		<>
			<Offcanvas
				show={showDahsboardMenu}
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
