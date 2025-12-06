import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client/react";
import { UPDATE_POST } from "../graphql/mutation";
import { GET_POST } from "../graphql/queries";
import { toast } from "sonner";
import PostForm from "../components/post/PostForm";
import { PostInput, PostPage, PostData } from "../types";
import PostSkeleton from "../components/post/PostSkeleton";
import ErrorCard from "../components/ErrorCard";
import PostNotFound from "../components/post/PostNotFound";

export default function EditPostPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<PostInput>({
    title: "",
    body: "",
  });

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
      onCompleted: () => {
        toast.success("Post updated successfully.");
        setTimeout(() => {
          navigate(`/post/${id}`);
        }, 1000);
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
      });
    }
  }, [isPostFound, post]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    await updatePost({
      variables: {
        id,
        input: formData,
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
