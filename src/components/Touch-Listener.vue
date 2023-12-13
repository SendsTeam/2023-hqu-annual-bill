<template>
    <div @touchstart="onTouchStart" @touchend="onTouchEnd">
        <slot name="default" :isEfficientTouched="isEfficientTouched"></slot>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

//定义Props和Emit
//#region
const { minTouchDistanceX, minTouchDistanceY } = withDefaults(
    defineProps<{
        minTouchDistanceX: number
        maxTouchDistanceX?: number
        minTouchDistanceY: number
        maxTouchDistanceY?: number
    }>(),
    {
        minTouchDistanceX: 150,
        minTouchDistanceY: 200
    }
)

const emit = defineEmits<{
    effect: [direction: 'left' | 'right' | 'up' | 'down']
}>()
//#endregion

//响应式触摸状态
const touchStatus = reactive({
    touchStartX: 0,
    touchStartY: 0,
    touchEndY: 0,
    touchEndX: 0
})

//是否为有效触摸
const isEfficientTouched = ref(false)
//方向
const touchDirection = ref<'left' | 'right' | 'up' | 'down'>()
const dealWithTouch = (): boolean => {
    //先假设为有效触摸
    isEfficientTouched.value = true

    //计算变化量
    const diffX = touchStatus.touchEndX - touchStatus.touchStartX
    const diffY = touchStatus.touchEndY - touchStatus.touchStartY

    if (diffX > minTouchDistanceX) {
        touchDirection.value = 'right'
        return true
    } else if (diffX < -minTouchDistanceX) {
        touchDirection.value = 'left'
        return true
    } else if (diffY > -minTouchDistanceY) {
        touchDirection.value = 'down'
        return true
    } else if (diffY < minTouchDistanceY) {
        touchDirection.value = 'up'
        return true
    }

    isEfficientTouched.value = false
    return false
}

//事件
const onTouchStart = (evt: TouchEvent) => {
    //记录初始XY
    touchStatus.touchStartX = evt.touches[0].clientX
    touchStatus.touchStartY = evt.touches[0].clientY
}
const onTouchEnd = (evt: TouchEvent) => {
    //记录结束XY
    //注意这里要使用changedTouches(触摸点改变值)
    touchStatus.touchEndX = evt.changedTouches[0].clientX
    touchStatus.touchEndY = evt.changedTouches[0].clientY
    //计算方向并且触发effect
    dealWithTouch() && emit('effect', touchDirection.value!)
}
</script>

<style scoped></style>
