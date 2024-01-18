import { API } from '@/api'
import type {
    I_LearningStatistic,
    I_PaymentStatistic,
    I_RankStatistic
} from '../../bill/interface/index'
import type { Ref } from 'vue'
import wx from 'weixin-js-sdk'

//models实现层
export class User {
    public learningStatistic: I_LearningStatistic | null = null
    public paymentStatistic: I_PaymentStatistic | null = null
    public rankStatistic: I_RankStatistic | null = null
    // public wxSignature: I_WxSignature | null = null
    public token: string = ''
    public avatar: string = ''
    public nickName: string = ''
    public code: string | null = null //这里的初始化由APP.vue完成
    //登陆,返回是否登陆成功
    public async login(): Promise<boolean> {
        try {
            //这里一定会有code!
            const data = await API.login(this.code!)
            if (data) {
                this.token = data.token
                this.avatar = data.avatar
                this.nickName = data.nickName
            }
            return true
        } catch (error) {
            alert(error)
            window.location.href = 'http://wx.sends.cc'
            return false
        }
    }
    //!初始化数据,不调这个拿不到数据!
    //status为响应式ws进度
    public async initUser(status: Ref<string>) {
        await API.initUser(this.token, status)
    }
    //初始化微信客户端API
    public async initWxSDK(url: string) {
        const signatureData = await API.getSignature(url)
        if (signatureData) {
            const { appId, timestamp, nonceStr, signature } = signatureData
            //拿到签名后开始配置
            wx.config({
                debug: false, //开启调试模式
                appId, //!公众号标识
                timestamp, //!生成签名的时间戳
                nonceStr, //!生成签名的随机字符串
                signature, //!签名
                //!配置需要用到哪些wx客户端的api
                jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
            })
            //分享配置
            const wxShareConfig = {
                title: '2023年度账单',
                link: window.location.origin,
                desc: 'Hi! 快来领取你的2023年度账单吧!',
                imgUrl: 'https://git.sends.cc/uploads/-/system/appearance/favicon/1/favicon.ico',
                success() {
                    console.log('share success')
                },
                fail() {
                    //静默失败
                    console.log('share fail')
                },
                cancel() {
                    console.log('share cancel')
                },
                complete() {
                    console.log('share compelete')
                }
            }
            wx.ready(() => {
                wx.onMenuShareTimeline(wxShareConfig)
                wx.onMenuShareAppMessage(wxShareConfig)
                wx.onMenuShareQQ(wxShareConfig)
                wx.onMenuShareWeibo(wxShareConfig)
                wx.onMenuShareQZone(wxShareConfig)
            })
        }
    }
    public async getPayment() {
        this.paymentStatistic = await API.getPayment(this.token)
    }
    public async getLearning() {
        this.learningStatistic = await API.getLearning(this.token)
    }
    public async getRank() {
        this.rankStatistic = await API.getRank(this.token)
    }
    //评分
    public async uploadRate(appraise: number) {
        await API.uploadRate(appraise, this.token)
    }
}
