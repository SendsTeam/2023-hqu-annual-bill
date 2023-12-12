import type { I_StatusStoreState } from '@/models/modules/store/status/interface'
import { defineStore } from 'pinia'

export const useStatusStore = defineStore('StatusStore', {
    state: (): I_StatusStoreState => ({
        hasConfigured: false,
        currentPage: 'Home',
        globalPaused: false, //全局暂停
        isPC: false,
        isReady: false,
        isSettingAvailable: false
    })
})
