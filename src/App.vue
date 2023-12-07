<script setup lang="ts">
import router from '@/router'
import { useStatusStore } from './stores/modules/status'
import { IsPC } from '@/util/index'
import AudioPlayer from './components/Audio-Player.vue'
import { NMessageProvider } from 'naive-ui'

//判断桌面端还是移动端
useStatusStore().isPC = IsPC()
//默认指向HomeView路由
router.replace('/')
</script>

<template>
    <!-- 注入消息Provider -->
    <n-message-provider>
        <router-view></router-view>
    </n-message-provider>
    <audio-player />
</template>

<style scoped></style>
