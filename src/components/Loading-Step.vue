<!-- 这里负责数据获取,并且映射过程到进度条 -->
<template>
    <n-steps vertical :current="current as number" :status="currentStatus">
        <n-step title="登陆" description="" />
        <n-step title="初始化数据" description="流量较大,会稍微久点🕘" />
        <n-step title="获取流水数据" description="" />
    </n-steps>
</template>

<script setup lang="ts">
import { NStep, NSteps, type StepsProps } from 'naive-ui'
import { ref, watch } from 'vue'
import { useUserStore } from '@/stores/modules/user'
import { useStatusStore } from '@/stores/modules/status'

//事件声明
const emit = defineEmits<{
    finished: []
}>()
//初始化状态量
const current = ref(1)
const maxStep = 3
const currentStatus = ref<StepsProps['status']>('process')

const userStore = useUserStore()
//Promise链
userStore
    .login()
    .then(async () => {
        current.value++
        await userStore.init()
    })
    .then(async () => {
        current.value++
        await userStore.getStatistics()
    })
    .then(() => {
        current.value++
    })

//进度完成后触发
const statusStore = useStatusStore()
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
