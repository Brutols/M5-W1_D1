import { Button, Form, Spinner } from "react-bootstrap";
import Rating from "react-rating-stars-component";
import styles from "./addComment.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  allFormData,
  handleFormData,
  isAllCommentsLoading,
  isAllCommentsError,
  handleError,
  postComment,
  editComment,
} from "../../Reducers/comments/commentsSlice";
import { isDarkModeActive } from "../../Reducers/darkMode/darkModeSlice";
import ErrorModal from "../ErrorModal/ErrorModal";

const AddComment = (props) => {
  const formData = useSelector(allFormData);
  const isDarkMode = useSelector(isDarkModeActive);
  const loading = useSelector(isAllCommentsLoading);
  const error = useSelector(isAllCommentsError);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    dispatch(handleFormData({ type: "editInput", value: e.target.value }));
  };

  const handleRatingChange = (newRating) => {
    dispatch(handleFormData({ type: "editRating", value: newRating }));
  };

  const handleSubmit = (e) => {
    if (formData.inputValue && formData.rating) {
      if (formData.isEditing) {
        e.preventDefault();
        dispatch(editComment({commentText: formData.inputValue, commentRate: formData.rating, commentId: formData.commentId}))
        dispatch(handleFormData({type: "reset"}))
      } else {
        e.preventDefault();
        dispatch(postComment({commentText: formData.inputValue, commentRate: formData.rating, commentId: props.asin}))
      }
    } else {
      e.preventDefault()
      dispatch(handleError({ value: "Ooops comment or rating is missing!" }));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          className={`form-control mt-4 mx-auto ${
            isDarkMode ? styles.input_area_dark : styles.input_area
          }`}
          placeholder="Add a comment here..."
          value={formData.inputValue}
          onChange={handleInputChange}
        />
        <Form.Group className="mb-3">
          <Rating
            count={5}
            onChange={handleRatingChange}
            size={24}
            activeColor="#ffd700"
            value={formData.rating}
          />
        </Form.Group>
        <Button type="submit" variant={`${isDarkMode ? "light" : "dark"}`}>
          {loading ? <Spinner normal="true" /> : "Submit"}
        </Button>
      </Form>
      {error ? <ErrorModal text={error} /> : ""}
    </>
  );
};

export default AddComment;
