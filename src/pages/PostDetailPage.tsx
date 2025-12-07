import { useQuery, useMutation } from "@apollo/client/react";
import { useParams, useNavigate } from "react-router-dom";
import { GET_POST, GET_POSTS } from "../graphql/queries";
import { DELETE_POST } from "../graphql/mutation";
import { PostPage, PostsPage } from "../types";
import PostSkeleton from "../components/post/PostSkeleton";
import ErrorCard from "../components/ErrorCard";
import PostNotFound from "../components/post/PostNotFound";
import CommentCard from "../components/CommentCard";
import Header from "../components/Header";
import ConfirmDeletePost from "../components/post/ConfirmDeletePost";
import { useState } from "react";
import { toast } from "sonner";

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { loading, error, data } = useQuery<PostPage>(GET_POST, {
    variables: { id },
  });

  const [deletePost, { loading: deleteLoading }] = useMutation(DELETE_POST, {
    update(cache, { data }) {
      if (!data || !id) return;

      const existingPosts = cache.readQuery<PostsPage>({
        query: GET_POSTS,
        variables: {
          options: {
            paginate: {
              page: 1,
              limit: 10,
            },
          },
        },
      });

      if (existingPosts) {
        cache.writeQuery({
          query: GET_POSTS,
          variables: {
            options: {
              paginate: {
                page: 1,
                limit: 10,
              },
            },
          },
          data: {
            posts: {
              ...existingPosts.posts,
              data: existingPosts.posts.data.filter((post) => post.id !== id),
              meta: {
                ...existingPosts.posts.meta,
                totalCount: existingPosts.posts.meta.totalCount - 1,
              },
            },
          },
        });
      }
    },
    onCompleted: () => {
      navigate("/");
      toast.success("Post deleted successfully.");
    },
    onError: (error) => {
      toast.error(`Failed to delete post`, {
        description: error.message,
      });
      setShowDeleteDialog(false);
    },
  });

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (id) {
      await deletePost({ variables: { id } });
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
  };

  const post = data?.post;
  const isPostFound = post && post.id !== null;

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <Header id={id} onDeleteClick={handleDeleteClick} />
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

      <ConfirmDeletePost
        postTitle={post?.title || ""}
        isOpen={showDeleteDialog}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isDeleting={deleteLoading}
      />
    </div>
  );
}
