import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS, Apollo} from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { AuthService } from './core/services/auth.service';

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
})
export class GraphQLModule {
  constructor(private readonly apollo: Apollo,
              private readonly authService: AuthService,
              private readonly httpLink: HttpLink) {

    const uri = 'http://localhost:4000/graphql';
    const http = httpLink.create({ uri });

    const authLink = setContext((_, { headers }) => {
      const token = this.authService.getToken();

      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
        }
      };
    });

    apollo.create({
      link: authLink.concat(http),
      cache: new InMemoryCache(),
    });
  }
}
