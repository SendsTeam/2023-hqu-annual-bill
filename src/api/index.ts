import axios from 'axios'
import { getFormattedTime } from '../util/index'
import {
    type I_LearningStatistic,
    type I_PaymentStatistic,
    type I_RankStatistic
} from '@/models/modules/bill/interface/index'
import { type I_WxSignature } from '@/models/modules/wx/interface/index'
import type { Ref } from 'vue'

const baseUrl = 'https://api.sends.cc'
class _API {
    private _userAPI = axios.create({
        baseURL: `${baseUrl}/user/`
    })
    private _yearBillAPI = axios.create({
        baseURL: `${baseUrl}/yearBill/`
    })
    //登陆
    public async login(code: string): Promise<{
        token: string
        avatar: string
        nickName: string
    } | null> {
        try {
            const { data } = await this._userAPI.post('bill_login', {
                code
            })
            if (data.code === 1000) {
                return {
                    token: data.data.token,
                    avatar: data.data.avatar,
                    nickName: data.data.nick_name
                }
            } else {
                alert(`登陆失败! ${data.msg}`)
                return null
            }
        } catch (error) {
            alert(`登陆失败! ${error}`)
            return null
        }
    }
    //!初始化用户数据 必须要初始化之后才能拿到数据
    // 初始化之后要在本地存储标识!
    public initUser(token: string, status: Ref<string>): Promise<string> {
        return new Promise((resolve, reject) => {
            // !缓存 已弃用,不建议开启!!!
            // if (localStorage.getItem('isInitialized')) {
            //     status.value = '数据已初始化'
            //     resolve('数据已初始化')
            // } else {
            try {
                //开启ws
                const ws = new WebSocket('wss://api.sends.cc/yearBill/init', token)

                ws.onmessage = (evt) => {
                    //注意ws传的是字符串JSON,要解析成JS对象
                    const data = JSON.parse(evt.data)
                    //更新状态
                    status.value = data.msg
                    if (data.code == 1000) {
                        //初始化成功
                        // localStorage.setItem('isInitialized', 'true')
                        resolve(data.msg)
                    } else if (data.code == 1001) {
                        //!爆满,交给调用链catch进行重进界面处理
                        reject(data.msg)
                    }
                }
            } catch (error) {
                alert(`初始化用户失败! ${error}`)
                reject(error)
            }
        })
    }
    //获取付款信息
    public async getPayment(token: string): Promise<I_PaymentStatistic | null> {
        try {
            const { data } = await this._yearBillAPI.get('pay', {
                headers: {
                    token
                }
            })
            if (data.code === 1000) {
                const origin = data.data //别名原始数据

                //解析调整数据
                const paymentStatistic: I_PaymentStatistic = {
                    restaurant: {
                        favorite: {
                            name: origin.favorite_restaurant,
                            total: origin.favorite_restaurant_pay
                        },
                        total: origin.restaurant_pay,
                        //这里要格式化时间
                        earliestTime: getFormattedTime(origin.earlyTime.seconds),
                        latestTime: getFormattedTime(origin.lastTime.seconds)
                    },
                    library: {
                        total: origin.library_pay ? origin.library_pay : 0
                    },
                    other: {
                        total: origin.other_pay
                    }
                }
                return paymentStatistic
            } else {
                alert(`获取支付流水数据失败! ${data.msg}`)
                return null
            }
        } catch (error) {
            alert(`获取支付流水数据失败! ${error}`)
            return null
        }
    }
    //获取学习信息
    public async getLearning(token: string): Promise<I_LearningStatistic | null> {
        try {
            const { data } = await this._yearBillAPI.get('learn', {
                headers: {
                    token
                }
            })
            if (data.code === 1000) {
                const origin = data.data
                const learningStatistic: I_LearningStatistic = {
                    lesson: {
                        morningEight: origin.eight ? origin.eight : 0,
                        eveningTen: origin.ten ? origin.ten : 0,
                        total: origin.sum_lesson,
                        most: {
                            name: origin.most_course,
                            total: origin.most
                        }
                    }
                }
                return learningStatistic
            } else {
                alert(`获取学习数据失败! ${data.msg}`)
                return null
            }
        } catch (error) {
            alert(`获取学习数据失败! ${error}`)
            return null
        }
    }
    //获取排名
    public async getRank(token: string): Promise<I_RankStatistic | null> {
        try {
            const { data } = await this._yearBillAPI.get('rank', {
                headers: {
                    token
                }
            })
            if (data.code === 1000) {
                const origin = data.data
                const rankStatistic: I_RankStatistic = {
                    index: origin.index,
                    total: origin.count
                }
                return rankStatistic
            } else {
                alert(`获取排名数据失败! ${data.msg}`)
                return null
            }
        } catch (error) {
            alert(`获取排名数据失败! ${error}`)
            return null
        }
    }
    //获取微信签名
    public async getSignature(url: string = 'annual-bill.sends.cc'): Promise<I_WxSignature | null> {
        try {
            const { data } = await this._userAPI.post('jssdk', {
                url
            })
            if (data.code === 1000) {
                const origin = data.data
                return {
                    appId: origin.app_id,
                    timestamp: origin.timestamp,
                    nonceStr: origin.nonce_str,
                    signature: origin.signature
                }
            } else {
                alert(`获取微信签名失败! ${data.msg}`)
                return null
            }
        } catch (error) {
            alert(`获取微信签名失败! ${error}`)
            return null
        }
    }
    //上传评分
    public async uploadRate(appraise: number, token: string): Promise<void> {
        try {
            await this._yearBillAPI.post('appraise', {
                appraisal: appraise
            }, {
                headers: {
                    token
                }
            })
        } catch (error) {
            console.log(error)
        }

    }
}

export const API = new _API()
