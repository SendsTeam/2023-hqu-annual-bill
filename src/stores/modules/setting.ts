import { defineStore } from 'pinia'
import type { I_SettingStoreState } from '@/models/modules/store/setting/interface/index'

export const useSettingStore = defineStore('SettingStore', {
    state: (): I_SettingStoreState => ({
        //校区
        campus: '',
        //是否需要BGM
        bgm: true,
        //漫画相关
        cartoon: {
            //自动播放
            autoPlay: false,
            //快速展示
            quickPlay: false
        },
        //是否开启彩蛋
        egg: false,
    }),
    actions: {
        //更新本地存储
        updateLocal() {
            localStorage.setItem('setting', JSON.stringify(this.$state))
        },
        //读取并且装载本地存储
        loadLocal(): I_SettingStoreState | null {
            const setting = localStorage.getItem('setting')
            if (setting) {
                this.$state = JSON.parse(setting)
                return this.$state
            } else {
                return null
            }
        }
    }
})

