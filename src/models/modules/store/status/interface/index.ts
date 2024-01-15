export interface I_StatusStoreState {
    hasConfigured: boolean //是否完成初始配置
    globalPaused: boolean //全局暂停
    map: {
        current: 'canteen' | 'classroom' | 'library' | 'dormitory' | 'door'
        active: Record<'canteen' | 'classroom' | 'library' | 'dormitory' | 'door', boolean>
    }
    appWidth: number //app根元素的宽度
    appHeight: number //app根元素的高度
    appHorizontalOffset: number //app根元素相对于整个视窗的水平偏移量
    appVerticalOffset: number //app根元素相对于整个视窗的垂直偏移量
    isPC: boolean   //是否为PC端
    isReady: boolean //是否准备就绪
    isSettingAvailable: boolean //设置是否可见
}

export interface I_StatusStoreAction { }

export interface I_StatusStoreGetter { }
