import { Button, Form } from "react-bootstrap";
import Rating from "react-rating-stars-component";
import styles from "./addComment.module.css"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { allFormData, handleFormData, handleCommentRefresh } from "../../Reducers/comments/commentsSlice";

const AddComment = ({ asin }) => {
  const formData = useSelector(allFormData)
  const dispatch = useDispatch()

  const handleInputChange = (e) => {
    dispatch(handleFormData({type: "editInput", value: e.target.value}))
  };

  const handleRatingChange = (newRating) => {
    dispatch(handleFormData({type: "editRating", value: newRating}))
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    await axios.put(
      `https://striveschool-api.herokuapp.com/api/comments/${formData.commentId}`,
      {
        comment: formData.inputValue,
        rate: formData.rating,
      },
      {
        headers: {
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFmOWU5YmJkNWQxMjAwMTg5MGQ0NjQiLCJpYXQiOjE3MDgwOTU5MjEsImV4cCI6MTcwOTMwNTUyMX0.uUoRJ9TIYLG9g18h_sNUuZ0dnv9hqZIVH6jD_kpZhFs",
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(handleCommentRefresh())
  };

  const handleForm = async (e) => {
    e.preventDefault();
    await axios.post(
      "https://striveschool-api.herokuapp.com/api/comments/",
      {
        comment: formData.inputValue,
        rate: formData.rating,
        elementId: asin,
      },
      {
        headers: {
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFmOWU5YmJkNWQxMjAwMTg5MGQ0NjQiLCJpYXQiOjE3MDgwOTU5MjEsImV4cCI6MTcwOTMwNTUyMX0.uUoRJ9TIYLG9g18h_sNUuZ0dnv9hqZIVH6jD_kpZhFs",
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(handleCommentRefresh())
  };

  return (
    <>
      <Form onSubmit={formData.isEditing ? handleEdit : handleForm}>
        <input
          type="text"
          className={`form-control mt-4 mx-auto ${styles.input_area}`}
          placeholder="Add a comment here"
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
        <Button type="submit" variant="dark">Submit</Button>
      </Form>
    </>
  );
};

export default AddComment;
