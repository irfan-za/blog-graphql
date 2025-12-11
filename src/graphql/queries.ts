import { gql } from "@apollo/client";

const USER_FIELDS = gql`
  fragment UserFields on User {
    id
    name
    email
  }
`;
const COMMENT_FIELDS = gql`
  fragment CommentFields on Comment {
    id
    name
    email
    body
  }
`;
const POST_FIELDS = gql`
  fragment PostFields on Post {
    id
    title
    body
    user {
      ...UserFields
    }
  }
  ${USER_FIELDS}
`;
export const GET_POSTS = gql`
  query GetPosts($options: PageQueryOptions) {
    posts(options: $options) {
      data {
        ...PostFields
      }
      meta {
        totalCount
      }
    }
  }
  ${POST_FIELDS}
`;

export const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      ...PostFields
      comments {
        data {
          ...CommentFields
        }
      }
    }
  }
  ${POST_FIELDS}
  ${COMMENT_FIELDS}
`;

export const GET_USERS = gql`
  query GetUsers($options: PageQueryOptions) {
    users(options: $options) {
      data {
        ...UserFields
      }
      meta {
        totalCount
      }
    }
  }
  ${USER_FIELDS}
`;
