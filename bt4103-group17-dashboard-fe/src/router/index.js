import { createRouter, createWebHistory } from 'vue-router';

// Import your views
import HomeView from '../views/HomeView.vue';
import MapView from '../views/MapView.vue';
// import View3 from '../views/View3.vue';
import FinancialPerformanceView from '../views/FinancialView.vue';

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
  {
    path: '/financial',
    name: 'financial',
    component: FinancialPerformanceView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
