import SingleComment from "../SingleComment/SingleComment";
import styles from "./commentList.module.css";
import { useSelector } from "react-redux";
import { allComments } from "../../Reducers/comments/commentsSlice";

const CommentList = ({isDetails}) => {
const comments = useSelector(allComments)

  return (
    <div className={!isDetails ? styles.commentWrapper : ""}>
      {comments.map((comment, i) => {
        return (
          <SingleComment
            key={i}
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
