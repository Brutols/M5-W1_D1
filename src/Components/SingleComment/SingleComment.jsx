import { useState } from "react";
import { IoStar } from "react-icons/io5";
import { IoStarOutline } from "react-icons/io5";
import { IoTrashSharp } from "react-icons/io5";
import { IoCreateSharp } from "react-icons/io5";
import styles from "./singleComment.module.css";
import axios from "axios";
import ErrorModal from "../ErrorModal/ErrorModal";
import { useDispatch } from "react-redux";
import { handleCommentRefresh, handleFormData } from "../../Reducers/comments/commentsSlice";

const SingleComment = ({
  text,
  rating,
  id,
  user,
}) => {
  const [loggedUser, setLoggedUser] = useState("dtwo97@gmail.com");
  const [checkDelete, setCheckDelete] = useState(false);
  const dispatch = useDispatch()

  const formData = {
    rating: rating,
    inputValue: text,
    isEditing: true,
    commentId: id,
  }

  const stars = Array.from({ length: 5 }, (_, index) =>
    index < rating ? (
      <IoStar key={index} className={styles.stars} />
    ) : (
      <IoStarOutline key={index} className={styles.stars} />
    )
  );

  const handleEdit = async (e) => {
    e.preventDefault();
    dispatch(handleFormData({type: "replace", value: formData}))
  };

  const handleCheckDelete = () => {
    setCheckDelete(true);
  };

  const deleteComment = async () => {
    await axios.delete(
      `https://striveschool-api.herokuapp.com/api/comments/${id}`,
      {
        headers: {
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFmOWU5YmJkNWQxMjAwMTg5MGQ0NjQiLCJpYXQiOjE3MDgwOTU5MjEsImV4cCI6MTcwOTMwNTUyMX0.uUoRJ9TIYLG9g18h_sNUuZ0dnv9hqZIVH6jD_kpZhFs",
        },
      }
    );
    setCheckDelete(false)
    dispatch(handleCommentRefresh())
  };

  return (
    <>
      <div
        className={` bg-dark d-flex justify-content-between align-items-center my-3 p-2 mx-5 ${styles.comment_element}`}
      >
        <div>
          <div>{stars}</div>
          <p className="mx-0 mb-0">{text}</p>
        </div>
        {loggedUser === user ? (
          <div className="d-flex gap-1">
            <IoCreateSharp
              onClick={handleEdit}
              className={styles.action_icons}
            />
            <IoTrashSharp
              onClick={handleCheckDelete}
              className={styles.action_icons}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      {checkDelete ? (
        <ErrorModal isDeleting={true} deleteFn={deleteComment} setCheckDelete={setCheckDelete}/>
      ) : (
        ""
      )}
    </>
  );
};

export default SingleComment;
