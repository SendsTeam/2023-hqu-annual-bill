<template>
    <div
        id="home-container"
        :class="settingStore.campus === 'longzhouchi' ? 'xiamen' : settingStore.campus"
        @click="router.push({ name: 'map' })"
    >
        <fade-transition id="tip">点击任意处继续!</fade-transition>
    </div>
</template>

<script setup lang="ts">
import FadeTransition from '@/components/Fade-Transition.vue'
import router from '@/router'
import { useStatusStore } from '@/stores/modules/status'
import { useSettingStore } from '@/stores/modules/setting'

//判断是哪个校区的,展示不同的背景图
const settingStore = useSettingStore()
const statusStore = useStatusStore()

//开放设置页
statusStore.isSettingAvailable = true 
</script>

<style scoped lang="less">
#home-container {
    width: 100%;
    height: 100vh;
    #tip {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 5%;
        z-index: 999;
        text-align: center;
        color: #9ca3af;
        font-size: 24px;
        font-weight: bold;
        cursor: pointer;
    }
}

.xiamen {
    background-image: url('../assets/img/home/home-xiamen.jpg');
    background-size: cover;
    background-repeat: no-repeat;
}
.quanzhou {
    background-image: url('../assets/img/home/home-quanzhou.jpg');
    background-size: cover;
    background-repeat: no-repeat;
}
</style>
