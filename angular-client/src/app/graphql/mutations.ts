import gql from 'graphql-tag';

export const VOTE_UP = gql`
  mutation VoteUp($postId: ID!) {
    voteUp(post: $postId) {
      id
      thumbsUp
    }
  }
`;

export const VOTE_DOWN = gql`
  mutation VoteDown($postId: ID!) {
    voteDown(post: $postId) {
      id
      thumbsDown
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(
      email: $email,
      password: $password,
    ) {
      token,
      user {
        id
        email
      }
    }
  }
`

export const ADD_POST = gql`
  mutation addPost($title: String!, $content: String!) {
    addPost(title: $title, content: $content) {
      id
      title
      content
      thumbsUp
      thumbsDown
      author {
        id
        email
      }
    }
  }
`
