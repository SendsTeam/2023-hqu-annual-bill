<!-- 渐变容器:使用v-show以及Transition内置组件实现 -->
<template>
    <Transition name="fade">
        <div v-show="changer">
            <slot></slot>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
const { interval, firstVisible, transitionTime } = withDefaults(
    defineProps<{
        interval?: number //间隔
        firstVisible?: boolean //初始是否可见
        transitionTime?: number //过渡时间
    }>(),
    {
        interval: 1000,
        firstVisible: true,
        transitionTime: 1
    }
)

//定点变化机
const changer = ref(firstVisible)
let id: number
onMounted(() => {
    //取反
    id = setInterval(() => {
        changer.value = !changer.value
    }, interval)
})
onUnmounted(() => {
    clearInterval(id)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity v-bind(transitionTime + 's') ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
