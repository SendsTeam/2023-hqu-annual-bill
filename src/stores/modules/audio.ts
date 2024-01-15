import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'


export const useAudioStore = defineStore('AudioStore', () => {
    const baseUrl = './audio/'
    const audio = new Audio(baseUrl + 'default.mp3')
    audio.loop = true //默认循环
    const paused = ref(true)
    const hasLoaded = ref(false)
    //暂停前的播放位
    const lastTime = ref(audio.currentTime)
    //TODO 初始指向audio本身
    const lastAudio = ref(audio)
    const lastAudioName: Ref<SupportAudio> = ref('default.mp3')
    const currentAudioName: Ref<SupportAudio> = ref('default.mp3')

    //支持的音频
    type SupportAudio = 'battery.mp3' | 'bgm1.mp3' | 'default.mp3'

    //装载音频
    function load(audioName: SupportAudio, loop: boolean = false) {
        lastAudioName.value = currentAudioName.value
        currentAudioName.value = audioName
        audio.src = baseUrl + audioName
        audio.loop = loop
    }

    //播放音乐
    async function play() {
        try {
            paused.value = false
            await audio.play()
        } catch (error) {
            alert(error)
        }
    }

    //暂停
    function pause(): number {
        paused.value = true
        audio.pause()
        lastTime.value = audio.currentTime
        return audio.currentTime
    }

    //结束播放
    function stop() {
        //暂停并归零播放头
        pause()
        audio.currentTime = 0
        lastTime.value = 0
    }

    //直接切换下一首歌
    function swap(audioName: SupportAudio, loop: boolean = false) {
        stop()
        load(audioName, loop)
        play()
    }

    return {
        paused,
        hasLoaded,
        load,
        play,
        stop,
        swap,
        lastTime,
        lastAudioName,
        currentAudioName,
        lastAudio
    }
})



