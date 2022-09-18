import { Text } from "../elements";
import { Comment as TComment } from "../api/types";
import "./Comments.style.css";

interface CommentsProps {
  data: TComment[];
}
export default function Comments({ data }: CommentsProps) {
  return (
    <div className="comments-container">
      {data?.map((comment) => (
        <div className="comment" key={comment.id}>
          {" "}
          <Text className="username">{comment.author.username}</Text>{" "}
          <Text className="comment">
            {comment.comment.length > 40
              ? comment.comment.substring(0, 40) + "..."
              : comment.comment}
          </Text>
        </div>
      ))}
    </div>
  );
}
