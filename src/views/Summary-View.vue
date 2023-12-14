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
                    style="height: 60px"
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
                <div class="summary-data">
                    <n-statistic label="其他花销￥为" tabular-nums>
                        <!-- 这里因为有数值动画所以需要用v-if! -->
                        <n-number-animation
                            :from="0.0"
                            :precision="2"
                            :to="userStore.user.paymentStatistic?.other.total"
                        />
                        <template #suffix> 元 </template>
                    </n-statistic>
                </div>
            </div>
            <n-divider />
            <div class="summary-line" style="height: 120px">
                <img
                    src="../assets/img/map/xiamen/active/classroom-active.png"
                    style="width: 150px"
                />
                <div id="classroom-data" class="summary-data">
                    <div class="data-line">
                        <span class="remark">今年你一共上了</span>
                        {{ userStore.user.learningStatistic?.lesson.total }}
                        <span class="remark">节课</span>
                    </div>
                    <div class="data-line">
                        <span class="remark">上的最多的课是</span>
                        <div>
                            <n-space>
                                <span>
                                    {{ userStore.user.learningStatistic?.lesson.most.name }}
                                </span>
                                <span>
                                    <span class="remark">一共</span>
                                    {{ userStore.user.learningStatistic?.lesson.most.total }}
                                    <span class="remark">节</span>
                                </span>
                            </n-space>
                        </div>
                    </div>
                    <div class="data-line">
                        <span class="remark">一共上了</span>
                        {{ userStore.user.learningStatistic?.lesson.morningEight }}
                        <span class="remark">节早八</span>
                    </div>
                    <div class="data-line">
                        <span class="remark">一共上了</span>
                        {{ userStore.user.learningStatistic?.lesson.eveningTen }}
                        <span class="remark">节晚十</span>
                    </div>
                </div>
            </div>
            <n-divider />
            <div class="summary-line">
                <img
                    src="../assets/img/map/xiamen/active/canteen-active.png"
                    style="height: 150px"
                />
                <div id="canteen-data" class="summary-data">
                    <div class="data-line">
                        <div class="remark">今年你最喜欢的食堂是</div>
                        <div>
                            {{ userStore.user.paymentStatistic?.restaurant.favorite.name }}
                        </div>
                        <div class="remark">你在该食堂消费了</div>
                        <div>
                            {{ userStore.user.paymentStatistic?.restaurant.favorite.total }} 元
                        </div>
                        <div class="remark">你的食堂支出一共是</div>
                        <div>{{ userStore.user.paymentStatistic?.restaurant.total }} 元</div>
                        <div class="remark">你最早的干饭时间是</div>
                        <div>{{ userStore.user.paymentStatistic?.restaurant.earliestTime }}</div>
                        <div class="remark">你最晚的干饭时间是</div>
                        <div>{{ userStore.user.paymentStatistic?.restaurant.latestTime }}</div>
                    </div>
                </div>
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
            flex-direction: column;
            .remark {
                color: grey;
            }
        }
    }
}

#classroom-data {
    .data-line:nth-child(2) {
        margin: 5px 0;
    }
}

#canteen-data {
    p {
        margin: 2px 0;
        span {
            color: grey;
        }
    }
}
</style>
