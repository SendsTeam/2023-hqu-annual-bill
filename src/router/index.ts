import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/Home-View.vue') //路由懒加载
        },
        {
            path: '/cartoon/dormitory',
            name: 'dormitory',
            component: () => import('../views/Dormitory-View.vue')
        },
        {
            path: '/cartoon/classroom',
            name: 'classroom',
            component: () => import('../views/Classroom-View.vue')
        }
    ]
})

export default router
