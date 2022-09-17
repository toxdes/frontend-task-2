import { delay, randInt } from "./utils";
import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";
import { Profile, Comment, Post } from "./types";

const DEFAULT_COMMENT_COUNT = 10;
const IMAGE_WIDTH = 400;
const ASPECT_RATIO = 4 / 5;
const IMAGE_HEIGHT = IMAGE_WIDTH * ASPECT_RATIO;

export const getProfile = async (): Promise<Profile> => {
  await delay();
  return {
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
  };
};

export const getComment = async (): Promise<Comment> => {
  return {
    id: randomUUID(),
    author: faker.internet.userName(),
    comment: faker.lorem.sentences(randInt(3)),
    createdAt: new Date().toUTCString(),
    updatedAt: new Date().toUTCString(),
    isLiked: Math.random() < 0.5,
  };
};

export const getPost = async (): Promise<Post> => {
  const postLikedBy: string[] = Array.from({ length: randInt(10) }).map((_) =>
    faker.internet.userName()
  );

  const commentsCount: number = Number(faker.random.numeric(randInt(3)));
  const initialComments: Comment[] = await getComments(DEFAULT_COMMENT_COUNT);

  return {
    id: randomUUID(),
    author: faker.internet.userName(),
    commentsCount,
    comments: initialComments,
    isLiked: Math.random() < 0.5,
    image: faker.image.animals(IMAGE_WIDTH, IMAGE_HEIGHT),
    content: faker.lorem.sentences(randInt(5)),
    likedBy: postLikedBy,
    likedCount: Number(faker.random.numeric(randInt(4))),
  };
};

export const getPosts = async (n: number): Promise<Post[]> => {
  await delay();
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
