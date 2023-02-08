import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/outline',
      name: 'outline',
      component: () => import('../views/OutlineView.vue'),
    },
    {
      path: '/level',
      name: 'level',
      component: () => import('../views/LevelingView.vue'),
    },
  ],
})

export default router
