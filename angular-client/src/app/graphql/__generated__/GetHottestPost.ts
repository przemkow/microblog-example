/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetHottestPost
// ====================================================

export interface GetHottestPost_getHottestPost_author {
  __typename: "User";
  id: string | null;
  email: string | null;
}

export interface GetHottestPost_getHottestPost {
  __typename: "Post";
  id: string | null;
  title: string | null;
  content: string | null;
  thumbsUp: number | null;
  thumbsDown: number | null;
  author: GetHottestPost_getHottestPost_author | null;
}

export interface GetHottestPost {
  getHottestPost: GetHottestPost_getHottestPost | null;
}
