import { ArrowLeft, PenLine, Plus, Trash2 } from "lucide-react";
import { Link, useMatch, useParams } from "react-router-dom";

export default function Header() {
  const isPostsPage = useMatch({ path: "/", end: true });
  const { id } = useParams<{ id: string }>();

  if (isPostsPage) {
    return (
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Blog Posts
        </h1>
        <Link
          to="/create"
          className="flex items-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          <Plus className="w-4 h-4 mr-2" /> Create Post
        </Link>
      </div>
    );
  }
  return (
    <div className="flex justify-between items-center mb-8">
      <Link
        to="/"
        className="px-4 py-2 inline-flex items-center text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Link>
      <div className="flex justify-center items-center space-x-4">
        <button className="bg-red-500 rounded-md p-2">
          <Trash2 className="text-white" />
        </button>
        <Link
          to={`/post/${id}/edit`}
          className="flex items-center bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          <PenLine className="w-4 h-4 mr-2" />
          Edit Post
        </Link>
      </div>
    </div>
  );
}
