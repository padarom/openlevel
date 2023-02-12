import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/1-HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/outline/setup',
      name: 'setup-outline',
      component: () => import('../views/2-SetupOutlineView.vue'),
    },
    {
      path: '/outline/parametrize',
      name: 'parametrize-outline',
      component: () => import('../views/3-ParametrizeOutlineView.vue'),
    },
    {
      path: '/grid',
      name: 'setup-grid',
      component: () => import('../views/4-SetupGridView.vue'),
    },
    {
      path: '/level',
      name: 'leveling',
      component: () => import('../views/5-LevelingView.vue'),
    },
  ],
})

export default router
