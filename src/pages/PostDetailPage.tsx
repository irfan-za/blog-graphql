import { useQuery } from "@apollo/client/react";
import { useParams, Link } from "react-router-dom";
import { GET_POST } from "../graphql/queries";
import { PostPage } from "../types";
import PostSkeleton from "../components/PostSkeleton";
import ErrorCard from "../components/ErrorCard";
import PostNotFound from "../components/PostNotFound";
import CommentCard from "../components/CommentCard";
import { ArrowLeft } from "lucide-react";

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { loading, error, data } = useQuery<PostPage>(GET_POST, {
    variables: { id },
  });
  const post = data?.post;
  const isPostFound = post && post.id !== null;

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="pb-8 flex justify-between">
        <Link
          to="/"
          className="px-4 py-2 inline-flex items-center text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to posts
        </Link>
        <Link
          to="/create"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Create New Post
        </Link>
      </div>
      {loading && (
        <div className="flex flex-col space-y-6">
          {[...Array(2)].map((_, index) => (
            <PostSkeleton key={index} />
          ))}
        </div>
      )}
      {error && <ErrorCard error={error} />}

      {!loading &&
        !error &&
        (isPostFound ? (
          <div className="space-y-6">
            <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
              <h1 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                {post.title}
              </h1>

              <div className="py-4 border-b border-gray-300">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 font-semibold text-lg">
                      {post.user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {post.user.name}
                    </h3>
                    <p className="text-sm text-gray-600">{post.user.email}</p>
                  </div>
                </div>
              </div>

              <div className="py-6">
                <p className="text-gray-700 leading-relaxed">{post.body}</p>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Comments ({post.comments.data.length})
              </h3>

              <div className="py-6">
                {post.comments.data.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No comments yet.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {post.comments.data.map((comment) => (
                      <CommentCard key={comment.id} comment={comment} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <PostNotFound />
        ))}
    </div>
  );
}
