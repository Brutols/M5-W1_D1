import { useState } from "react";
import Modal from "react-bootstrap/Modal";

function ErrorModal(props) {
  const [smShow, setSmShow] = useState(true);

  return (
    <>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Error!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.text}</Modal.Body>
      </Modal>
    </>
  );
}

export default ErrorModal;
