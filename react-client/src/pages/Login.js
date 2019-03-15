import React, { Component } from 'react';
import { login } from '../graphql/mutations';
import { graphql } from "react-apollo";
import { onLogin } from "../react-apollo";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: [],
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ errors: [] });

    this.props.loginMutation({
      variables: {
        email: this.state.email,
        password: this.state.password
      }
    }).then(async ({ data: { login } }) => {
      await onLogin(login.token);
      this.props.history.push('/')
    }).catch(({ graphQLErrors }) => {
      const errors = graphQLErrors.map(({ message }) => message);
      this.setState({ errors });
    });
  }

  handleEmailChange(text) {
    this.setState({ email: text })
  }

  handlePasswordChange(text){
    this.setState({ password: text })
  }

  render() {
    return (
      <div>
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card card-signin my-5">
            <div className="card-body">
              <h5 className="card-title text-center">Sign In</h5>
              <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                  <label htmlFor="email">Login</label>
                  <input
                    type="email"
                    id="email"
                    onChange={(event) => this.handleEmailChange(event.target.value)}
                    className="form-control"
                    placeholder="Login"/>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    onChange={(event) => this.handlePasswordChange(event.target.value)}
                    placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-lg btn-primary btn-block text">Submit</button>
                {
                  this.state.errors.length ? (
                    <div className="alert alert-danger mt-4" role="alert">
                      {this.state.errors.map(error => (
                        <div key={error}>{error}</div>
                      ))}
                    </div>
                  ) : null
                }
              </form>
            </div>
          </div>
        </div>
      </div>
  );
  }
}

export default graphql(login, {name: 'loginMutation'})(Login);
