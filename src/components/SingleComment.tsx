import { Comment as TComment } from "../api/types";
import { Text, Button } from "../elements";
import { timeSince } from "../utils";

interface SingleCommentProps {
  data: TComment;
}
export default function SingleComment({ data }: SingleCommentProps) {
  return (
    <div className="single-comment-container">
      <div className="author">
        <img src={data.author.avatar} alt="avatar" />
      </div>
      <div className="content">
        <div className="row1">
          <Text className="username">{data.author.username}</Text>
          <Text className="comment-content">{data.comment}</Text>
        </div>
        <div className="row2">
          <Text>{timeSince(new Date(data.createdAt))}</Text>
          <Button
            type="ghost"
            value="Reply"
            className="reply-button"
            onClick={() => {
              alert("reply");
            }}
          ></Button>
        </div>
      </div>
    </div>
  );
}
