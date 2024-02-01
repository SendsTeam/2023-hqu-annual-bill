<!-- 这里负责数据获取,并且映射过程到进度条 -->
<template>
    <n-steps vertical :current="current as number" :status="currentStatus">
        <n-step title="登录" description="" />
        <n-step title="初始化数据(当前仅支持加载学生数据)" :description="status" />
        <n-step title="初始化微信SDK" description="" />
        <n-step title="获取流水数据" description="" />
    </n-steps>
</template>

<script setup lang="ts">
import { NStep, NSteps, type StepsProps } from 'naive-ui'
import { ref, watch } from 'vue'
import { useUserStore } from '@/stores/modules/user'
import { useStatusStore } from '@/stores/modules/status'

//Store getting...
const userStore = useUserStore()
const statusStore = useStatusStore()

//事件声明
const emit = defineEmits<{
    finished: []
}>()
//初始化状态量
const current = ref(1)
const maxStep = 4
const currentStatus = ref<StepsProps['status']>('process')

//Promise链
//映射初始化ws进度
const status = ref('流量较大,会稍微久点🕘')
const success = ref(false)
userStore
    .login()
    .then(async (isLogin) => {
        success.value = isLogin
        if (!isLogin) return

        current.value++
        await userStore.init(status)
    })
    .catch((msg: string) => {
        //提示用户重新进入界面!
        alert(msg)
        //刷新
        window.location.href = window.location.origin
    })
    .then(async () => {
        if (!success.value) return
        current.value++
        await userStore.initWxSDK(window.location.href.split('#')[0])
    })
    .then(async () => {
        if (!success.value) return
        current.value++
        await userStore.getStatistics()
    })
    .then(() => {
        if (!success.value) return
        current.value++
    })

//进度完成后触发
watch(current, () => {
    if (current.value > maxStep) {
        //通知状态仓库已经完成全部准备
        statusStore.isReady = true
        //触发完成的hook
        emit('finished')
    }
})
</script>

<style scoped></style>
