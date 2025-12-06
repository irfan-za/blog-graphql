import { useSearchParams } from "react-router-dom";
import { Post, PostsPage } from "../types";
import { useQuery } from "@apollo/client/react";
import { GET_POSTS } from "../graphql/queries";
import PostSkeleton from "../components/post/PostSkeleton";
import ErrorCard from "../components/ErrorCard";
import PostPagination from "../components/post/PostPagination";
import PostCard from "../components/post/PostCard";
import Header from "../components/Header";

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
      <Header />
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <PostSkeleton key={index} />
          ))}
        </div>
      )}
      {error && <ErrorCard error={error} />}
      {!loading &&
        !error &&
        (posts.length === 0 ? (
          <p className="text-gray-500 text-lg text-center">No posts found</p>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {posts.map((post) => (
                <PostCard post={post} key={post.id} />
              ))}
            </div>

            <PostPagination
              currentPage={currentPage}
              totalPages={totalPages}
              limit={limit}
              totalCount={totalCount}
              postsCount={posts.length}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onLimitChange={handleLimitChange}
            />
          </div>
        ))}
    </div>
  );
}
