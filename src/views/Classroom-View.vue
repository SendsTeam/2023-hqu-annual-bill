<template>
    <cartoon-player
        v-slot="{ visiableIndex }"
        :effect="unlockNextRoute"
        @click="nextRoute"
        :max-index="11"
    >
        <img
            v-show="visiableIndex >= 1"
            class="animate__animated animate__fadeIn"
            src="@/assets/img/cartoon/classroom/classroom-01.jpg"
        />
        <img
            v-show="visiableIndex >= 2"
            class="animate__animated animate__fadeIn"
            src="@/assets/img/cartoon/classroom/classroom-02.jpg"
            style="z-index: 1"
        />
        <img
            v-show="visiableIndex >= 3"
            class="animate__animated animate__fadeIn"
            src="@/assets/img/cartoon/classroom/classroom-03.jpg"
            style="z-index: 1"
        />
        <img
            v-show="visiableIndex >= 4"
            class="animate__animated animate__fadeIn"
            src="@/assets/img/cartoon/classroom/classroom-04.jpg"
        />
        <img
            v-show="visiableIndex >= 5"
            class="animate__animated animate__fadeIn"
            src="@/assets/img/cartoon/classroom/classroom-card.jpg"
            style="z-index: 1"
        />
        <div class="summary-card">
            <div class="animate__animated animate__fadeIn" v-if="visiableIndex >= 6">
                <n-statistic label="你一共上了" tabular-nums>
                    <!-- 这里因为有数值动画所以需要用v-if! -->
                    <span class="animate__animated animate__fadeIn" v-if="visiableIndex >= 7">
                        <n-number-animation ref="numberAnimationInstRef" :from="0" :to="818" />
                    </span>
                    <template #suffix>
                        <span class="animate__animated animate__fadeIn" v-show="visiableIndex >= 8"
                            >节</span
                        >
                    </template>
                </n-statistic>
            </div>
            <div class="animate__animated animate__fadeIn" v-show="visiableIndex >= 9">
                <n-statistic label="上的最多的课是" tabular-nums>
                    <!-- 这里要做个字体随长度动态缩放 -->
                    <div
                        class="animate__animated animate__fadeIn course-name"
                        v-show="visiableIndex >= 10"
                    >
                        数据结构
                    </div>
                </n-statistic>
            </div>
        </div>
    </cartoon-player>
</template>

<script setup lang="ts">
import CartoonPlayer from '@/components/Cartoon-Player.vue'
import router from '@/router'
import { NStatistic, NNumberAnimation } from 'naive-ui'
import { ref } from 'vue'
//等动画播放完再开放路由
const isCartoonReady = ref(false)
//解锁路由
const unlockNextRoute = () => {
    isCartoonReady.value = true
}
const nextRoute = () => {
    if (isCartoonReady.value) {
        router.push({ name: 'library' })
    } else {
        //TODO: 这里可以加个提示啥的
    }
}
</script>

<style scoped>
/* 为了方便img请写在调用方! */
img {
    height: 110%;
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
.summary-card {
    position: absolute;
    display: flex;
    flex-direction: column;
    font-size: 10px;
    width: 100px;
    height: 175px;
    top: 51%;
    left: 53%;
    z-index: 1;
    padding: 10px;
}
.course-name {
    font-size: 20px;
}
</style>
