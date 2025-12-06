import { CircleAlert } from "lucide-react";
import { Link } from "react-router-dom";

export default function PostNotFound() {
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="flex items-center justify-center mb-4">
          <CircleAlert className="w-12 h-12 text-red-500" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Post Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          We couldn't find the post you're looking for.
        </p>

        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
        >
          Back to posts
        </Link>
      </div>
    </div>
  );
}
