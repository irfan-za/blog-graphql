import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostData, PostInput, PostsPage, User, UsersPage } from "../types";
import { useMutation, useQuery } from "@apollo/client/react";
import { CREATE_POST } from "../graphql/mutation";
import { GET_POSTS, GET_USERS } from "../graphql/queries";
import { toast } from "sonner";
import PostForm from "../components/post/PostForm";

export default function CreatePostPage() {
  const navigate = useNavigate();
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

  const [createPost, { loading, error }] = useMutation<
    PostData,
    { input: PostInput }
  >(CREATE_POST, {
    update(cache, { data }) {
      if (!data?.createPost) return;

      //Update the cache, adding new post data including user/author info.
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
        const newPost = {
          ...data.createPost,
          user: {
            id: currentUser?.id || "",
            name: currentUser?.name || "",
            email: currentUser?.email || "",
            __typename: "User",
          },
          __typename: "Post",
        };

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
              data: [newPost, ...existingPosts.posts.data],
              meta: {
                ...existingPosts.posts.meta,
                totalCount: existingPosts.posts.meta.totalCount + 1,
              },
              __typename: "PostsPage" as const,
            },
          },
        });
      }
    },
  });

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
    const result = await createPost({
      variables: {
        input: {
          //not send userId to backend because graphqlzero doesn't need it
          title: formData.title,
          body: formData.body,
        },
      },
    });

    if (result.data) {
      toast.success("Post created successfully.");
      setFormData({
        title: "",
        body: "",
        userId: "",
      });

      navigate("/");
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
        users={users}
        usersLoading={usersLoading}
        onSubmit={handleSubmit}
        onChange={handleChange}
        onCancel={handleCancel}
        submitLabel="Create Post"
        title="Create New Post"
      />
    </div>
  );
}
