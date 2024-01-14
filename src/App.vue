<script setup lang="ts">
import SettingDrawer from './components/Setting-Drawer.vue'
import TouchListener from './components/Touch-Listener.vue'
import AudioPlayer from './components/Audio-Player.vue'
import router from '@/router'
import { useStatusStore } from './stores/modules/status'
import { IsPC } from '@/util/index'
import { NMessageProvider } from 'naive-ui'
import { useSettingStore } from '@/stores/modules/setting'
import { getCodeByRedirect } from './util/index'
import { useUserStore } from '@/stores/modules/user'
import { reactive } from 'vue'
import type { Placement } from 'naive-ui/es/drawer/src/DrawerBodyWrapper'

//判断桌面端还是移动端
const statusStore = useStatusStore()
statusStore.isPC = IsPC()

//获取Code
const userStore = useUserStore()
userStore.user.code = getCodeByRedirect()

//TODO: 检查本地存储,看看是否配置过,如果没有先指向配置页
//#region
//如果存在配置信息,则按上次配置信息来
const settingStore = useSettingStore()
const setting = localStorage.getItem('setting')
statusStore.hasConfigured = setting ? true : false

if (setting) {
    //装载本地配置
    settingStore.$state = JSON.parse(setting)
    router.replace({ name: 'loading' })
} else {
    //跳转到配置页
    router.replace({ name: 'configure' })
}
//#endregion

//左右滑动打开设置
//#region
const drawerStatus: {
    active: boolean
    direction: Placement
} = reactive({
    active: false,
    direction: '' as Placement
})
const touchEffect = (direction: 'left' | 'right' | 'up' | 'down') => {
    //这里触摸方向要和打开方向相反
    if (direction == 'left') {
        drawerStatus.active = true
        drawerStatus.direction = 'right'
    }
    if (direction == 'right') {
        drawerStatus.active = true
        drawerStatus.direction = 'left'
    }
}
//#endregion
</script>

<template>
    <!-- 顶层监听触摸 -->
    <touch-listener
        :min-touch-distance-x="150"
        :min-touch-distance-y="200"
        v-if="userStore.user.code"
        @effect="touchEffect"
    >
        <!-- 注入naive-ui的消息Provider -->
        <n-message-provider>
            <!-- 路由过渡~ 记得要加上mode="out-in" 先执行离开动画再执行进入动画,让动画更加平滑 -->
            <router-view v-slot="{ Component }">
                <transition
                    name="fade"
                    mode="out-in"
                    enter-active-class="animate__animated animate__fadeIn"
                    leave-active-class="animate__animated animate__fadeOut"
                >
                    <component :is="Component" />
                </transition>
            </router-view>
        </n-message-provider>
        <!-- 设置抽屉 -->
        <setting-drawer :drawer-status="drawerStatus"></setting-drawer>
    </touch-listener>
    <!-- 音频播放器 -->
    <audio-player />
</template>

<style scoped></style>
