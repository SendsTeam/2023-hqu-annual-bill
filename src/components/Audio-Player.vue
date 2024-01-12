<template>
    <span style="display: none"></span>
</template>
<script setup lang="ts">
//TODO 这里也许可以抽象到Store中
import { useAudioStore } from '@/stores/modules/audio'
import { useSettingStore } from '@/stores/modules/setting'
import { watchEffect } from 'vue'
const audioStore = useAudioStore()
const settingStore = useSettingStore()

audioStore.load('./audio/bgm1.mp3')

watchEffect(() => {
    if (settingStore.bgm) {
        audioStore.play()
    } else {
        audioStore.stop()
    }
})
</script>

<style scoped>
#audio-container {
    position: fixed;
    width: 25px;
    height: 25px;
    top: 20px;
    right: 20px;
    z-index: 99999999;
}
</style>
