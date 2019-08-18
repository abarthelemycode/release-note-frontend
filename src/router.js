import Vue from 'vue';
import Router from 'vue-router';
import AuthenticationGuard from '@/guard/authentication.guard';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      beforeEnter: AuthenticationGuard,
      component: () => import('./views/Home.vue'),
    },
    {
      path: '/home',
      name: 'home',
      beforeEnter: AuthenticationGuard,
      component: () => import('./views/Home.vue'),
    },
    {
      path: '/login',
      name: 'login',
      // check if we have token authentication redirect to home
      beforeEnter: AuthenticationGuard,
      component: () => import('./views/Login.vue'),
    },
    {
      path: '*',
      name: 'notFound',
      component: () => import('./views/NotFound.vue'),
    },
  ],
});
