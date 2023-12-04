import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/Home-View.vue')
        },
        {
            path: '/dormitory',
            name: 'dormitory',
            component: () => import('../views/Dormitory-View.vue')
        }
    ]
})

export default router
