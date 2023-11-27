<template>
    <div id="home-container" :class="campas">
        <h2 id="tip" ref="tipRef" style="opacity: 1">点击任意处继续</h2>
    </div>
</template>

<script setup lang="ts">
import { useScreenTouchEventListener } from '@/composables/index'
import { onMounted, onUnmounted, ref } from 'vue'
import { type Campus } from '@/models/modules/user/type/index'
import { useGradationElement } from '../composables/index'
//监听屏幕触摸
useScreenTouchEventListener()

//判断是哪个校区的,展示不同的背景图
const campas = ref<Campus>('quanzhou')

//颜色渐变
//先获取模板引用
const tipRef = ref(null)
let closeGradationFunc: () => void
onMounted(() => {
    if (tipRef.value) {
        const { gradation, closeGradation } = useGradationElement(tipRef.value)
        gradation()
        closeGradationFunc = closeGradation
    }
})
onUnmounted(() => {
    closeGradationFunc()
})
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
    }
}
.xiamen {
    background-image: url('@/assets/img/home/home-xiamen.jpg');
    background-size: contain;
    background-repeat: no-repeat;
}
.quanzhou {
    background-image: url('@/assets/img/home/home-quanzhou.jpg');
    background-size: contain;
    background-repeat: no-repeat;
}
</style>
