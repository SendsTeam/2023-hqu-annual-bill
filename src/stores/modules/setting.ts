import { defineStore } from 'pinia'

export const useSettingStore = defineStore('SettingStore', {
    state: () => ({
        //校区
        campus: '',
        //是否需要BGM
        bgm: true,
        //漫画相关
        cartoon: {
            autoPlay: false,
            repeatPlay: true
        },
        egg: false
    })
})
