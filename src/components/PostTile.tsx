import { useCallback } from "react";
import { Post as TPost } from "../api/types";

interface PostTileProps {
  data: TPost;
  onClick: (id: string) => void;
}
export default function PostTile({ data, onClick }: PostTileProps) {
  const handleClick = useCallback(() => {
    onClick(data.id);
  }, [data, onClick]);
  return (
    <div className="tile" onClick={handleClick}>
      <img src={data.image} alt="post-content" />
    </div>
  );
}
