import { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

function ErrorModal({text, isDeleting, deleteFn, setCheckDelete}) {
  const [smShow, setSmShow] = useState(true);

  const  handleClose = () => {
    setSmShow(false)
    setCheckDelete(false)
  }

  const handleDelete = () => {
    setSmShow(false)
    deleteFn()
  }

  return (
    <>
      <Modal
        size="sm"
        show={smShow}
        onHide={handleClose}
        aria-labelledby="example-modal-sizes-title-sm"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            {isDeleting ? "Are you sure?" : "Error!"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{isDeleting ? "You want to delete this comment?" : text}</Modal.Body>
        {isDeleting ? <Button variant="danger" onClick={handleDelete}>Delete</Button> : ""}
      </Modal>
    </>
  );
}

export default ErrorModal;
