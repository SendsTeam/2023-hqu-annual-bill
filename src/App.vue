<script setup lang="ts">
import router from '@/router'
import { useStatusStore } from './stores/modules/status'
import { IsPC } from '@/util/index'
//判断桌面端还是移动端
useStatusStore().isPC = IsPC()
//默认指向HomeView路由
router.replace('/')

</script>

<template>
    <router-view></router-view>
</template>

<style scoped></style>
