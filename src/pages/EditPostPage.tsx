import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client/react";
import { UPDATE_POST } from "../graphql/mutation";
import { GET_POST, GET_USERS } from "../graphql/queries";
import { toast } from "sonner";
import PostForm from "../components/post/PostForm";
import { PostInput, PostPage, PostData, UsersPage, User } from "../types";
import PostSkeleton from "../components/post/PostSkeleton";
import ErrorCard from "../components/ErrorCard";
import PostNotFound from "../components/post/PostNotFound";

export default function EditPostPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<PostInput>({
    title: "",
    body: "",
    userId: "",
  });
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const { data: usersData, loading: usersLoading } = useQuery<UsersPage>(
    GET_USERS,
    {
      variables: {
        options: {
          paginate: {
            page: 1,
            limit: 10,
          },
        },
      },
    }
  );

  const users = usersData?.users.data || [];

  const {
    loading: fetchLoading,
    error: fetchError,
    data,
  } = useQuery<PostPage>(GET_POST, {
    variables: { id },
    skip: !id,
  });

  const [updatePost, { loading: updateLoading, error: updateError }] =
    useMutation<PostData, { id: string; input: PostInput }>(UPDATE_POST, {
      update(cache, { data }) {
        if (!data?.updatePost || !id) return;

        //Update the cache with the new post data including user/author infoo
        cache.writeQuery({
          query: GET_POST,
          variables: { id },
          data: {
            post: {
              ...data.updatePost,
              user: {
                id: currentUser?.id || "",
                name: currentUser?.name || "",
                email: currentUser?.email || "",
                __typename: "User",
              },
              comments: post?.comments,
              __typename: "Post",
            },
          },
        });
      },
      onCompleted: () => {
        toast.success("Post updated successfully.");
        navigate(`/post/${id}`);
      },
      onError: (error) => {
        toast.error("Failed to update post", {
          description: error.message,
        });
      },
    });

  const post = data?.post;
  const isPostFound = post && post.id !== null;

  useEffect(() => {
    if (isPostFound) {
      setFormData({
        title: post.title || "",
        body: post.body || "",
        userId: post.user.id || "",
      });
    }
  }, [isPostFound, post]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "userId") {
      const selectedUser = users.find((user) => user.id === value) || null;
      setCurrentUser(selectedUser);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    await updatePost({
      variables: {
        id,
        input: {
          //not send userId to backend because graphqlzero doesn't need it
          title: formData.title,
          body: formData.body,
        },
      },
    });
  };

  const handleCancel = () => {
    navigate(`/post/${id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {fetchLoading ? (
        <PostSkeleton />
      ) : fetchError ? (
        <ErrorCard error={fetchError} />
      ) : isPostFound ? (
        <PostForm
          formData={formData}
          loading={updateLoading}
          error={updateError}
          users={users}
          usersLoading={usersLoading}
          onSubmit={handleSubmit}
          onChange={handleChange}
          onCancel={handleCancel}
          submitLabel="Update Post"
          title="Edit Post"
        />
      ) : (
        <PostNotFound />
      )}
    </div>
  );
}
