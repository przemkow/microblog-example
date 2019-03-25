/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CurrentUser
// ====================================================

export interface CurrentUser_me {
  __typename: "User";
  id: string | null;
  email: string | null;
}

export interface CurrentUser {
  me: CurrentUser_me | null;
}
