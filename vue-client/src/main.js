import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { createProvider } from './vue-apollo';
import loggedInGuard from './guards/loggedIn.guard';

Vue.config.productionTip = false;

router.beforeEach(loggedInGuard('/login'));

new Vue({
  router,
  apolloProvider: createProvider(),
  render: h => h(App),
}).$mount('#app');
