import { createRouter, createWebHistory } from 'vue-router';

// Import your views
import HomeView from '../views/HomeView.vue';
import MapView from '../views/MapView.vue';
// import View3 from '../views/View3.vue';
// import View4 from '../views/View4.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/map',
    name: 'map',
    component: MapView,
  },
//   {
//     path: '/view3',
//     name: 'view3',
//     component: View3,
//   },
//   {
//     path: '/view4',
//     name: 'view4',
//     component: View4,
//   },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
