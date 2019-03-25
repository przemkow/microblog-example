/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addPost
// ====================================================

export interface addPost_addPost_author {
  __typename: "User";
  id: string | null;
  email: string | null;
}

export interface addPost_addPost {
  __typename: "Post";
  id: string | null;
  title: string | null;
  content: string | null;
  thumbsUp: number | null;
  thumbsDown: number | null;
  author: addPost_addPost_author | null;
}

export interface addPost {
  addPost: addPost_addPost | null;
}

export interface addPostVariables {
  title: string;
  content: string;
}
