const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./src/graphql/schema');
const { resolvers } = require('./src/graphql/resolvers');
const { AuthService } = require('./src/services/AuthService');

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  context({ req }) {
    // get the user token from the headers
    const token = req && req.headers.authorization || '';
   
    // try to retrieve a user with the token
    const user = AuthService.getUser(token);
   
    // add the user to the context
    return { user };
  },
});

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});