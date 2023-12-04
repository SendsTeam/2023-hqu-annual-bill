export interface I_LearningStatistic {
    eight: number //早上第八节
    ten: number //晚上第十节
    lessonSum: number //上课总数
    mostLesson: {   //今年上过最多的课
        name: string
        sum: number
    }
}

//付费
export interface I_PaymentStatistic {

}
