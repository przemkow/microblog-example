/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: VoteDown
// ====================================================

export interface VoteDown_voteDown {
  __typename: "Post";
  id: string | null;
  thumbsDown: number | null;
}

export interface VoteDown {
  voteDown: VoteDown_voteDown | null;
}

export interface VoteDownVariables {
  postId: string;
}
