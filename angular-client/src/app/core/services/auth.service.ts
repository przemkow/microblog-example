import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {Apollo} from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private AuthToken = 'angular-apollo-token';

  constructor(private readonly apollo: Apollo,
              private readonly router: Router) { }

  login(token: string): void {
    if (token) {
      localStorage.setItem(this.AuthToken, token);
      this.apollo.getClient().resetStore();
      this.router.navigate(['']);
    }
  }

  logout(): void {
    localStorage.removeItem(this.AuthToken);
    this.router.navigate(['/login']);
    this.apollo.getClient().resetStore();
  }

  getToken(): string {
    return localStorage.getItem(this.AuthToken) || '';
  }

  isLoggedIn() {
    return this.getToken() !== '';
  }
}
