import axios from 'axios'
import { getFormattedTime } from '../util/index'
import {
    type I_LearningStatistic,
    type I_PaymentStatistic
} from '@/models/modules/bill/interface/index'
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
    public async initUser(token: string) {
        //TODO: 这里之后会重构成websocket
        if (localStorage.getItem('isInitialized')) {
            return
        } else {
            try {
                const { data } = await this._yearBillAPI.get('init', {
                    headers: {
                        token
                    }
                })
                if (data.code === 1000) {
                    localStorage.setItem('isInitialized', 'true')
                } else {
                    alert(`初始化用户失败! ${data.msg}`)
                }
            } catch (error) {
                alert(`初始化用户失败! ${error}`)
            }
        }
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
                        eveningTen: origin.eveningTen ? origin.eveningTen : 0,
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
}

export const API = new _API()
