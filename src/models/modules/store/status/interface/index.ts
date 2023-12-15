export interface I_StatusStoreState {
    hasConfigured: boolean //是否完成初始配置
    globalPaused: boolean //全局暂停
    map: {
        current: 'canteen' | 'classroom' | 'library' | 'dormitory' | 'door'
        active: Record<'canteen' | 'classroom' | 'library' | 'dormitory' | 'door', boolean>
    }
    isPC: boolean
    isReady: boolean //是否准备就绪
    isSettingAvailable: boolean //设置是否可见
}

export interface I_StatusStoreAction {}

export interface I_StatusStoreGetter {}
