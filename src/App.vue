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
    <!-- 顶层touch监听 -->
    <touch-listener v-if="userStore.user.code" @effect="touchEffect">
        <!-- 注入消息Provider -->
        <n-message-provider>
            <router-view></router-view>
        </n-message-provider>
        <!-- 设置页 -->
        <setting-drawer :drawer-status="drawerStatus"></setting-drawer>
    </touch-listener>
    <audio-player />
</template>

<style scoped></style>
