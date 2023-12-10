//原始接口数据
export interface I_OriginLearningStatistic {

}
export interface I_OriginPaymentStatistic {
    
}

//解析后的数据

export interface I_LearningStatistic {
    lesson: {
        morningEight: number //早上第八节
        eveningTen: number //晚上第十节
        total: number //上课总数
        most: {
            //今年上过最多的课
            name: string
            total: number
        }
    }
}

//付费
export interface I_PaymentStatistic {
    restaurant: {
        favorite: {
            name: string //最喜欢的餐厅的名字
            total: number //最喜欢的餐厅消费
        }
        total: number //餐厅消费总额
        earliestTime: string //今年最早来到食堂的时间,注意不是第一次来食堂的时间
        latestTime: string //今年最晚来到食堂的时间,注意不是最后一次来食堂的时间
    }
    //其他消费
    other: {
        total: number
    }
}
