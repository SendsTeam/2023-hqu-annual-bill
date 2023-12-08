import type { Page } from '@/models/modules/page/type'

export interface I_StatusStoreState {
    hasConfigured: boolean //是否完成初始配置
    currentPage: Page
    isPC: boolean
}

export interface I_StatusStoreAction {}

export interface I_StatusStoreGetter {}
