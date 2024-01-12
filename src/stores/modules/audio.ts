import { defineStore } from 'pinia'

export const useAudioStore = defineStore('AudioStore', {
    state: () => ({
        audio: new Audio(),
        hasLoaded: false, //是否已经装载音频
        paused: true //是否暂停
    }),
    actions: {
        //装载音频文件
        load(src: string = './audio/default.mp3') {
            this.audio.src = src
        },
        //播放
        async play() {
            try {
                await this.audio.play()
                this.paused = false
            } catch (error) {
                alert(error)
            }
        },
        //暂停
        pause() {
            this.audio.pause()
            this.paused = true
        },
        //结束
        stop(){
            //暂停并归零播放头
            this.pause()
            this.audio.currentTime = 0
        }
    }
})
