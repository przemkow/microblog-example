import gql from 'graphql-tag';

export const GET_POSTS = gql`
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

export const GET_HOTTEST_POST = gql`
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

export const CURRENT_USER = gql`
  query CurrentUser {
    me {
      id
      email
    }
  }
`;
