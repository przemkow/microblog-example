/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: VoteUp
// ====================================================

export interface VoteUp_voteUp {
  __typename: "Post";
  id: string | null;
  thumbsUp: number | null;
}

export interface VoteUp {
  voteUp: VoteUp_voteUp | null;
}

export interface VoteUpVariables {
  postId: string;
}
