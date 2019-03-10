<template>
  <div>
    <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
      <div class="card card-signin my-5">
        <div class="card-body">
          <h5 class="card-title text-center">Sign In</h5>
          <form @submit.prevent="login">
            <div class="form-group">
              <label for="email">Login</label>
              <input v-model="email"
                  type="email"
                  id="email"
                  class="form-control"
                  placeholder="Login">
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input v-model="password"
                  type="password"
                  class="form-control"
                  placeholder="Password">
            </div>
            <button type="submit" class="btn btn-lg btn-primary btn-block text">Submit</button>
            <div v-if="errors.length"
                class="alert alert-danger mt-4"
                role="alert">
              <div v-for="error in errors"
                  :key="error">
                {{ error }}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginMutation from '@/graphql/Login.graphql';
import { onLogin } from '../vue-apollo';

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
      errors: [],
    };
  },
  methods: {
    login() {
      this.errors = [];
      this.$apollo.mutate({
        mutation: LoginMutation,
        variables: {
          email: this.email,
          password: this.password,
        },
      }).then(async ({ data }) => {
        const apolloClient = this.$apollo.provider.defaultClient;
        await onLogin(apolloClient, data.login.token);
        this.$router.push({ name: 'home' });
      }).catch(({ graphQLErrors }) => {
        this.errors = graphQLErrors.map(({ message }) => message);
      });
    },
  },
};
</script>
