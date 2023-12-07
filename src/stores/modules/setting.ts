import { defineStore } from 'pinia'

export const usSettingStore = defineStore('SettingStore', {
    state: () => ({
        //校区
        campus: ''
    })
})
