export interface User {
  id: string;
  name: string;
  email: string;
}
export interface Post {
  id: string;
  title: string;
  body: string;
  user: User;
}
export interface Comment {
  id: string;
  name: string;
  email: string;
  body: string;
}
export interface PostWithComments extends Post {
  comments: {
    data: Comment[];
  };
}
export interface PostsPage {
  posts: {
    data: Post[];
    meta: {
      totalCount: number;
    };
  };
}
export interface PostPage {
  post: PostWithComments;
}

export interface PostInput {
  title: string;
  body: string;
}

export interface PostData {
  post: Post;
}
