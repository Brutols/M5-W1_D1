import { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../Reducers/comments/commentsSlice";

function ErrorModal({text, isDeleting, setCheckDelete, id}) {
  const [smShow, setSmShow] = useState(true);
  const dispatch = useDispatch()

  const  handleClose = () => {
    setSmShow(false)
    if (setCheckDelete) {
      setCheckDelete(false)
    }
  }

  const handleDelete = () => {
    setSmShow(false)
    dispatch(deleteComment(id))
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
