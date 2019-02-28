const { gql } = require('apollo-server');

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Post" type can be used in other type declarations.
  type Post {
    id: ID
    title: String
    content: String
    author: User
    thumbsUp: Int
    thumbsDown: Int
  }

  type User {
    id: ID
    email: String
    posts: [Post]
  }

  type AuthPayload {
    token: String!
    user: User!
  }
  
  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    getPosts: [Post]
    getPost(id: ID!): Post
    getHottestPost: Post
    getUsers: [User]
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
    addPost(title: String!, content: String!, author: ID): Post
    voteUp(post: ID!): Post
    voteDown(post: ID!): Post
  }

  type Subscription {
    postUpdated: Post
  }
`;

module.exports = {
  typeDefs,
}