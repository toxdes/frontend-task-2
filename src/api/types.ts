export interface Profile {
  id: string;
  username: string;
  avatar: string;
  bio: string;
  website: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  isSelf: boolean;
  isFollowing: boolean;
}

export interface Post {
  id: string;
  author: string;
  commentsCount: number;
  comments: Comment[];
  isLiked: boolean;
  image: string;
  content: string;
  likedBy: string[];
  likedCount: number;
}

export interface Comment {
  id: string;
  author: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  isLiked: boolean;
}
