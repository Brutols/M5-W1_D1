import { useState } from "react";
import { IoStar } from "react-icons/io5";
import { IoStarOutline } from "react-icons/io5";
import { IoTrashSharp } from "react-icons/io5";
import { IoCreateSharp } from "react-icons/io5";
import styles from "./singleComment.module.css";
import ErrorModal from "../ErrorModal/ErrorModal";
import { useDispatch, useSelector } from "react-redux";
import {
  handleFormData,
} from "../../Reducers/comments/commentsSlice";
import { isDarkModeActive } from "../../Reducers/darkMode/darkModeSlice";

const SingleComment = ({ text, rating, id, user }) => {
  const [loggedUser, setLoggedUser] = useState("dtwo97@gmail.com");
  const [checkDelete, setCheckDelete] = useState(false);
  const isDarkMode = useSelector(isDarkModeActive);
  const dispatch = useDispatch();

  const formData = {
    rating: rating,
    inputValue: text,
    isEditing: true,
    commentId: id,
  };

  const stars = Array.from({ length: 5 }, (_, index) =>
    index < rating ? (
      <IoStar key={index} className={styles.stars} />
    ) : (
      <IoStarOutline key={index} className={styles.stars} />
    )
  );

  const handleEdit = async (e) => {
    e.preventDefault();
    dispatch(handleFormData({ type: "replace", value: formData }));
  };

  const handleCheckDelete = () => {
    setCheckDelete(true);
  };

  return (
    <>
      <div
        data-testid="single_comment"
        className={`d-flex justify-content-between align-items-center my-3 p-2 mx-5 ${
          isDarkMode ? styles.comment_element_dark : styles.comment_element
        }`}
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
        <ErrorModal
          id={id}
          isDeleting={true}
          setCheckDelete={setCheckDelete}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default SingleComment;
