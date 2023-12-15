import type { I_StatusStoreState } from '@/models/modules/store/status/interface'
import { defineStore } from 'pinia'

export const useStatusStore = defineStore('StatusStore', {
    state: (): I_StatusStoreState => ({
        hasConfigured: false,
        map: {
            //一开始都是从大门进入
            current: 'door',
            active: {
                door: true,
                canteen: false,
                classroom: false,
                dormitory: false,
                library: false
            }
        },
        globalPaused: false, //全局暂停
        isPC: false,
        isReady: false,
        isSettingAvailable: false
    })
})
