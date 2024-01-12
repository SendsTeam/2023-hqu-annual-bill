import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useAudioStore = defineStore('AudioStore', () => {
    const baseUrl = './audio/'
    const audio = new Audio(baseUrl + 'default.mp3')
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
    function load(audioName: SupportAudio) {
        lastAudioName.value = currentAudioName.value
        currentAudioName.value = audioName
        audio.src = baseUrl + audioName
    }

    //播放音乐
    async function play() {
        try {
            await audio.play()
            paused.value = false
        } catch (error) {
            alert(error)
        }
    }

    //暂停
    function pause(): number {
        audio.pause()
        lastTime.value = audio.currentTime
        paused.value = true
        return audio.currentTime
    }

    //结束播放
    function stop() {
        //暂停并归零播放头
        pause()
        audio.currentTime = 0
        lastTime.value = audio.currentTime
    }

    //直接切换下一首歌
    function swap(audioName: SupportAudio) {
        stop()
        load(audioName)
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
        // lastAudio
    }
})

// export const useAudioStore = defineStore('AudioStore', {
//     state: () => ({
//         audio: new Audio(),
//         hasLoaded: false, //是否已经装载音频
//         paused: true //是否暂停
//     }),
//     actions: {
//         //装载音频文件
//         load(src: string = './audio/default.mp3') {
//             this.audio.src = src
//         },
//         //播放
//         async play() {
//             if (!this.audio.src) return
//             try {
//                 await this.audio.play()
//                 this.paused = false
//             } catch (error) {
//                 alert(error)
//             }
//         },
//         //暂停
//         pause() {
//             this.audio.pause()
//             this.paused = true
//         },
//         //结束
//         stop() {
//             //暂停并归零播放头
//             this.pause()
//             this.audio.currentTime = 0
//         }
//     }
// })
