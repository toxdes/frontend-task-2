import { Post as TPost } from "../api/types";
import { Text } from "../elements";
import PostTile from "./PostTile";

import "./PostsTiles.style.css";

interface PostsTilesProps {
  data: TPost[] | null;
  isLoading: boolean;
  onChoosePost: (id: string) => void;
}

export default function PostsTiles({
  data,
  isLoading,
  onChoosePost,
}: PostsTilesProps) {
  if (data === null) return null;

  return (
    <div className="post-tiles-root">
      <div className="post-tiles">
        {data.map((post) => (
          <PostTile key={post.id} data={post} onClick={onChoosePost} />
        ))}
      </div>
      {isLoading && <Text className="loading">Loading...</Text>}
    </div>
  );
}
