<template>
    <div id="home-container" ref="containerRef" :class="campas" @click="next">
        <img src="@/assets/img/home/home-xiamen.jpg" />
        <fade-transition id="tip">点击任意处继续!</fade-transition>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type Campus } from '@/models/modules/user/type/index'
import FadeTransition from '@/components/Fade-Transition.vue'
import router from '@/router'

//判断是哪个校区的,展示不同的背景图
const campas = ref<Campus>('xiamen')

//next事件
const next = () => {
    router.push({ name: 'dormitory' })
}
</script>

<style scoped lang="less">
#home-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    #tip {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 10%;
        z-index: 99999;
        text-align: center;
        font-family: '楷体';
        color: #9ca3af;
        font-size: 24px;
        font-weight: bold;
        cursor: pointer;
    }
}

img {
    width: 100%;
    height: 100%;
    // position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
// .xiamen {
//     background-image: url('@/assets/img/home/home-xiamen.jpg');
//     background-size: contain;
//     background-repeat: no-repeat;
// }
// .quanzhou {
//     background-image: url('@/assets/img/home/home-quanzhou.jpg');
//     background-size: contain;
//     background-repeat: no-repeat;
// }
</style>
