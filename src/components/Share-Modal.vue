<template>
    <n-button style="margin-top: 10px" v-show="!isHide" @click="share">生成图片</n-button>
    <n-modal v-model:show="isShowModal">
        <img :src="imgUrl" style="width: 75%; height: 75%" />
    </n-modal>
    <n-qr-code
        v-show="isHide"
        id="qr-code"
        value="https://annual-bill.sends.cc"
        :size="60"
    ></n-qr-code>
</template>

<script setup lang="ts">
import { NButton, NModal, NQrCode } from 'naive-ui'
import html2canvas from 'html2canvas'
import { ref, nextTick, watch } from 'vue'
import { useStatusStore } from '../stores/modules/status'

const { base } = defineProps<{
    base: string //指定基于哪个元素生成Canvas
}>()
const emit = defineEmits(['openModal', 'closeModal'])

//分享
//#region

//分享图片的路径
const imgUrl = ref('')
const isHide = ref(false)
const isShowModal = ref(false)

watch(isShowModal, (value) => (value ? emit('openModal') : emit('closeModal')))

//分享函数
const share = async () => {
    //分享时要把部分东西隐藏
    isHide.value = true
    //这里要等待vue把视图更新后再执行canvas化
    await nextTick()

    try {
        //缓存: 如果已经有图片了就不用重复生成了
        // if (imgUrl.value) {
        //     isHide.value = false
        //     isShowModal.value = true
        //     return
        // }
        //canvas化
        const canvas = await html2canvas(document.querySelector(base)!, {
            useCORS: true, //这里要允许跨域
            allowTaint: true, //允许不同源,因为用到了微信头像的url
            scrollY: 0,
            scrollX: 0
        })
        //挂载图片路径
        imgUrl.value = canvas.toDataURL('image/png')
        isHide.value = false
        isShowModal.value = true
    } catch (error) {
        alert(error)
    }
}
//#endregion
const statusStore = useStatusStore()
const horizontalOffset = statusStore.appHorizontalOffset * 2

</script>

<style scoped>
#qr-code {
    position: absolute;
    right: v-bind(horizontalOffset + 15 + 'px');
    top: 125px;
}
</style>
