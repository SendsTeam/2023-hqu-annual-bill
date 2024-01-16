import { defineStore } from 'pinia'

export const useStatusStore = defineStore('StatusStore', {
    state: () => ({
        hasConfigured: false,
        map: {
            //一开始都是从大门进入
            current: 'door' as 'canteen' | 'classroom' | 'library' | 'dormitory' | 'door',
            active: {
                door: true,
                canteen: false,
                classroom: false,
                dormitory: false,
                library: false
            } as Record<'canteen' | 'classroom' | 'library' | 'dormitory' | 'door', boolean>
        },
        appWidth: document.querySelector('#app')!.clientWidth,
        appHorizontalOffset: (window.innerWidth - document.querySelector('#app')!.clientWidth) / 2,
        appHeight: document.querySelector('#app')!.clientHeight,
        appVerticalOffset: (window.innerHeight - document.querySelector('#app')!.clientHeight) / 2,
        globalPaused: false, //全局暂停
        client: '' as 'PC' | 'Android' | 'IOS',
        isReady: false,
        isSettingAvailable: false
    })
})
