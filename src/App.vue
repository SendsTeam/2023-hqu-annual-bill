<script setup lang="ts">
import router from '@/router'

//默认指向HomeView路由
router.replace('/')
</script>

<template>
    <router-view></router-view>
</template>

<style scoped></style>
