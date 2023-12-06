<template>
    <div id="cartoon-container">
        <slot :visiableIndex="visiableIndex"></slot>
    </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { onMounted, onUnmounted, ref, watchEffect } from 'vue'
//Props
const { cartoonGap, effect, maxIndex, nextRouteName, nextRouteTime } = withDefaults(
    defineProps<{
        //最大索引,超过后会触发effect
        maxIndex: number
        //到达最大索引后触发的effect
        effect?: (visiableIndex?: number) => void
        //下一个路由名,如果有传的话会自动跳转
        nextRouteName?: string
        //漫画显示间隔(毫秒)
        cartoonGap?: number
        //漫画播放完之后跳转路由的等待时间
        nextRouteTime?: number
        
    }>(),
    {
        //默认两秒后
        cartoonGap: 2000,
        nextRouteTime: 2000
    }
)
//漫画图索引
const visiableIndex = ref(1)
//监听索引
watchEffect(() => {
    if (visiableIndex.value > maxIndex) {
        effect && effect(visiableIndex.value)
        //稍后跳转路由
        setTimeout(() => {
            nextRouteName && router.push({ name: nextRouteName })
        }, nextRouteTime)
    }
})
//定时增加索引
let intervalId: number
onMounted(() => {
    intervalId = setInterval(() => {
        //这里没做停止处理,因为没必要
        visiableIndex.value++
    }, cartoonGap)
})
onUnmounted(() => {
    clearInterval(intervalId)
})
</script>

<style scoped>
#cartoon-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}
</style>
