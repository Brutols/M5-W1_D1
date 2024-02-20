import SingleComment from "../SingleComment/SingleComment";
import { nanoid } from "nanoid";
import styles from "./commentList.module.css";
import { useSelector } from "react-redux";
import { allComments } from "../../Reducers/comments/commentsSlice";

const CommentList = () => {
const comments = useSelector(allComments)
console.log(comments);

  return (
    <div className={styles.commentWrapper}>
      {comments.map((comment) => {
        return (
          <SingleComment
            key={nanoid()}
            text={comment.comment}
            rating={comment.rate}
            id={comment._id}
            user={comment.author}
          />
        );
      })}
    </div>
  );
};

export default CommentList;
