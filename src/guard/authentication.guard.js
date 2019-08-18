import { isLogged } from '@/utils';

const guard = (to, from, next) => {
  const logged = isLogged();
  if (to.name === 'login') {
    if (logged) next('/home');
  } else if (!logged) next('/login');
  next();
};

export default guard;
