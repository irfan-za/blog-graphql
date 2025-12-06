import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostData, PostInput } from "../types";
import { useMutation } from "@apollo/client/react";
import { CREATE_POST } from "../graphql/mutation";
import { GET_POSTS } from "../graphql/queries";
import { toast } from "sonner";
import PostForm from "../components/post/PostForm";

export default function CreatePostPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PostInput>({
    title: "",
    body: "",
  });

  const [createPost, { loading, error }] = useMutation<
    PostData,
    { input: PostInput }
  >(CREATE_POST, {
    refetchQueries: [
      {
        query: GET_POSTS,
        variables: {
          options: {
            paginate: {
              page: 1,
              limit: 10,
            },
          },
        },
      },
    ],
  });

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
    const result = await createPost({
      variables: {
        input: formData,
      },
    });

    if (result.data) {
      toast.success("Post created successfully.");
      setFormData({
        title: "",
        body: "",
      });

      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <PostForm
        formData={formData}
        loading={loading}
        error={error}
        onSubmit={handleSubmit}
        onChange={handleChange}
        onCancel={handleCancel}
        submitLabel="Create Post"
        title="Create New Post"
      />
    </div>
  );
}
