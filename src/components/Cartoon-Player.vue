<template>
    <div id="cartoon-container">
        <slot :visiableIndex="visiableIndex"></slot>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watchEffect } from 'vue'
//Props
const { cartoonGap, effect, maxIndex } = withDefaults(
    defineProps<{
        //最大索引,超过后会触发effect
        maxIndex: number
        //到达最大索引后触发的effect
        effect?: (visiableIndex?: number) => void
        //漫画显示间隔(毫秒)
        cartoonGap?: number
    }>(),
    {
        //默认两秒后
        cartoonGap: 2000
    }
)
//漫画图索引
const visiableIndex = ref(1)
//监听索引
watchEffect(() => {
    if (visiableIndex.value > maxIndex) {
        effect && effect(visiableIndex.value)
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
