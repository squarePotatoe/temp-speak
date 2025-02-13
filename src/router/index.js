import ClassLayout from '@/layouts/ClassLayout.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { layout: MainLayout },
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/about',
      name: 'about',

      meta: { layout: MainLayout },
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/contact',
      name: 'contact',

      meta: { layout: MainLayout },
      component: () => import('../views/ContactView.vue'),
    },
    {
      path: '/writing',
      name: 'writing',
      meta: { layout: ClassLayout },
      component: () => import('../views/writing/WritingView.vue'),
    },
    {
      path: '/classes',
      name: 'classes',

      meta: { layout: MainLayout },
      component: () => import('../views/classes/ClassesView.vue'),
    },
  ],
})

export default router
