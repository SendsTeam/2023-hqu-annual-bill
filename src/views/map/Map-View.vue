<template>
    <component :is="maps[settingStore.campus as Campus]"></component>
</template>

<script setup lang="ts">
import MapXiamen from './Map-Xiamen.vue'
import MapQuanzhou from './Map-Quanzhou.vue'
import MapLongzhouchi from './Map-Longzhouchi.vue'
import { useSettingStore } from '@/stores/modules/setting'
import type { Component } from 'vue'
import type { Campus } from '@/models/modules/user/type'
import { onMounted } from 'vue'
import { useStatusStore } from '../../stores/modules/status'
import { onUnmounted } from 'vue'

//动态组件映射
const maps = {
    xiamen: MapXiamen,
    quanzhou: MapQuanzhou,
    longzhouchi: MapLongzhouchi
} as Record<Campus, Component> //使用类型工具Record创建Campus映射Component的自定义对象

const settingStore = useSettingStore()
const stautsStore = useStatusStore()
onMounted(() => {
    //挂载时禁止设置
    stautsStore.isSettingAvailable = false
})
onUnmounted(() => {
    //开放设置
    stautsStore.isSettingAvailable = true
})
</script>

<style scoped></style>
