<template>
    <div id="summary-container">
        <div id="user-info">
            <n-space>
                <h2>Hi!</h2>
                <n-badge value="0">
                    <n-avatar size="small" :src="userStore.user.avatar" />
                </n-badge>
                <h2 id="nick-name">{{ userStore.user.nickName }}</h2>
            </n-space>
        </div>

        <n-statistic label="截止目前已有" tabular-nums>
            <!-- 这里到时候少一位,然后setTimeOut +1 -->
            <n-number-animation :from="0" :to="1140" />
            <template #suffix>
                <span class="animate__animated animate__fadeIn">位hquer解锁年度账单!</span>
            </template>
        </n-statistic>
        <n-statistic label="恭喜你成为" tabular-nums>
            <template #prefix>
                <span class="animate__animated animate__fadeIn">第</span>
            </template>
            <n-number-animation :from="0" :to="userStore.user.rankStatistic?.index" />
            <template #suffix>
                <span class="animate__animated animate__fadeIn">名✨</span>
            </template>
        </n-statistic>

        <n-divider />

        <div id="summary-area">
            <div class="summary-line">
                <img
                    src="../assets/img/map/xiamen/active/library-active.png"
                    style="width: 100px"
                />
                <div class="summary-data">
                    <n-statistic label="借书花销为" tabular-nums>
                        <!-- 这里因为有数值动画所以需要用v-if! -->
                        <n-number-animation
                            :from="0.0"
                            :precision="2"
                            :to="userStore.user.paymentStatistic?.library.total"
                        />
                        <template #suffix> 元 </template>
                    </n-statistic>
                </div>
            </div>
            <div class="summary-line" style="height: 100px">
                <img
                    src="../assets/img/map/xiamen/active/classroom-active.png"
                    style="width: 150px"
                />
                <div class="summary-data">
                    <n-statistic label="你一共上了" tabular-nums>
                        <!-- 这里因为有数值动画所以需要用v-if! -->
                        <n-number-animation
                            :from="0"
                            :to="userStore.user.learningStatistic?.lesson.total"
                        />
                        <template #suffix> 节 </template>
                    </n-statistic>
                    <n-statistic label="上的最多的课是" tabular-nums>
                        <!-- 这里因为有数值动画所以需要用v-if! -->
                        {{ userStore.user.learningStatistic?.lesson.most.name }}
                    </n-statistic>
                </div>
            </div>
            <div class="summary-line">
                <img
                    src="../assets/img/map/xiamen/active/canteen-active.png"
                    style="width: 175px"
                />
                <div class="summary-data"></div>
            </div>
        </div>
        <div id="share-area"></div>
    </div>
</template>

<script setup lang="ts">
import { NStatistic, NNumberAnimation, NSpace, NAvatar, NBadge, NDivider } from 'naive-ui'
import { useUserStore } from '@/stores/modules/user'

const userStore = useUserStore()
</script>

<style lang="less" scoped>
#summary-container {
    display: flex;
    flex-direction: column;
    padding: 20px;
}
#user-info {
    display: flex;
    justify-content: end;
}
#summary-area {
    display: flex;
    flex-direction: column;
    .summary-line {
        display: flex;
        .summary-data {
            flex: 1;
            margin: 0 20px;
            display: flex;
        }
    }
}
</style>
