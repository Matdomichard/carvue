import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import Register from '@/views/RegisterPage.vue';
import Login from '@/views/SignIn.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/sign-in',
    name: 'Login',
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
