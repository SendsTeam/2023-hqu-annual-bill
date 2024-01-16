<template>
    <n-layout>
        <n-layout-header>
            <n-space vertical>
                <h2>✨欢迎来到年度账单✨</h2>
                <!-- <n-divider></n-divider> -->
                <p>在开始前,需要一些设置来确保你的体验</p>
                <p>在你配置完之后,配置信息将被保存</p>
                <p>再次访问年度账单将不会再出现这个界面</p>
                <p>但你仍然可以在设置里更改相关选项</p>
                <p>Tip:左右滑动可以呼出设置哦</p>
                <img src="@/assets/gif/chiikawa.png" />
            </n-space>
        </n-layout-header>
        <!-- <n-divider /> -->
        <n-layout-content>
            <n-space vertical>
                <n-list>
                    <template #header> <h2>配置</h2> </template>
                    <n-list-item>
                        <n-card :bordered="false" title="1. 校区(必选)">
                            <n-space>
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
                                    :checked="settingStore.campus === 'longzhouchi'"
                                    label="龙舟池校区"
                                    value="longzhouchi"
                                    @change="changeCampus"
                                />
                            </n-space>
                        </n-card>
                    </n-list-item>
                    <n-list-item>
                        <n-card :bordered="false" title="2. BGM">
                            <n-space vertical>
                                <n-switch v-model:value="settingStore.bgm">
                                    <template #checked> 非常好BGM! </template>
                                    <template #unchecked> 真的不听听吗 </template>
                                </n-switch>
                                <img
                                    v-show="settingStore.bgm"
                                    src="@/assets/gif/chiikawa-02.jpg"
                                    style="width: 50%"
                                />
                                <img
                                    v-show="!settingStore.bgm"
                                    src="@/assets/gif/chiikawa-04.jpg"
                                    style="width: 50%"
                                />
                            </n-space>
                        </n-card>
                    </n-list-item>
                    <n-list-item>
                        <n-card :bordered="false" title="3. 漫画播放">
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
                        </n-card>
                    </n-list-item>
                    <n-list-item>
                        <n-card :bordered="false" title="4. 彩蛋">
                            <n-space vertical>
                                <n-switch
                                    :round="false"
                                    v-model:value="settingStore.egg"
                                    @update-value="openEgg"
                                >
                                    <template #checked> 玩的开心🥳 </template>
                                    <template #unchecked> 原汁原味 </template>
                                </n-switch>
                                <img v-show="msgCount >= 50" src="@/assets/img/egg/trophy.png" />
                            </n-space>
                        </n-card>
                    </n-list-item>
                    <n-list-item>
                        <n-card :bordered="false" title="5. 进度条">
                            <loading-step @finished="() => (isDataReady = true)" />
                        </n-card>
                    </n-list-item>
                    <template #footer>
                        <n-space>
                            <n-button type="primary" dashed>年度账单!</n-button>
                            <n-button type="primary" :disabled="!isDataReady" @click="start"
                                >启动</n-button
                            >
                        </n-space>
                    </template>
                </n-list>
            </n-space>
        </n-layout-content>

        <n-layout-footer>
            <!-- 这里应该根据用户选择的选项来展示信息 -->
            <p>{{ footerInfo }}</p>
        </n-layout-footer>
    </n-layout>
</template>

<script setup lang="ts">
import LoadingStep from '@/components/Loading-Step.vue'
import type { Campus } from '@/models/modules/user/type'
import router from '@/router'
import { useSettingStore } from '@/stores/modules/setting'
import {
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutFooter,
    NSpace,
    NSwitch,
    NCard,
    NList,
    NListItem,
    NRadio,
    useMessage,
    NButton
} from 'naive-ui'
import { computed, ref } from 'vue'

//StoreGetting... 让这里的配置直接同步Store!
const settingStore = useSettingStore()

//校区
//#region
//改变选项的callback
const changeCampus = (e: Event) => {
    settingStore.campus = (e.target as HTMLInputElement).value as Campus
}
//#endregion

//开启彩蛋
//#region
//第一个彩蛋!
//TODO: 后续可以把彩蛋的逻辑封装成组合式函数
const message = useMessage()
let msgCount = ref(0)
const openEgg = (value: boolean) => {
    if (msgCount.value === 10) {
        message.destroyAll()
        message.error('???你真的这么闲吗???')
        msgCount.value++
        return
    }
    if (msgCount.value === 20) {
        message.destroyAll()
        message.error('别点了,这里真的没彩蛋!')
        msgCount.value++
        return
    }
    //我去,不会真的有人点50次吧!
    if (msgCount.value === 50) {
        message.destroyAll()
        message.error('好好好,这么玩是吧')
        msgCount.value++
        return
    }

    if (value && msgCount.value < 50) {
        message.success('Something has changed!', {
            duration: 1000
        })
        msgCount.value++
    }
}
//#endregion

//Footer计算显示用户信息
//#region
const footerInfo = computed(() => {
    if (msgCount.value >= 50) {
        return '第一个彩蛋!'
    }
    switch (settingStore.campus) {
        case 'xiamen':
            return '非常好账单,爱来自厦门校区'
        case 'quanzhou':
            return '非常好账单,爱来自泉州校区'
        case 'longzhouchi':
            return '非常好账单,爱来自龙舟池校区'
        default:
            return '你还没选择校区呢!'
    }
})
//#endregion

//进入Home界面
//#region
//检查配置是否已经完成配置
const check = () => {
    //这里其实只有校区是需要检查的
    if (!settingStore.campus) {
        message.error('你还没选择校区呢!', {
            duration: 1000
        })
        return false
    } else {
        return true
    }
}
//检查是否已经准备好数据
const isDataReady = ref(false)
//记录信息
const recordSetting = () => {
    localStorage.setItem('setting', JSON.stringify(settingStore.$state))
}
//进入主界面
const start = () => {
    if (!check()) {
        return
    }
    recordSetting()
    router.replace({ name: 'home' })
}
//#endregion
</script>

<style lang="less" scoped>
.n-layout-header {
    padding: 20px;
    p {
        color: grey;
    }
}
.n-layout-content {
    padding: 20px;
}
.n-layout-footer {
    padding: 20px;
}
</style>
