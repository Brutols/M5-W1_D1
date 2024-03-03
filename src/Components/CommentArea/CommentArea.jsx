import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";
import CommentList from "../CommentList/CommentList";
import AddComment from "../AddComment/AddComment";
import ErrorModal from "../ErrorModal/ErrorModal";
import { useDispatch, useSelector } from "react-redux";
import {
  allComments,
  getComments,
  isAllCommentsError,
  isCommentRefreshed,
} from "../../Reducers/comments/commentsSlice";
import { isDarkModeActive } from "../../Reducers/darkMode/darkModeSlice";
import styles from "./commentArea.module.css";

function CommentArea(props) {
  const commentsList = useSelector(allComments);
  const commentRefresh = useSelector(isCommentRefreshed);
  const error = useSelector(isAllCommentsError);
  const isDarkMode = useSelector(isDarkModeActive);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComments(props.asin));
  }, [commentRefresh, dispatch, props.asin]);

  return (
    <>
      {error ? <ErrorModal text={error} /> : ""}
      <Modal
        data-testid="comment-modal"
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className={isDarkMode ? styles.modal_dark : ""}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddComment asin={props.asin} />
          <CommentList comments={commentsList} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            data-testid="close-btn"
            onClick={props.onHide}
            variant={`${isDarkMode ? "light" : "dark"}`}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CommentArea;
