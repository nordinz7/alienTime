import { createRouter, createWebHistory } from 'vue-router' //@ts-ignore
import AlienTime from '../components/AlienTime.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AlienTime
    }
  ]
})

export default router
