import { useEffect, useState } from "react";
import SingleComment from "../SingleComment/SingleComment";
import { nanoid } from "nanoid";
import styles from "./commentList.module.css";

const CommentList = ({ comments, handleCommentRefresh, setFormData }) => {
  const [coms, setComs] = useState([]);

  useEffect(() => {
    setComs(comments);
  }, [comments]);

  return (
    <div className={styles.commentWrapper}>
      {coms.map((comment) => {
        return (
          <SingleComment
            key={nanoid()}
            text={comment.comment}
            rating={comment.rate}
            id={comment._id}
            user={comment.author}
            handleCommentRefresh={handleCommentRefresh}
            setFormData={setFormData}
          />
        );
      })}
    </div>
  );
};

export default CommentList;
