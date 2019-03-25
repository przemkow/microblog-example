import {NgModule} from '@angular/core';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpBatchLinkModule, HttpBatchLink } from 'apollo-angular-link-http-batch';
import { HttpHeaders } from '@angular/common/http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AuthService } from './core/services/auth.service';
import { ApolloLink } from 'apollo-link';

@NgModule({
  exports: [ApolloModule, HttpBatchLinkModule],
})
export class GraphQLModule {
  constructor(private readonly apollo: Apollo,
              private readonly authService: AuthService,
              private readonly httpLink: HttpBatchLink) {

    const uri = 'http://localhost:4000/graphql';
    const http = httpLink.create({ uri });

    const authLink = new ApolloLink((operation, forward) => {
      const token = this.authService.getToken();

      if (token) {
        operation.setContext({
          headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
        });
      }
      return forward(operation);
    });

    apollo.create({
      link: authLink.concat(http),
      cache: new InMemoryCache(),
    });
  }
}
