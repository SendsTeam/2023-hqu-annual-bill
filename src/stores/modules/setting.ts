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
        egg: false
    })
})
