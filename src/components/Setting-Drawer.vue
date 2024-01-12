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
                    <h2>
                        配置
                        <span id="tip" v-show="tip" v-text="tip"></span>
                    </h2>
                </template>
                <n-list-item>
                    <n-thing>
                        <template #header> 1. 校区</template>
                        <n-space vertical>
                            <n-radio
                                :checked="settingStore.campus === 'xiamen'"
                                label="厦门校区"
                                value="xiamen"
                                @change="changeCampus"
                            />
                            <n-radio
                                :checked="settingStore.campus === 'quanzhou'"
                                label="泉州校区"
                                value="quanzhou"
                                @change="changeCampus"
                            />
                            <n-radio
                                :checked="settingStore.campus === 'huawen'"
                                label="华文校区"
                                value="huawen"
                                @change="changeCampus"
                            />
                        </n-space>
                    </n-thing>
                </n-list-item>
                <n-list-item>
                    <n-thing>
                        <template #header> 2. BGM</template>
                        <n-space vertical>
                            <n-switch v-model:value="settingStore.bgm">
                                <template #checked> 非常好BGM! </template>
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
                <n-list-item>
                    <n-thing>
                        <template #header> 4. 如何评价</template>
                        <n-space vertical>
                            <n-rate
                                v-model:value="rate"
                                clearable
                                :on-update:value="updateRate"
                            ></n-rate>
                            <p v-text="rateNote" style="color: gray"></p>
                        </n-space>
                    </n-thing>
                </n-list-item>
            </n-list>
        </n-drawer-content>
    </n-drawer>
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
    NRate
} from 'naive-ui'
import { useStatusStore } from '@/stores/modules/status'
import type { Campus } from '@/models/modules/user/type'
import { useSettingStore } from '@/stores/modules/setting'
import { computed, onUnmounted, ref, watch } from 'vue'

const { drawerStatus } = defineProps<{
    drawerStatus: {
        active: boolean
        direction: Placement
    }
}>()

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

//获取settingStore,让这里的配置直接同步Store!
const settingStore = useSettingStore()

//提示
const tip = ref('')
let timeoutId: number
const showTip = (content: string, delay: number = 2000) => {
    tip.value = content
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
        tip.value = ''
    }, delay)
}

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
const rateNote = computed(() => {
    let note: string = '好啊,很好啊'
    if (!rate.value) {
        note = '零昏'
    } else if (rate.value=== 1) {
        note = '拉了'
    } else if (rate.value=== 2) {
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
    //TODO 向后端发送请求更新

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

<style scoped>
#tip {
    color: gray;
    font-size: 16px;
}
</style>
