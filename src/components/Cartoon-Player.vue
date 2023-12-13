<template>
    <div id="cartoon-container" @click="tip">
        <slot :visiableIndex="visiableIndex"></slot>
        <!-- 如果有自动播放则不跳出tip! -->
        <div
            id="nextTip"
            v-show="isCompleted && !settingStore.cartoon.autoPlay"
            class="animate__animated animate__fadeInLeft"
        >
            <fade-transition>
                <slot name="tip"> 点击任意处继续!</slot>
            </fade-transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { computed, h, onMounted, onUnmounted, ref, watch, watchEffect } from 'vue'
import { useMessage, NIcon } from 'naive-ui'
import { MdHourglass } from '@vicons/ionicons4'
import FadeTransition from './Fade-Transition.vue'
import { useStatusStore } from '@/stores/modules/status'
import { useSettingStore } from '@/stores/modules/setting'
//Props
//#region
const { cartoonGap, effect, maxIndex, nextRouteName, nextRouteTime } = withDefaults(
    defineProps<{
        //最大索引,超过后会触发effect
        maxIndex: number
        //到达最大索引后触发的effect
        effect?: (visiableIndex?: number) => void
        //下一个路由名,如果有传的话会自动跳转
        nextRouteName?: string
        //漫画显示间隔(毫秒)
        cartoonGap?: number
        //漫画播放完之后跳转路由的等待时间
        nextRouteTime?: number
    }>(),
    {
        //默认两秒后
        cartoonGap: 2000,
        nextRouteTime: 1000
    }
)
//#endregion

//提示
//#region
const message = useMessage()
//漫画没播完前会出提示
const tip = () => {
    if (!isCompleted.value) {
        message.destroyAll()
        message.loading('或许你得先把漫画看完', {
            duration: 1000,
            icon: () => h(NIcon, null, { default: () => h(MdHourglass) }) //使用渲染函数自定义ICON
        })
    }
}
//没点击定时提示
let tipIntervalId: number
const autoTip = () => {
    //定时提示漫画播放完毕!
    if (tipIntervalId) {
        clearInterval(tipIntervalId)
        tipIntervalId = 0
    } else {
        tipIntervalId = setInterval(() => {
            message.success('点击任意处继续!', {
                duration: 1000
            })
        }, 4000)
    }
}
//#endregion

//漫画图索引
//#region

const visiableIndex = ref(1)
//漫画是否播放完成
const isCompleted = computed(() => {
    return visiableIndex.value >= maxIndex
})

//监听索引
const settingStore = useSettingStore()
watch(isCompleted, () => {
    if (isCompleted.value) {
        //如果传了effect则执行
        effect && effect(visiableIndex.value)

        //清空提示
        message.destroyAll()

        //定时提示漫画播放完毕!
        autoTip()

        //如果配置了自动播放,则稍后跳转路由
        if (settingStore.cartoon.autoPlay) {
            setTimeout(() => {
                nextRouteName && router.push({ name: nextRouteName })
            }, nextRouteTime)
        }
    }
})
//定时增加索引
//#region

const statusStore = useStatusStore()

let indexIntervalId: number
//自动增加索引
const autoIncreaseIndex = () => {
    clearInterval(indexIntervalId)
    indexIntervalId = setInterval(() => {
        //TODO: 这里应该抽离出一个执行队列,不然容易逻辑耦合
        //如果全局暂停了就停止增加索引
        if (statusStore.globalPaused) return

        if (isCompleted.value) {
            //停止索引增加
            clearInterval(indexIntervalId)
            return
        }
        visiableIndex.value++
    }, cartoonGap)
}

//如果这小子反复开关快速展示!
watch(
    () => settingStore.cartoon.quickPlay,
    () => {
        if (settingStore.cartoon.quickPlay) {
            visiableIndex.value = maxIndex
        } else {
            //重置索引
            visiableIndex.value = 0
            autoTip()
            autoIncreaseIndex()
        }
    }
)

onMounted(() => {
    //如果开启了快速展示,则直接拉满索引
    if (settingStore.cartoon.quickPlay) {
        visiableIndex.value = maxIndex
    } else {
        autoIncreaseIndex()
    }
})

onUnmounted(() => {
    clearInterval(indexIntervalId)
    clearInterval(tipIntervalId)
})
//#endregion

//#endregion
</script>

<style scoped>
#cartoon-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}
#nextTip {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 5%;
    z-index: 9999;
    text-align: center;
    font-weight: bold;
    color: #9ca3af;
    font-size: 24px;
    cursor: pointer;
}
</style>
