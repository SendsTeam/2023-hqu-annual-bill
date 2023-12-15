<template>
    <cartoon-player
        v-slot="{ visiableIndex }"
        :effect="unlockNextRoute"
        @click="nextRoute"
        :max-index="10"
        next-route-name="map"
    >
        <img
            v-show="visiableIndex >= 1"
            class="animate__animated animate__fadeIn"
            src="@/assets/img/cartoon/library/library-01.png"
        />
        <img
            v-show="visiableIndex >= 2"
            class="animate__animated animate__fadeIn"
            src="@/assets/img/cartoon/library/library-02.png"
            style="z-index: 1"
        />
        <img
            v-show="visiableIndex >= 3"
            class="animate__animated animate__fadeIn"
            src="@/assets/img/cartoon/library/library-03.png"
            style="z-index: 1"
        />
        <img
            v-show="visiableIndex >= 4"
            class="animate__animated animate__fadeIn"
            src="@/assets/img/cartoon/library/library-04.png"
        />
        <img
            v-show="visiableIndex >= 5"
            class="animate__animated animate__fadeIn"
            src="@/assets/img/cartoon/library/library-card.png"
            style="z-index: 1"
        />
        <div class="summary-card">
            <n-space vertical justify="space-around" size="large">
                <div class="animate__animated animate__fadeIn" v-if="visiableIndex >= 6">
                    <n-statistic label="借书花销为" tabular-nums>
                        <!-- 这里因为有数值动画所以需要用v-if! -->
                        <span class="animate__animated animate__fadeIn" v-if="visiableIndex >= 7">
                            <n-number-animation
                                :from="0.0"
                                :precision="2"
                                :to="userStore.user.paymentStatistic?.library.total"
                            />
                        </span>
                        <template #suffix>
                            <span
                                class="animate__animated animate__fadeIn"
                                v-show="visiableIndex >= 8"
                                >元</span
                            >
                        </template>
                    </n-statistic>
                </div>
                <div class="animate__animated animate__fadeIn" v-if="visiableIndex >= 9">
                    <n-tag v-if="!userStore.user.paymentStatistic?.library.total" type="success">
                        信用满分
                    </n-tag>
                    <n-tag v-else type="warning"> 请及时还书 </n-tag>
                </div>
            </n-space>
        </div>
    </cartoon-player>
</template>

<script setup lang="ts">
import CartoonPlayer from '@/components/Cartoon-Player.vue'
import { NStatistic, NNumberAnimation, NTag, NSpace } from 'naive-ui'
import { ref } from 'vue'
import router from '@/router'
import { useUserStore } from '@/stores/modules/user'
//获取用户Store
const userStore = useUserStore()

//等动画播放完再开放路由
const isCartoonReady = ref(false)
//解锁路由
const unlockNextRoute = () => {
    isCartoonReady.value = true
}
const nextRoute = () => {
    if (isCartoonReady.value) {
        router.push({ name: 'map' })
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
    width: 120px;
    height: 210px;
    top: 63%;
    left: 58%;
    z-index: 1;
    padding: 10px;
}
</style>
