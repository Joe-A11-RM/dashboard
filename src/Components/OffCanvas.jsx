import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

const OffCanvasTemplate = ({
  ButtonText,
  title,
  scroll,
  backdrop,
  children,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  return (
    <>
      <Button variant="primary" onClick={toggleShow} className="me-2">
        {ButtonText}
      </Button>

      <Offcanvas
        show={show}
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
