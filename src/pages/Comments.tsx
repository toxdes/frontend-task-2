import { useEffect, useState, ChangeEvent, createRef, FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { addComment, getCommentsByPostId } from "../api";
import { Comment as TComment } from "../api/types";
import SingleComment from "../components/SingleComment";
import "./Comments.style.css";
import { Button, Text, Input } from "../elements";
import { useLoader } from "../hooks";

interface CommentProps {}

export default function Comments(_: CommentProps) {
  const { postId } = useParams();
  const inputRef = createRef<HTMLInputElement>();
  const [comments, setComments] = useState<TComment[] | null>(null);
  const [newCommentText, setNewCommentText] = useState<string>("");
  const commentsLoader = useLoader();

  const onAddComment = async () => {
    if (!postId) return;
    const newComments = await addComment(postId, "AwesomeUser", newCommentText);
    console.log("ON ADD COMMENT");
    setComments(newComments);
    setNewCommentText("");
  };

  const onFormSubmit = async (e: FormEvent) => {
    if (!postId) return;
    e.preventDefault();
    console.log("ON FORM SUBMIT");
    const newComments = await addComment(postId, "AwesomeUser", newCommentText);
    setComments(newComments);
    setNewCommentText("");
  };

  const onCommentTextChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setNewCommentText(e.target.value);
  };

  useEffect(() => {
    const fetchComments = async () => {
      if (!postId) return;
      commentsLoader.set(true);
      const comments = await getCommentsByPostId(postId);
      setComments(comments);
      commentsLoader.set(false);
    };
    fetchComments();
    inputRef.current?.focus();
  }, []);

  return (
    <div className="comments-page">
      <Text size="xl" className="header">
        Comments
      </Text>
      <Link to={`/post/${postId}`}>Back to post</Link>
      <div className="comments-container">
        {comments?.map((comment) => (
          <SingleComment data={comment} key={comment.id} />
        ))}
      </div>
      {commentsLoader.isLoading && <Text>Loading...</Text>}
      <form className="input-container" onSubmit={onFormSubmit}>
        <Input
          value={newCommentText}
          className="comment-input"
          type="text"
          ref={inputRef}
          placeholder="Comment..."
          onChange={onCommentTextChange}
        />
        <Button
          type="primary"
          onClick={onAddComment}
          value="Post"
          className="post-button"
        />
      </form>
    </div>
  );
}
