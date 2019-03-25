import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BatchHttpLink } from "apollo-link-batch-http";
import { ApolloLink, Observable } from 'apollo-link';

export const AUTH_TOKEN = 'react-apollo-token';

const request = async (operation) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  });
};

const requestLink = new ApolloLink((operation, forward) =>
  new Observable(observer => {
    let handle;
    Promise.resolve(operation)
      .then(oper => request(oper))
      .then(() => {
        handle = forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        });
      })
      .catch(observer.error.bind(observer));

    return () => {
      if (handle) handle.unsubscribe();
    };
  })
);

const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    requestLink,
    new BatchHttpLink({
      uri: 'http://localhost:4000/graphql',
    })
  ]),
  cache: new InMemoryCache()
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
