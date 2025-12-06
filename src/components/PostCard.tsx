import { Link } from "react-router-dom";
import { Post } from "../types";
import { User } from "lucide-react";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link
      key={post.id}
      to={`/post/${post.id}`}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
    >
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-emerald-600 transition-colors duration-200 line-clamp-2">
          {post.title}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.body}</p>
        <div className="flex items-center text-sm text-gray-500">
          <User className="w-5 h-5 mr-2 p-0.5 bg-gray-200 rounded-full" />
          <span className="font-medium">{post.user.name}</span>
        </div>
      </div>
    </Link>
  );
}
