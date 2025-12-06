import { Link, useSearchParams } from "react-router-dom";
import { Post, PostsPage } from "../types";
import { useQuery } from "@apollo/client/react";
import { GET_POSTS } from "../graphql/queries";
import PostSkeleton from "../components/PostSkeleton";

export default function PostsListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const { loading, error, data, refetch } = useQuery<PostsPage>(GET_POSTS, {
    variables: {
      options: {
        paginate: {
          page: currentPage,
          limit: limit,
        },
      },
    },
  });
  const posts: Post[] = data?.posts.data || [];
  const totalCount = data?.posts.meta.totalCount || 0;
  const totalPages = Math.ceil(totalCount / limit);
  const handlePrevious = async () => {
    if (currentPage > 1) {
      const nextPage = currentPage - 1;
      setSearchParams({ page: String(nextPage), limit: String(limit) });
      await refetch({
        options: { paginate: { page: nextPage, limit: limit } },
      });
    }
  };

  const handleNext = async () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setSearchParams({ page: String(nextPage), limit: String(limit) });
      await refetch({
        options: { paginate: { page: nextPage, limit: limit } },
      });
    }
  };

  const handleLimitChange = async (newLimit: number) => {
    setSearchParams({ page: "1", limit: String(newLimit) });
    await refetch({
      options: { paginate: { page: 1, limit: newLimit } },
    });
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Blog Posts</h1>
        <Link
          to="/create"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Create New Post
        </Link>
      </div>
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <PostSkeleton key={index} />
          ))}
        </div>
      )}
      {error && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center mb-4">
              <h3 className="text-lg font-semibold text-red-800">
                Error Loading Posts
              </h3>
            </div>
            <p className="text-red-600 mb-4">{error.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 w-full"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
      {!loading &&
        !error &&
        (posts.length === 0 ? (
          <p className="text-gray-500 text-lg text-center">No posts found</p>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/post/${post.id}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
                >
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-emerald-600 transition-colors duration-200 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.body}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <img
                        src="/user-icon.svg"
                        alt="User Icon"
                        className="w-5 h-5 mr-2 p-0.5 bg-gray-200 rounded-full"
                      />
                      <span className="font-medium">{post.user.name}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center gap-2">
                <label
                  htmlFor="limit"
                  className="text-sm font-medium text-gray-700"
                >
                  Posts per page:
                </label>
                <select
                  id="limit"
                  value={limit}
                  onChange={(e) => handleLimitChange(Number(e.target.value))}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent "
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-medium text-gray-700  border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-sm font-medium text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNext}
                  disabled={currentPage >= totalPages}
                  className="px-4 py-2 text-sm font-medium text-gray-700  border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                >
                  Next
                </button>
              </div>

              <div className="text-sm text-gray-600">
                Showing {posts.length === 0 ? 0 : (currentPage - 1) * limit + 1}{" "}
                - {Math.min(currentPage * limit, totalCount)} of {totalCount}{" "}
                posts
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
