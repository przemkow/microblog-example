import gql from "graphql-tag";

export const getPosts = gql`
  query GetPosts{
    getPosts {
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
`;

export const getHottestPost = gql`
  query GetHottestPost {
    getHottestPost {
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
`;

export const currentUser = gql`
  query CurrentUser {
    me {
      id
      email
    }
  }
`;
