import { API } from '@/api'
import type { I_LearningStatistic, I_PaymentStatistic } from '../../bill/interface/index'
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
    public async initUser() {
        //等待初始化完成后才能获取数据!
        //TODO: 后续要重构为ws,ws等待的逻辑恰好可以封装成Promise!
        await API.initUser(this.token)
    }
    public async getPayment() {
        this.paymentStatistic = await API.getPayment(this.token)
    }
    public async getLearning() {
        this.learningStatistic = await API.getLearning(this.token)
    }
}
