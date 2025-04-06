import { createRouter, createWebHistory } from 'vue-router';

// Import your views
import HomeView from '../views/HomeView.vue';
import FinancialPerformanceView from '../views/FinancialView.vue';
import AdoptionRate from '../views/AdoptionRateView.vue'
import ProvidersView from '@/views/ProvidersView.vue';
import MarketAnalysisView from '../views/MarketAnalysisView.vue';



const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/marketanalysis',
    name: 'marketanalysis',
    component: MarketAnalysisView,
  },
  {
    path: '/financial',
    name: 'financial',
    component: FinancialPerformanceView,
  },

  {
    path: '/adoptionrate',
    name: 'adoptionrate',
    component: AdoptionRate,
  },
  {
    path: '/providers',
    name: 'providers',
    component: ProvidersView,

  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
