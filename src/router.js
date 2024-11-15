import { createRouter, createWebHistory } from 'vue-router';
import Screens from './screens';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Screens.Home,
  },
  {
    path: '/:id',
    name: 'Movie',
    component: Screens.Movie,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
