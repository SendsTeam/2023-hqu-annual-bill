<template>
    <!-- 分享页 -->
    <n-button v-show="!isShared" @click="share">生成图片</n-button>
    <n-modal v-model:show="showModal">
        <img :src="imgUrl" style="width: 75%; height: 75%" />
    </n-modal>
</template>

<script setup lang="ts">
import { NButton, NModal } from 'naive-ui'
import html2canvas from 'html2canvas'
import { ref, onMounted, nextTick } from 'vue'

const { base } = defineProps<{
    base: string //指定基于哪个元素生成Canvas
}>()

//分享
//#region

//分享图片的路径
const imgUrl = ref('')
const isShared = ref(false)
const showModal = ref(false)
//是否能被分享
const canBeShared = ref(false)

//分享函数
const share = async () => {
    //锁
    if (!canBeShared.value) return

    //分享时要把部分东西隐藏
    isShared.value = true
    //这里要等待vue把视图更新后再执行canvas化
    await nextTick()

    try {
        //如果已经有图片了就不用重复生成了
        if (imgUrl.value) {
            isShared.value = false
            showModal.value = true
            return
        }
        //canvas化
        const canvas = await html2canvas(document.querySelector(base)!, {
            useCORS: true, //这里要允许跨域
            allowTaint: true, //允许不同源,因为用到了微信头像的url
            scrollY: 0,
            scrollX: 0
        })
        //挂载图片路径
        imgUrl.value = canvas.toDataURL('image/png')
        isShared.value = false
        showModal.value = true
    } catch (error) {
        alert(error)
    }
}
//挂载后允许分享
onMounted(() => {
    canBeShared.value = true
})
//#endregion
</script>

<style scoped></style>
