<template>
  <div id="app">
    <nav class="navbar navbar-dark bg-primary justify-content-between">
      <div class="container">
        <router-link class="navbar-brand" to="/">Microblog</router-link>
        <div v-if="isLoggedIn()"
            class="d-flex">
          <user-info></user-info>
          <button class="btn navbar-link"
              @click="logout">
            Logout
          </button>
        </div>
      </div>
    </nav>
    <div class="container pt-4">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { onLogout, isLoggedIn } from './vue-apollo';
import UserInfo from './components/UserInfo.vue';

export default {
  name: 'app',
  components: {
    UserInfo,
  },
  methods: {
    logout() {
      this.$router.push({ name: 'login' });
      const apolloClient = this.$apollo.provider.defaultClient;
      onLogout(apolloClient);
    },
    isLoggedIn() {
      return isLoggedIn();
    },
  },
};
</script>

<style>
</style>
