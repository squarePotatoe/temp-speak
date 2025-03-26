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
      component: () => import('../views/home/HomeView.vue'),
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
    {
      path: '/reading',
      name: 'reading',
      meta: { layout: ClassLayout },
      component: () => import('../views/reading/ReadingView.vue'),
    },
    {
      path: '/history',
      name: 'history',
      meta: { layout: MainLayout },
      component: () => import('../views/classes/HistoryView.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      meta: { layout: MainLayout },
      component: () => import('../views/profile/ProfileView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    }

  ],
})

export default router
