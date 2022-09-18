import { BrowserRouter, Route, Routes } from "react-router-dom";

import Profile from "./pages/Profile";
import Post from "./pages/Post";
import Comments from "./pages/Comments";

import Feed from "./pages/Feed";
import NotFound from "./pages/NotFound";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/post/:postId" element={<Post />} />
        <Route path="/post/:postId/comments" element={<Comments />} />
        <Route path="/" element={<Feed />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
