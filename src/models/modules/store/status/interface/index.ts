import type { Page } from '@/models/modules/page/type'

export interface I_StatusStoreState {
    hasConfigured: boolean //是否完成初始配置
    currentPage: Page
    isPC: boolean
    isReady: boolean //是否准备就绪
    isSettingAvailable: boolean //设置是否可见
}

export interface I_StatusStoreAction {}

export interface I_StatusStoreGetter {}
