import type { I_UserStoreState } from '@/models/modules/store/user/interface'
import { User } from '@/models/modules/user/class'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('UserStore', {
    state: (): I_UserStoreState => ({
        user: new User()
    }),
    actions: {
        async login() {
            await this.user.login()
        },
        //!初始化数据,不调这个拿不到数据!
        async init() {
            await this.user.initUser()
        },
        async getStatistics() {
            await this.user.getLearning()
            await this.user.getPayment()
        }
    }
})
