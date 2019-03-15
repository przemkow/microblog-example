import ApolloClient from "apollo-boost";

export const AUTH_TOKEN = 'react-apollo-token';

const apolloClient = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  request: async (operation) => {
    const token = localStorage.getItem(AUTH_TOKEN);
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
});


async function onLogin(token) {
  if (typeof localStorage !== 'undefined' && token) {
    localStorage.setItem(AUTH_TOKEN, token);
  }
  apolloClient.resetStore();
}

async function onLogout() {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(AUTH_TOKEN);
  }
  apolloClient.resetStore();
}

// Helper method to define if user is logged in.
function isLoggedIn() {
  return !!localStorage.getItem(AUTH_TOKEN);
}

export {
  apolloClient,
  onLogin,
  onLogout,
  isLoggedIn,
}
