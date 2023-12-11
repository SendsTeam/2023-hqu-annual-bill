<template>
  <cartoon-player
      v-slot="{ visiableIndex }"
      :effect="unlockNextRoute"
      @click="nextRoute"
      :max-index="4"
  >
    <img
        v-show="visiableIndex >= 1"
        class="animate__animated animate__fadeIn"
        src="@/assets/img/cartoon/dormitorytwo/dormitorytwo-01.png"
    />
    <img
        v-show="visiableIndex >= 2"
        class="animate__animated animate__fadeIn"
        src="@/assets/img/cartoon/dormitorytwo/dormitorytwo-02.png"
        style="z-index: 1"
    />
    <img
        v-show="visiableIndex >= 3"
        class="animate__animated animate__fadeIn"
        src="@/assets/img/cartoon/dormitorytwo/dormitorytwo-03.png"
        style="z-index: 1"
    />
  </cartoon-player>
</template>

<script setup lang="ts">
import CartoonPlayer from '@/components/Cartoon-Player.vue'
import { ref } from 'vue'
import router from '@/router'

//等动画播放完再开放路由
const isCartoonReady = ref(false)
//解锁路由
const unlockNextRoute = () => {
  isCartoonReady.value = true
}
const nextRoute = () => {
  if (isCartoonReady.value) {
    router.push({ name: 'dormitorytwo' })
  } else {
    //TODO: 这里可以加个提示啥的
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
