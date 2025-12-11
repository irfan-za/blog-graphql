import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostsListPage from "./pages/PostsListPage";
import PostDetailPage from "./pages/PostDetailPage";
import CreatePostPage from "./pages/CreatePostPage";
import "./App.css";
import { Toaster } from "sonner";
import EditPostPage from "./pages/EditPostPage";
import PostListInfinitePage from "./pages/PostListInfinitePage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<PostsListPage />} />
          <Route path="/infinite-scroll" element={<PostListInfinitePage />} />
          <Route path="/post/:id" element={<PostDetailPage />} />
          <Route path="/edit/:id" element={<EditPostPage />} />
          <Route path="/create" element={<CreatePostPage />} />
        </Routes>
      </div>
      <Toaster richColors />
    </Router>
  );
}

export default App;
