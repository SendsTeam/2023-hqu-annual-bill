<template>
    <img id="audio-container" ref="controller" src="@/assets/icon/audio.png" @click="toggleAudio" />
</template>

<script setup lang="ts">
import { useAudio } from '@/composables/index'
import { onMounted, ref, onUnmounted } from 'vue'
import { useRotation } from '@/composables/index'
const { toggle, isPlaying } = useAudio()

const toggleAudio = () => {
    if (isPlaying()) {
        stopRotation()
    } else {
        rotation()
    }

    toggle()
}

//播放器旋转
const controller = ref<HTMLImageElement>()
//!这里要等到挂载后才能拿到,所以声明后在onMounted赋值
let stopRotation: () => void
let rotation: () => void
onMounted(() => {
    if (controller.value) {
        const { rotate, stopRotate } = useRotation(controller.value)
        stopRotation = stopRotate
        rotation = rotate
    }
})
onUnmounted(() => {
    stopRotation()
})
</script>

<style scoped>
#audio-container {
    position: fixed;
    z-index: 99;
    top: 10px;
    right: 10px;
}
</style>
