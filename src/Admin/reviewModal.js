import React from "react";
import { Modal, Button } from "react-bootstrap";

function reviewModal(props) {
  return (
    <div>
      <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header>
          <Modal.Title>{props.userName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.review}</Modal.Body>
      </Modal>
    </div>
  );
}
export default reviewModal;
