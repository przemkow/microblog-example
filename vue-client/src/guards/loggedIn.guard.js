import { isLoggedIn } from '../vue-apollo';

const loggedInGuard = redirectTo => (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !isLoggedIn()) {
    next(redirectTo);
  } else if (requiresAuth && isLoggedIn()) {
    next();
  } else {
    next();
  }
};


export default loggedInGuard;
