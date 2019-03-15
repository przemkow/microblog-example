import gql from "graphql-tag";

export const voteUp = gql`
  mutation VoteUp($postId: ID!) {
    voteUp(post: $postId) {
      id
      thumbsUp
    }
  }
`;

export const voteDown = gql`
  mutation VoteDown($postId: ID!) {
    voteDown(post: $postId) {
      id
      thumbsDown
    }
  }
`;

export const login = gql`
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

export const addPost = gql`
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
