import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import CommentList from "../CommentList/CommentList";
import AddComment from "../AddComment/AddComment";
import ErrorModal from "../ErrorModal/ErrorModal";

const initialFormState = {
  rating: 0,
  inputValue: "",
  isEditing: false,
  commentId: "",
};

function CommentArea(props) {
  const [commentsList, setCommentsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [commentRefresh, setCommentRefresh] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState("")

  const handleCommentRefresh = () => {
    setCommentRefresh(!commentRefresh);
  };

  useEffect(() => {
    setLoading(!loading);

    const getComments = async () => {
      const res = await axios
        .get(
          `https://striveschool-api.herokuapp.com/api/books/${props.asin}/comments/`,
          {
            headers: {
              Authorization:
                "Bearer " +
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFmOWU5YmJkNWQxMjAwMTg5MGQ0NjQiLCJpYXQiOjE3MDgwOTU5MjEsImV4cCI6MTcwOTMwNTUyMX0.uUoRJ9TIYLG9g18h_sNUuZ0dnv9hqZIVH6jD_kpZhFs",
            },
          }
        )
        .catch(function (error) {
          if (error.response) {
            setError(`${error.response.status} : ${error.response.message}`);
          } else if (error.request) {
            setError(`${error.request.status} : ${error.request.message}`);
          } else {
            setError(`Ooops something went wrong! ${error.message}`);
          }
        });

      setCommentsList(res.data);
    };
    getComments();

    setFormData(initialFormState);
    setCommentRefresh(false);
    setLoading(!loading);
  }, [commentRefresh]);

  return (
    <>
    {error ? <ErrorModal text={error} /> : ""}
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddComment
          asin={props.asin}
          handleCommentRefresh={handleCommentRefresh}
          formData={formData}
          setFormData={setFormData}
        />
        <CommentList
          comments={commentsList}
          handleCommentRefresh={handleCommentRefresh}
          setFormData={setFormData}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="dark">Close</Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}

export default CommentArea;
