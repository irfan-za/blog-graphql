import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostsListPage from "./pages/PostsListPage";
import PostDetailPage from "./pages/PostDetailPage";
import CreatePostPage from "./pages/CreatePostPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<PostsListPage />} />
          <Route path="/post/:id" element={<PostDetailPage />} />
          <Route path="/create" element={<CreatePostPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
