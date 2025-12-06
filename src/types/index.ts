export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
}
export interface Post {
  id: string;
  title: string;
  body: string;
  user: User;
}

export interface PostsPage {
  posts: {
    data: Post[];
    meta: {
      totalCount: number;
    };
  };
}
