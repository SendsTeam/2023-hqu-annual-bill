<template>
    <div id="cartoon-container" @click="tip">
        <slot :visiableIndex="visiableIndex"></slot>
        <div id="nextTip" v-show="isCompleted" class="animate__animated animate__fadeInLeft">
            <fade-transition>
                <slot name="tip"> 点击任意处继续!</slot>
            </fade-transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { computed, h, onMounted, onUnmounted, ref, watchEffect } from 'vue'
import { useMessage, NIcon } from 'naive-ui'
import { MdHourglass } from '@vicons/ionicons4'
import FadeTransition from './Fade-Transition.vue'
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
        nextRouteTime: 2000
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
//#endregion

//漫画图索引
//#region
const visiableIndex = ref(1)
//漫画是否播放完成
const isCompleted = computed(() => {
    return visiableIndex.value >= maxIndex
})
//监听索引
let once = false
watchEffect(() => {
    if (isCompleted.value && !once) {
        //如果传了effect则执行
        effect && effect(visiableIndex.value)

        //清空提示
        message.destroyAll()

        //定时提示漫画播放完毕!
        tipIntervalId = setInterval(() => {
            message.success('点击任意处继续!', {
                duration: 1000
            })
        }, 8000)

        //once赋值为true
        once = true

        //稍后跳转路由
        setTimeout(() => {
            nextRouteName && router.push({ name: nextRouteName })
        }, nextRouteTime)
    }
})
//定时增加索引
let indexIntervalId: number
onMounted(() => {
    indexIntervalId = setInterval(() => {
        if (isCompleted.value) {
            //停止索引增加
            clearInterval(indexIntervalId)
            console.log('Completed!')
            return
        }
        visiableIndex.value++
    }, cartoonGap)
})
onUnmounted(() => {
    clearInterval(indexIntervalId)
    clearInterval(tipIntervalId)
})

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
    bottom: 10%;
    z-index: 99999;
    text-align: center;
    font-family: '楷体';
    font-weight: bold;
    color: #9ca3af;
    font-size: 24px;
    cursor: pointer;
}
</style>
