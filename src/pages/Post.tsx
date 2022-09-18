import { useState, useEffect, useCallback } from "react";
import { useLoader } from "../hooks";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Text, IconButton } from "../elements";
import { Post as TPost } from "../api/types";
import { getPostById, likePost } from "../api";
import { formatCount } from "../utils";
import Comments from "../components/Comments";

import "./Post.style.css";
import { flushSync } from "react-dom";
interface PostProps {}

export default function Post(_: PostProps) {
  const [post, setPost] = useState<TPost | null>(null);
  const [likesCount, setLikesCount] = useState<number>(0);
  const [likedBy, setLikedBy] = useState<string[]>([]);
  const postLoader = useLoader();
  const { postId } = useParams();
  const navigate = useNavigate();
  const onLike = async () => {
    if (!postId) return;
    const updatedPost = await likePost(postId, "AwesomeUser");
    setLikesCount(updatedPost.likedCount);
    setLikedBy(updatedPost.likedBy);
  };

  const onComment = async () => {
    if (!postId) return;
    navigate(`/post/${postId}/comments`);
  };

  const onShare = async () => {
    if (!postId) return;
    alert("Share Post");
  };

  const onBookmark = async () => {
    if (!postId) return;
    alert("Bookmark Post");
  };

  useEffect(() => {
    const fetchPost = async () => {
      postLoader.set(true);
      if (!postId) {
        postLoader.set(false);
        return;
      }
      const post = await getPostById(postId);
      setPost(post);
      setLikesCount(post.likedCount);
      setLikedBy(post.likedBy);
      postLoader.set(false);
    };
    fetchPost();
  }, [postId]);

  if (postLoader.isLoading) return <Text>Loading...</Text>;
  if (post === null) return null;

  return (
    <div className="post-page">
      <Link to="/profile/a">Go back to Profile</Link>
      <div className="profile-row">
        <img src={post.author.avatar} alt="avatar" />
        <Text className="username">{post.author.username}</Text>
      </div>
      <img src={post.image} className="content-image" alt="content" />
      <div className="actions">
        <IconButton
          type={post.isLiked ? "like-fill" : "like"}
          onClick={onLike}
          className="icbutton"
        />
        <IconButton type="comment" onClick={onComment} className="icbutton" />
        <IconButton type="share" onClick={onShare} className="icbutton" />
        <IconButton
          type="bookmark"
          onClick={onBookmark}
          className="icbutton bookmark"
        />
      </div>
      <Text className="likes-count">{likesCount} Likes</Text>
      <div className="liked-by">
        <Text>Liked by </Text>
        <Text className="users">
          {likedBy[0]}, {likedBy[1]}
        </Text>
        <Text>and </Text>
        <Text className="users"> {formatCount(likesCount - 2)} others</Text>
      </div>
      <div className="text-content">
        <Text>{post.content}</Text>
        <Text className="username">{post.author.username}</Text>
      </div>
      <Comments data={post.comments.slice(0, 4)} />
    </div>
  );
}
