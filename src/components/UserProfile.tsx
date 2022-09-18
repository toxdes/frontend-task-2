import { useCallback } from "react";
import { Profile as TProfile } from "../api/types";
import { Text, Button } from "../elements";
import { MdVerified } from "react-icons/md";
import "./UserProfile.style.css";
import { formatCount } from "../utils";

interface UserProfileProps {
  data: TProfile | null;
  isLoading: boolean;
}

export default function UserProfile({ data, isLoading }: UserProfileProps) {
  const onFollow = useCallback(() => {
    alert("follow");
  }, []);

  const onCall = useCallback(() => {
    alert("call");
  }, []);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (data === null) return null;

  return (
    <div className="user-profile">
      <div className="row1">
        <img src={data.avatar} alt={"avatar"} />
        <div className="right">
          <div className="counts">
            <div className="counts-item">
              <Text className="num" size="xl">
                {formatCount(data.postsCount)}
              </Text>
              <Text className="label">posts</Text>
            </div>
            <div className="counts-item">
              <Text className="num" size="xl">
                {formatCount(data.followersCount)}
              </Text>
              <Text className="label">followers</Text>
            </div>
            <div className="counts-item">
              <Text className="num" size="xl">
                {formatCount(data.followingCount)}
              </Text>
              <Text className="label">following</Text>
            </div>
          </div>
          <Button type="primary" value="follow" onClick={onFollow} />
        </div>
      </div>
      <div className="row2">
        <div className="username-container">
          <Text className="username" size="xl">
            {data.username}
          </Text>{" "}
          {true && <MdVerified className="verified-icon" />}
        </div>
        <Text className="bio">{data.bio}</Text>
        <a
          href={
            data.website.startsWith("http")
              ? data.website
              : `https://${data.website}`
          }
          target="_blank"
          rel="noreferrer"
          className="link"
        >
          {data.website}
        </a>
      </div>
      <div className="row3">
        <Button type="ghost" value="Call" onClick={onCall}></Button>
      </div>
    </div>
  );
}
