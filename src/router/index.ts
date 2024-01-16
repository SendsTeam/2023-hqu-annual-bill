import pinia from '@/stores'
import { useStatusStore } from '@/stores/modules/status'
import { useUserStore } from '@/stores/modules/user'
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const router = createRouter({
    // history: createWebHashHistory(import.meta.env.BASE_URL),
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

//全局路由守卫,进入新路由后重新鉴权
const statusStore = useStatusStore(pinia)
const userStore = useUserStore(pinia)
router.afterEach(async (to) => {
    //获取code和loading阶段不需要鉴权
    if (to.fullPath === '/loading' || to.query['code']) {
        return
    }
    console.log(to)
    let authUrl = window.location.host
    if (statusStore.client === 'IOS') {
        authUrl = statusStore.iosInitialUrl
    }
    console.log('AuthUrl:', authUrl)
    await userStore.initWxSDK(authUrl)
})

export default router
