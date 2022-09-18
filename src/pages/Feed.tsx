import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Feed() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/profile/a");
  });
  return null;
}
