import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserProfile from "../components/UserProfile";
import PostsTiles from "../components/PostsTiles";
import { getPosts, getProfile } from "../api";
import { Profile as TProfile, Post as TPost } from "../api/types";
import { useLoader } from "../hooks";

interface ProfilePageProps {}

export default function ProfilePage(_: ProfilePageProps) {
  const { username } = useParams();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<TProfile | null>(null);
  const [postsData, setPostsData] = useState<TPost[] | null>(null);
  const profileLoader = useLoader();
  const postsLoader = useLoader();
  const POSTS_PER_REQUEST = 18;

  const onChoosePost = useCallback(
    (id: string) => {
      navigate(`/post/${id}`);
    },
    [navigate]
  );

  const onEndReached = useCallback(() => {
    console.log("ON END REACHED CALLED");
    const fetchMorePosts = async () => {
      if (postsLoader.isLoading) return;
      postsLoader.set(true);
      const newPosts = await getPosts(POSTS_PER_REQUEST);
      if (postsData !== null) setPostsData(postsData.concat(newPosts));
      postsLoader.set(false);
    };
    fetchMorePosts();
  }, [postsData, postsLoader]);

  const onScroll = useCallback(
    (e: React.UIEvent<HTMLElement>) => {
      // stolen from https://stackoverflow.com/questions/45585542/detecting-when-user-scrolls-to-bottom-of-div-with-react-js
      // in order to detect onEndReached
      const target = e.target as HTMLDivElement;
      const isBottom =
        target.scrollHeight - target.scrollTop === target.clientHeight;
      if (isBottom) {
        onEndReached();
      }
    },
    [onEndReached]
  );
  console.log("RENDERING PROFILE PAGE");

  useEffect(() => {
    const fetchProfileData = async () => {
      profileLoader.set(true);
      const profileData = await getProfile();
      setProfileData(profileData);
      profileLoader.set(false);
    };

    const fetchPosts = async () => {
      postsLoader.set(true);
      let postsData = await getPosts(POSTS_PER_REQUEST);
      setPostsData(postsData);
      postsLoader.set(false);
    };

    fetchProfileData();
    fetchPosts();
  }, []);

  return (
    <div className="root" onScroll={onScroll}>
      <UserProfile data={profileData} isLoading={profileLoader.isLoading} />
      <PostsTiles
        data={postsData}
        isLoading={postsLoader.isLoading}
        onChoosePost={onChoosePost}
      />
    </div>
  );
}
