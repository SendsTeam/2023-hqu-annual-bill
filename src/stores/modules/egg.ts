import { defineStore } from 'pinia'

//彩蛋统计
export const eggStore = defineStore('eggStore', {
    state: () => ({
        egged: 0, //触发的彩蛋数量
        total: 1 //全部彩蛋数
    })
})
