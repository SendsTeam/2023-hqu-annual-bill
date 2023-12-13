import type { Campus } from '@/models/modules/user/type'
export interface I_SettingStoreState {
    campus: Campus | ''
    bgm: boolean //是否开启BGM
    cartoon: {
        autoPlay: boolean //自动播放
        quickPlay: boolean //重复播放
    }
    egg: boolean //是否开启彩蛋
}

export interface I_SettingStoreAction {}

export interface I_SettingStoreGetter {}
