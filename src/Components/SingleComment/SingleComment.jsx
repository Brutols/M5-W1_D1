import { useState } from "react";
import { IoStar } from "react-icons/io5";
import { IoStarOutline } from "react-icons/io5";
import { IoTrashSharp } from "react-icons/io5";
import { IoCreateSharp } from "react-icons/io5";
import axios from "axios";

const SingleComment = ({
  text,
  rating,
  id,
  user,
  handleCommentRefresh,
  setFormData,
}) => {
  const [loggedUser, setLoggedUser] = useState("dtwo97@gmail.com");

  const stars = Array.from({ length: 5 }, (_, index) =>
    index < rating ? <IoStar key={index} /> : <IoStarOutline key={index} />
  );

  const handleEdit = async (e) => {
    e.preventDefault();
    setFormData({
      rating: rating,
      inputValue: text,
      isEditing: true,
      commentId: id,
    });
  };

  const deleteComment = async (e) => {
    e.preventDefault();
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
    handleCommentRefresh();
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center px-5">
        <div>
          <p className="mx-0 mt-3 mb-0">{text}</p>
          <div>{stars}</div>
        </div>
        {loggedUser === user ? (
          <div className="d-flex gap-1">
            <IoCreateSharp onClick={handleEdit} />
            <IoTrashSharp onClick={deleteComment} />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default SingleComment;
