import { createRouter, createWebHistory } from 'vue-router';
import Views from './views';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Views.Home,
  },
  {
    path: '/:id',
    name: 'Movie',
    component: Views.Movie,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
