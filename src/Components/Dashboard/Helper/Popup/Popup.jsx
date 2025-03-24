import React from "react";
import Modal from "react-bootstrap/Modal";
import PopupTitle from "./PopupTitle";
import { IoIosClose } from "react-icons/io";

export default function Popup({
  size,
  show,
  children,
  style,
  image,
  title,
  subtitle,
  handleClose,
}) {
  return (
    <>
      <Modal
        size={size ? size : "sm"}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className={`${style}`}
        show={show}
        backdrop="static"
      >
        <Modal.Header className="modal-header flex-between">
          <Modal.Title id="contained-modal-title-vcenter">
            <PopupTitle image={image} title={title} subtitle={subtitle} />
          </Modal.Title>
          <IoIosClose
            className="popup-closebtn"
            size={32}
            onClick={handleClose}
          />
        </Modal.Header>
        <Modal.Body className="modal-body">{children}</Modal.Body>
      </Modal>
    </>
  );
}
