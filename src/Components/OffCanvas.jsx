import React, { useContext } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { dashboardcontext } from "../context/DashboardContext";
import { IoIosClose } from "react-icons/io";

const OffCanvasTemplate = ({ title, scroll, backdrop, children }) => {
	let {
		dashboardMenu,
		setDashboardMenu,
		dashboardTypeWidget,
		setDashboardTypeWidget,
	} = useContext(dashboardcontext);
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
				<Offcanvas.Header>
					<Offcanvas.Title>
						{dashboardTypeWidget.value === false ? (
							<>
								<div className="dashboard-menu-head-title">
									Reusable Widgets
								</div>
								<div className="dashboard-menu-sub-title">
									Select any category and customize your widgets
								</div>
							</>
						) : (
							<>
								<div className="d-flex align-align-items-center">
									<div
										className="dashboard-menu-back-bottom "
										onClick={() =>
											setDashboardTypeWidget({ type: "", value: false })
										}
									>
										<img
											src={`${process.env.PUBLIC_URL}/assets/Light/Arrow.svg`}
											alt="Back"
										/>
									</div>
									<div className="dashboard-menu-head-title">
										{dashboardTypeWidget.type}
									</div>
								</div>

								<div className="dashboard-menu-sub-title">
									Select or drag and drop any widget into the dashboard{" "}
								</div>
							</>
						)}
					</Offcanvas.Title>
					<IoIosClose
						className="translate-middle-y offcanvas-closebtn"
						size={32}
						onClick={() => setDashboardMenu(false)}
					/>
				</Offcanvas.Header>
				<Offcanvas.Body>{children}</Offcanvas.Body>
			</Offcanvas>
		</>
	);
};

export default OffCanvasTemplate;
