/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPosts
// ====================================================

export interface GetPosts_getPosts_author {
  __typename: "User";
  id: string | null;
  email: string | null;
}

export interface GetPosts_getPosts {
  __typename: "Post";
  id: string | null;
  title: string | null;
  content: string | null;
  thumbsUp: number | null;
  thumbsDown: number | null;
  author: GetPosts_getPosts_author | null;
}

export interface GetPosts {
  getPosts: (GetPosts_getPosts | null)[] | null;
}
