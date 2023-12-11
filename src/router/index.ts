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
            path: '/configure',
            name: 'configure',
            component: () => import('../views/Configure-View.vue')
        },
        {
            path: '/loading',
            name: 'loading',
            component: () => import('../views/Loading-View.vue')
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
        },
        {
            path: '/cartoon/library',
            name: 'library',
            component: () => import('../views/Library-View.vue')
        },
        {
            path: '/cartoon/cafeteria',
            name: 'cafeteria',
            component: () => import('../views/Cafeteria-View.vue')
        },
        {
            path: '/summary',
            name: 'summary',
            component: () => import('../views/Summary-View.vue')
        }
    ]
})

export default router
