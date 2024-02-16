import type { I_UserStoreState } from '@/models/modules/store/user/interface'
import { User } from '@/models/modules/user/class'
import { defineStore } from 'pinia'
import type { Ref } from 'vue'

export const useUserStore = defineStore('UserStore', {
    state: (): I_UserStoreState => ({
        //维护了一个user实例
        user: new User()
    }),
    actions: {
        //登录
        async login(): Promise<boolean> {
            return await this.user.login()
        },
        //!初始化数据,不调这个拿不到数据!
        async init(status: Ref<string>) {
            await this.user.initUser(status)
        },
        //获取流水
        //注意这里封装了调用细节
        async getStatistics() {
            await this.user.getLearning()
            await this.user.getPayment()
            await this.user.getRank()
        },
        //初始化微信相关
        async initWxSDK(url: string) {
            await this.user.initWxSDK(url)
        },
        async uploadRate(appraise: number) {
            await this.user.uploadRate(appraise)
        }
    }
})
