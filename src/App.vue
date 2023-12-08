<script setup lang="ts">
import router from '@/router'
import { useStatusStore } from './stores/modules/status'
import { IsPC } from '@/util/index'
import AudioPlayer from './components/Audio-Player.vue'
import { NMessageProvider } from 'naive-ui'

const statusStore = useStatusStore()
//判断桌面端还是移动端
statusStore.isPC = IsPC()
//TODO: 检查本地存储,看看是否配置过,如果没有先指向配置页
//如果存在配置信息,则按上次配置信息来
statusStore.hasConfigured = localStorage.getItem('hasConfigured') ? true : false
router.replace({ name: 'configure' })
</script>

<template>
    <!-- 注入消息Provider -->
    <n-message-provider>
        <router-view></router-view>
    </n-message-provider>
    <audio-player v-show="statusStore.hasConfigured" />
</template>

<style scoped></style>
