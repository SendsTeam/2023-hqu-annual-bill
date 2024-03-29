import pinia from '@/stores'
import { useUserStore } from '@/stores/modules/user'
import { createRouter,  createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
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
            path: '/map',
            name: 'map',
            component: () => import('../views/map/Map-View.vue')
        },
        {
            path: '/cartoon/dormitory',
            name: 'dormitory',
            component: () => import('../views/cartoon/Dormitory-View.vue')
        },
        {
            path: '/cartoon/classroom',
            name: 'classroom',
            component: () => import('../views/cartoon/Classroom-View.vue')
        },
        {
            path: '/cartoon/library',
            name: 'library',
            component: () => import('../views/cartoon/Library-View.vue')
        },
        {
            path: '/cartoon/canteen',
            name: 'canteen',
            component: () => import('../views/cartoon/Canteen-View.vue')
        },
        {
            path: '/cartoon/dormitory-two',
            name: 'dormitory-two',
            component: () => import('../views/cartoon/Dormitory-Two-View.vue')
        },
        {
            path: '/summary',
            name: 'summary',
            component: () => import('../views/Summary-View.vue')
        }
    ]
})

//开发者通道
const userStore = useUserStore(pinia)
Object.defineProperty(window, '__wxSDK', {
    value: (url: string) => {
        userStore.initWxSDK(url)
    }
})

export default router
