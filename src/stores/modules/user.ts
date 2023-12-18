import type { I_UserStoreState } from '@/models/modules/store/user/interface'
import { User } from '@/models/modules/user/class'
import { defineStore } from 'pinia'
import type { Ref } from 'vue'

export const useUserStore = defineStore('UserStore', {
    state: (): I_UserStoreState => ({
        user: new User()
    }),
    actions: {
        async login() {
            await this.user.login()
        },
        //!初始化数据,不调这个拿不到数据!
        async init(status: Ref<string>) {
            await this.user.initUser(status)
        },
        //获取流水
        //这里封装了调用细节
        async getStatistics() {
            await this.user.getLearning()
            await this.user.getPayment()
            await this.user.getRank()
        },
        //初始化微信相关
        async initWxSDK() {
            await this.user.initWxSDK()
        }
    }
})
