<template>
    <div id="cartoon-container">
        <slot :visiableIndex="visiableIndex"></slot>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
//Props
const { cartoonGap } = withDefaults(
    defineProps<{
        //漫画显示间隔(毫秒)
        cartoonGap?: number
    }>(),
    {
        cartoonGap: 2000
    }
)
//漫画图索引
const visiableIndex = ref(1)
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
