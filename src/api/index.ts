import axios from 'axios'
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
    public async login(code: string): Promise<string> {
        try {
            const { data } = await this._userAPI.post('bill_login', {
                code
            })
            if (data.code === 1000) {
                return data.data
            } else {
                alert(`something was wrong! ${data.msg}`)
                return ''
            }
        } catch (error) {
            alert(`something was wrong! ${error}`)
            return ''
        }
    }
    //!初始化用户数据 必须要初始化之后才能拿到数据
    // 初始化之后要在本地存储标识!
    public async initUser(token: string) {
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
                    alert(`something was wrong! ${data.msg}`)
                }
            } catch (error) {
                alert(`something was wrong! ${error}`)
            }
        }
    }
    //获取付款信息
    public async getPayment(token: string): Promise<I_PaymentStatistic | null> {
        if (localStorage.getItem('isInitialized')) {
            return null
        } else {
            try {
                const { data } = await this._yearBillAPI.get('pay', {
                    headers: {
                        token
                    }
                })
                if (data.code === 1000) {
                    return data.data as I_PaymentStatistic
                } else {
                    alert(`something was wrong! ${data.msg}`)
                    return null
                }
            } catch (error) {
                alert(`something was wrong! ${error}`)
                return null
            }
        }
    }
    //获取学习信息
    public async getLearning(token: string): Promise<I_LearningStatistic | null> {
        if (localStorage.getItem('isInitialized')) {
            return null
        } else {
            try {
                const { data } = await this._yearBillAPI.get('learn', {
                    headers: {
                        token
                    }
                })
                if (data.code === 1000) {
                    return data.data as I_LearningStatistic
                } else {
                    alert(`something was wrong! ${data.msg}`)
                    return null
                }
            } catch (error) {
                alert(`something was wrong! ${error}`)
                return null
            }
        }
    }
}

export const API = new _API()
