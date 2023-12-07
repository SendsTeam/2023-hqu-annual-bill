import type { I_StatusStoreState } from '@/models/modules/store/status/interface'
import { defineStore } from 'pinia'

export const useStatusStore = defineStore('StatusStore', {
    state: (): I_StatusStoreState => ({
        hasConfigured: false,
        currentPage: 'Home',
        isPC: false
    })
})
