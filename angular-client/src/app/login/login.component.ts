import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {LOGIN, VOTE_DOWN} from "../graphql/mutations";
import {Apollo} from "apollo-angular";
import {AuthService} from "../core/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public errors: string[] = [];

  constructor(private readonly fb: FormBuilder,
              private readonly authService: AuthService,
              private readonly apollo: Apollo) {
    this.form = this.fb.group(
      {
        email: [ '' ],
        password: [ '' ],
      },
    );
  }

  ngOnInit() {
  }

  login() {
    this.apollo.mutate({
      mutation: LOGIN,
      variables: this.form.value,
    }).subscribe(({data}) => {
      this.authService.login(data.login.token);
    });
  }
}
