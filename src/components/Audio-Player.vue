<template>
    <img v-if="active" id="audio-container" src="@/assets/icon/audio.png" />
</template>

<script setup lang="ts">
import { useAudioStore } from '@/stores/modules/audio'
import { useSettingStore } from '@/stores/modules/setting'
import { computed } from 'vue'
const audioStore = useAudioStore()
const settingStore = useSettingStore()

const active = computed(() => {
    //开启了BGM并且正在播放
    return settingStore.bgm && !audioStore.paused
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
