import { useCallback, useEffect, useRef, useState } from "react";
import ErrorCard from "../components/ErrorCard";
import PostSkeleton from "../components/post/PostSkeleton";
import Header from "../components/Header";
import PostCard from "../components/post/PostCard";
import { Post, PostsPage } from "../types";
import { useQuery } from "@apollo/client/react";
import { GET_POSTS } from "../graphql/queries";

export default function PostListInfinitePage() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const observerTarget = useRef<HTMLDivElement>(null);

  const { loading, error, data, fetchMore } = useQuery<PostsPage>(GET_POSTS, {
    variables: {
      options: {
        paginate: {
          page: 1,
          limit,
        },
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const posts: Post[] = data?.posts.data || [];
  const totalCount = data?.posts.meta.totalCount || 0;
  const hasMore = posts.length < totalCount;

  const loadMore = useCallback(async () => {
    if (!hasMore || loading) return;

    const nextPage = page + 1;
    await fetchMore({
      variables: {
        options: {
          paginate: {
            page: nextPage,
            limit,
          },
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return {
          posts: {
            ...fetchMoreResult.posts,
            data: [...prev.posts.data, ...fetchMoreResult.posts.data],
          },
        };
      },
    });
    setPage(nextPage);
  }, [hasMore, loading, page, fetchMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loading, page, loadMore]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      {loading && page === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <PostSkeleton key={index} />
          ))}
        </div>
      )}
      {error && <ErrorCard error={error} />}
      {!loading || page > 1 ? (
        posts.length === 0 ? (
          <p className="text-gray-500 text-lg text-center">No posts found</p>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {posts.map((post) => (
                <PostCard post={post} key={post.id} />
              ))}
            </div>

            {/* Intersection Observer Target */}
            <div ref={observerTarget} className="py-8">
              {loading && page > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[...Array(4)].map((_, index) => (
                    <PostSkeleton key={`loading-${index}`} />
                  ))}
                </div>
              )}
              {!hasMore && posts.length > 0 && (
                <p className="text-center text-gray-500 font-medium">
                  No more posts to load
                </p>
              )}
            </div>
          </div>
        )
      ) : null}
    </div>
  );
}
