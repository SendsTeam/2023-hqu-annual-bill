<template>
    <img id="audio-container" ref="controller" src="@/assets/icon/audio.png" @click="toggle" />
</template>

<script setup lang="ts">
import { useAudio } from '@/composables/index'
import { onMounted, ref } from 'vue'
import { useRotation } from '@/composables/index'

//音频
const { toggle, isPlaying } = useAudio({
    toggleHook: () => {
        //切换状态:播放音乐的时候旋转；停止音乐的时候停止旋转
        if (isPlaying()) {
            stopRotation()
        } else {
            rotation()
        }
    }
})

//播放器旋转
const controller = ref<HTMLImageElement>()
//这里要等到挂载后才能拿到,所以声明后在onMounted赋值
let stopRotation: () => void
let rotation: () => void
onMounted(() => {
    if (controller.value) {
        const { rotate, stopRotate } = useRotation(controller.value)
        stopRotation = stopRotate
        rotation = rotate
    }
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
