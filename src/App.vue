<script setup lang="ts">
import router from '@/router'
import { useStatusStore } from './stores/modules/status'
import { IsPC } from '@/util/index'
import AudioPlayer from './components/Audio-Player.vue'
import { NMessageProvider } from 'naive-ui'
import { useSettingStore } from '@/stores/modules/setting'
import { getCodeByRedirect } from './util/index'
import { useUserStore } from '@/stores/modules/user'

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
</script>

<template>
    <!-- 注入消息Provider -->
    <div v-if="userStore.user.code">
        <n-message-provider>
            <router-view></router-view>
        </n-message-provider>
        <audio-player v-show="statusStore.isSettingAvailable" />
    </div>
</template>

<style scoped></style>
