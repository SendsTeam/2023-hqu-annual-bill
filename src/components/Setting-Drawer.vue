<!-- eslint-disable vue/no-mutating-props -->
<!-- 场景比较特殊,需要改Prop! -->
<template>
    <n-drawer
        v-model:show="drawerStatus.active"
        width="75%"
        :placement="drawerStatus.direction"
        :z-index="99999"
        @after-enter="onAfterEnter"
        @after-leave="onAfterLeave"
    >
        <n-drawer-content>
            <n-list>
                <template #header>
                    <h2 id="drawer-header">
                        <div style="display: flex">
                            <span>配置</span>
                            <!-- 电量彩蛋 -->
                            <div
                                v-show="isEgg"
                                v-text="batteryStatus"
                                style="flex: 1; display: flex; flex-direction: row-reverse"
                            ></div>
                        </div>
                        <p id="tip" v-show="tip" v-text="tip"></p>
                    </h2>
                </template>
                <!-- 校区 -->
                <n-list-item>
                    <n-thing>
                        <template #header> 1. 校区</template>
                        <n-space vertical>
                            <n-radio
                                :checked="settingStore.campus === 'xiamen'"
                                label="厦门校区"
                                value="xiamen"
                                :disabled="!statusStore.isSettingAvailable"
                                @change="changeCampus"
                            />
                            <n-radio
                                :checked="settingStore.campus === 'quanzhou'"
                                label="泉州校区"
                                value="quanzhou"
                                :disabled="!statusStore.isSettingAvailable"
                                @change="changeCampus"
                            />
                            <n-radio
                                :checked="settingStore.campus === 'longzhouchi'"
                                label="龙舟池校区"
                                value="longzhouchi"
                                :disabled="!statusStore.isSettingAvailable"
                                @change="changeCampus"
                            />
                        </n-space>
                    </n-thing>
                </n-list-item>
                <!-- BGM -->
                <n-list-item>
                    <n-thing>
                        <template #header>
                            2. BGM
                            <p style="color: gray; font-size: 10px">
                                重新进入后需要重新开关bgm才能生效。
                            </p>
                        </template>
                        <n-space vertical>
                            <n-switch v-model:value="settingStore.bgm">
                                <template #checked> 一如往常的风景~ </template>
                                <template #unchecked> 真的不听听吗 </template>
                            </n-switch>
                            <img
                                v-show="settingStore.bgm"
                                src="@/assets/gif/chiikawa-03.jpg"
                                style="width: 50%"
                            />
                            <img
                                v-show="!settingStore.bgm"
                                src="@/assets/gif/chiikawa-04.jpg"
                                style="width: 50%"
                            />
                        </n-space>
                    </n-thing>
                </n-list-item>
                <!-- 漫画播放 -->
                <n-list-item>
                    <n-thing>
                        <template #header> 3. 漫画播放</template>
                        <n-space>
                            <n-space>
                                <p>自动播放</p>
                                <n-switch
                                    :round="false"
                                    v-model:value="settingStore.cartoon.autoPlay"
                                />
                            </n-space>
                            <n-space></n-space>
                            <n-space>
                                <p>快速播放</p>
                                <n-switch
                                    :round="false"
                                    v-model:value="settingStore.cartoon.quickPlay"
                                />
                            </n-space>
                        </n-space>
                    </n-thing>
                </n-list-item>
                <!-- 彩蛋 -->
                <n-list-item>
                    <n-thing>
                        <template #header>4. 彩蛋</template>
                        <n-space vertical>
                            <n-switch :round="false" v-model:value="settingStore.egg">
                                <template #checked> 玩的开心🥳 </template>
                                <template #unchecked> 原汁原味 </template>
                            </n-switch>
                        </n-space>
                    </n-thing>
                </n-list-item>
                <!-- 评价 -->
                <n-list-item>
                    <n-thing>
                        <template #header> 5. 如何评价本次活动</template>
                        <n-space vertical>
                            <n-space>
                                <div style="display: flex">
                                    <n-rate
                                        style="margin: 0 auto"
                                        v-model:value="rate"
                                        clearable
                                        :on-update:value="updateRate"
                                    ></n-rate>
                                </div>
                                <n-button
                                    :disabled="hasSubmittedRate"
                                    @click="submitRate"
                                    size="small"
                                >
                                    提交
                                </n-button>
                            </n-space>

                            <p v-text="rateNote" style="color: gray"></p>
                        </n-space>
                    </n-thing>
                </n-list-item>
            </n-list>
        </n-drawer-content>
    </n-drawer>
    <div id="black-hole" v-show="!battery"></div>
</template>

<script setup lang="ts">
import type { Placement } from 'naive-ui/es/drawer/src/DrawerBodyWrapper'
import {
    NDrawer,
    NDrawerContent,
    NList,
    NListItem,
    NThing,
    NSpace,
    NRadio,
    NSwitch,
    NRate,
    NButton,
    useMessage
} from 'naive-ui'
import { useStatusStore } from '@/stores/modules/status'
import type { Campus } from '@/models/modules/user/type'
import { useSettingStore } from '@/stores/modules/setting'
import { computed, onUnmounted, ref, watch } from 'vue'
import { useAudioStore } from '@/stores/modules/audio'
import { useUserStore } from '../stores/modules/user'
import { storeToRefs } from 'pinia'

const { drawerStatus } = defineProps<{
    drawerStatus: {
        active: boolean
        direction: Placement
    }
}>()

//Store Getting
const audioStore = useAudioStore()
const settingStore = useSettingStore()

//控制Drawer
//#region
const statusStore = useStatusStore()
//全局暂停
const globalPause = () => {
    statusStore.globalPaused = true
}
//恢复全局
const globalResume = () => {
    statusStore.globalPaused = false
}

//进入Drawer时的回调
const onAfterEnter = () => {
    //全局暂停
    globalPause()
}

//退出Drawer时的回调
const onAfterLeave = () => {
    //恢复全局
    globalResume()
    //保存更改
    saveChange()
}
//#endregion

//具体设置
//#region

//提示
//#region
const tip = ref('')
let timeoutId: number
const showTip = (content: string, delay: number = 2000) => {
    tip.value = content
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
        tip.value = ''
    }, delay)
}
//#endregion

//电量彩蛋
//#region
const { egg: isEgg } = storeToRefs(settingStore)
const battery = ref(100)
let batteryIntervalId = setInterval(() => {
    //没开彩蛋不用管
    if (!isEgg.value) {
        return
    }
    if (battery.value) {
        battery.value--
    } else {
        //当电量为0时触发停电神曲
        clearInterval(batteryIntervalId)
        audioStore.swap('battery.mp3')
        useMessage().success('噔 噔 咚')
        setTimeout(() => {
            battery.value = 721
            //TODO这里是否应该恢复之前的bgm
            audioStore.swap(audioStore.lastAudioName, true)
        }, 1000 * 61)
    }
}, 5000)
onUnmounted(() => {
    clearInterval(batteryIntervalId)
})
const batteryStatus = computed(() => {
    if (battery.value === 721) {
        return '🏆' + battery.value + '%'
    }
    if (battery.value > 88) {
        return '🟩🟩🟩🟩🟩' + battery.value + '%'
    } else if (battery.value > 66) {
        return '🟩🟩🟩🟩' + battery.value + '%'
    } else if (battery.value > 55) {
        return '🟩🟩🟩' + battery.value + '%'
    } else if (battery.value > 54) {
        return '🟨🟨🟨' + battery.value + '%'
    } else if (battery.value > 33) {
        return '🟨🟨' + battery.value + '%'
    } else {
        return '🟥' + battery.value + '%'
    }
})

//#endregion

//校区
//#region
//改变选项的callback
const changeCampus = (e: Event) => {
    settingStore.campus = (e.target as HTMLInputElement).value as Campus
}
//#endregion

//播放设置
//#region
watch(
    () => settingStore.cartoon.quickPlay,
    () => {
        if (settingStore.cartoon.quickPlay) {
            showTip('debug 10 enabled!')
        } else {
            showTip('debug 10 disabled!')
        }
    }
)

//#endregion

//评分设置
//#region
const rate = ref<number>(5)
const hasSubmittedRate = ref(false)
const rateNote = computed(() => {
    if (hasSubmittedRate.value) {
        return '感谢您的评价!'
    }

    let note: string = '好啊,很好啊'
    if (!rate.value) {
        note = '零昏'
    } else if (rate.value === 1) {
        note = '拉了'
    } else if (rate.value === 2) {
        note = '一般般吧'
    } else if (rate.value === 3) {
        note = '还不错的'
    } else if (rate.value === 4) {
        note = '很不错啊'
    } else if (rate.value === 5) {
        note = '好啊,很好啊'
    }
    return note
})
const updateRate = (value: number) => {
    rate.value = value
}

const submitRate = () => {
    if (hasSubmittedRate.value) {
        return
    }
    useUserStore().uploadRate(Math.floor(rate.value))
    hasSubmittedRate.value = true
}

//#endregion

//保存更改
//#region
const saveChange = () => {
    localStorage.setItem('setting', JSON.stringify(settingStore.$state))
}
//退出时保存更改
onUnmounted(() => {
    saveChange()
})
//#endregion

//#endregion
</script>

<style lang="less" scoped>
#drawer-header {
    font-weight: normal;
    #tip {
        color: gray;
        font-size: 16px;
    }
}
#black-hole {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99999999;
    background-color: black;
}
</style>
