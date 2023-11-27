import type { I_UserStoreState } from '@/models/modules/store/user/interface'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('UserStore', {
    state: (): I_UserStoreState => ({})
})
