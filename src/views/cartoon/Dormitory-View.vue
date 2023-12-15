<template>
    <cartoon-player
        v-slot="{ visiableIndex }"
        :effect="unlockNext"
        @click="next"
        :max-index="9"
        next-route-name="map"
    >
        <img
            v-show="visiableIndex >= 1"
            class="animate__animated animate__fadeIn"
            src="@/assets/img/cartoon/dormitory/dormitory-00.png"
        />
        <img
            v-show="visiableIndex >= 2"
            class="animate__animated animate__fadeIn"
            src="@/assets/img/cartoon/dormitory/dormitory-01.png"
        />
        <img
            v-show="visiableIndex >= 3"
            class="animate__animated animate__fadeIn"
            src="@/assets/img/cartoon/dormitory/dormitory-02.png"
        />
        <img
            v-show="visiableIndex >= 4"
            class="animate__animated animate__fadeIn"
            src="@/assets/img/cartoon/dormitory/dormitory-03.png"
        />
        <img
            v-show="visiableIndex >= 5"
            class="animate__animated animate__fadeIn"
            src="@/assets/img/cartoon/dormitory/dormitory-04.png"
            style="z-index: 1"
        />
        <img
            v-show="visiableIndex >= 6"
            class="animate__animated animate__fadeIn"
            src="@/assets/img/cartoon/dormitory/dormitory-05.png"
            style="z-index: 1"
        />
        <img
            v-show="visiableIndex >= 7"
            class="animate__animated animate__fadeIn"
            src="@/assets/img/cartoon/dormitory/dormitory-06.png"
        />
        <img
            v-show="visiableIndex >= 8"
            class="animate__animated animate__fadeIn"
            src="@/assets/img/cartoon/dormitory/dormitory-07.png"
            style="z-index: 1"
        />
    </cartoon-player>
</template>

<script setup lang="ts">
import CartoonPlayer from '@/components/Cartoon-Player.vue'
import router from '@/router'
import { ref } from 'vue'

//等动画播放完再开放路由
const isCartoonReady = ref(false)
//解锁路由
const unlockNext = () => {
    isCartoonReady.value = true
}
//下一个界面
const next = () => {
    if (isCartoonReady.value) {
        router.push({ name: 'map' })
    }
}
</script>

<style scoped>
/* 为了方便img请写在调用方! */
img {
    height: 110%;
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
</style>
