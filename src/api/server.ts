import { delay, randInt } from "./utils";
import { faker } from "@faker-js/faker";
import { v4 as randomUUID } from "uuid";
import { Profile, Comment, Post } from "./types";

const DEFAULT_COMMENT_COUNT = 10;
const IMAGE_WIDTH = 500;
const ASPECT_RATIO = 4 / 5;
const IMAGE_HEIGHT = IMAGE_WIDTH * ASPECT_RATIO;
const postsCache: { [key: string]: Post } = {};
const commentsCache: { [key: string]: Comment } = {};
const profileCache: { [key: string]: Profile } = {};
let me: Profile | undefined;
export const getProfile = async (): Promise<Profile> => {
  await delay();
  const profile: Profile = {
    id: randomUUID(),
    username: faker.internet.userName(),
    avatar: faker.internet.avatar(),
    bio: faker.lorem.sentences(2),
    website: faker.internet.domainName(),
    postsCount: Number(faker.random.numeric(4, { allowLeadingZeros: false })),
    followersCount: Number(
      faker.random.numeric(6, { allowLeadingZeros: false })
    ),
    followingCount: Number(
      faker.random.numeric(3, { allowLeadingZeros: false })
    ),
    isSelf: Math.random() < 0.5,
    isFollowing: Math.random() < 0.5,
    isVerified: Math.random() < 0.7,
  };
  profileCache[profile.id] = profile;
  return profile;
};

export const getComment = async (): Promise<Comment> => {
  const author = await getProfile();
  const comment: Comment = {
    id: randomUUID(),
    author,
    comment: faker.lorem.sentences(randInt(3)),
    createdAt: new Date(
      new Date().getTime() - randInt(200) * 1e6
    ).toUTCString(),
    updatedAt: new Date().toUTCString(),
    isLiked: Math.random() < 0.5,
  };
  commentsCache[comment.id] = comment;
  return comment;
};

export const getPost = async (): Promise<Post> => {
  let postLikedBy: string[] = Array.from({ length: randInt(10) }).map((_) =>
    faker.internet.userName()
  );
  const isLiked = Math.random() < 0.5;
  if (isLiked) postLikedBy = [me?.username || "bruh", ...postLikedBy];
  const author = await getProfile();
  const commentsCount: number = Number(faker.random.numeric(randInt(3)));
  const initialComments: Comment[] = await getComments(DEFAULT_COMMENT_COUNT);

  const post: Post = {
    id: randomUUID(),
    author,
    commentsCount,
    comments: initialComments,
    isLiked: isLiked,
    image: faker.image.animals(IMAGE_WIDTH, IMAGE_HEIGHT, true),
    content: faker.lorem.sentences(randInt(12)),
    likedBy: postLikedBy,
    likedCount: Number(faker.random.numeric(randInt(4))),
  };
  postsCache[post.id] = post;
  return post;
};

export const getPostById = async (id: string): Promise<Post> => {
  return postsCache[id];
};

export const getCommentById = async (id: string): Promise<Comment> => {
  return commentsCache[id];
};

export const likePost = async (
  id: string,
  likedByUsername: string
): Promise<Post> => {
  if (postsCache[id].isLiked) {
    postsCache[id].isLiked = false;
    postsCache[id].likedCount--;
    postsCache[id].likedBy = postsCache[id].likedBy.slice(1);
  } else {
    postsCache[id].isLiked = true;
    postsCache[id].likedCount++;
    postsCache[id].likedBy = [
      me?.username || likedByUsername,
      ...postsCache[id].likedBy,
    ];
  }
  return postsCache[id];
};

export const addComment = async (
  postId: string,
  authorUsername: string,
  comment: string
): Promise<Comment[]> => {
  const newComment = await getComment();
  newComment.comment = comment;
  if (!me) {
    me = await getProfile();
    me.username = "AwesomeUser";
  }
  newComment.author = me;
  newComment.createdAt = new Date().toUTCString();
  postsCache[postId].comments = [newComment, ...postsCache[postId].comments];
  commentsCache[newComment.id] = newComment;
  postsCache[postId].commentsCount++;
  return postsCache[postId].comments;
};

export const followUser = async (profileId: string): Promise<Profile> => {
  profileCache[profileId].isFollowing = !profileCache[profileId].isFollowing;
  return profileCache[profileId];
};

export const getPosts = async (n: number): Promise<Post[]> => {
  await delay();

  if (!me) {
    me = await getProfile();
    me.username = "AwesomeUser";
  }
  return await Promise.all(
    Array.from({ length: n }).map(async (_): Promise<Post> => {
      return await getPost();
    })
  );
};

export const getComments = async (n: number): Promise<Comment[]> => {
  return await Promise.all(
    Array.from({ length: n }).map(async (_): Promise<Comment> => {
      return await getComment();
    })
  );
};

export const getCommentsByPostId = async (
  postId: string
): Promise<Comment[]> => {
  return postsCache[postId].comments;
};
