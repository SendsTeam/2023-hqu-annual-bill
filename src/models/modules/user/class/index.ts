import { API } from '@/api'
import type { I_LearningStatistic, I_PaymentStatistic } from '../../bill/interface/index'
import type { Ref } from 'vue'
//models实现层
export class User {
    public learningStatistic: I_LearningStatistic | null = null
    public paymentStatistic: I_PaymentStatistic | null = null
    public token: string = ''
    public avatar: string = ''
    public nickName: string = ''
    public code: string | null = null //这里的初始化由APP.vue完成
    //登陆
    public async login() {
        //!测试通道!
        if (this.token) return
        //这里一定会有code!
        const data = await API.login(this.code!)
        if (data) {
            this.token = data.token
            this.avatar = data.avatar
            this.nickName = data.nickName
        }
    }
    //!初始化数据,不调这个拿不到数据!
    //status为响应式ws进度
    public async initUser(status: Ref<string>) {
        await API.initUser(this.token, status)
    }
    public async getPayment() {
        this.paymentStatistic = await API.getPayment(this.token)
    }
    public async getLearning() {
        this.learningStatistic = await API.getLearning(this.token)
    }
}
