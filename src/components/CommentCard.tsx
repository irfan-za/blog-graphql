import { Comment } from "../types";

export default function CommentCard({ comment }: { comment: Comment }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-300">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-gray-600 font-semibold text-lg">
            {comment.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-gray-800">
            {comment.name}
          </h4>
          <p className="text-xs text-gray-500">{comment.email}</p>
        </div>
      </div>
      <p className="text-gray-700 text-sm mt-2">{comment.body}</p>
    </div>
  );
}
