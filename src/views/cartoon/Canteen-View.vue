<template>
    <cartoon-player
        v-slot="{ visiableIndex }"
        :effect="unlockNextRoute"
        @click="nextRoute"
        :max-index="18"
        next-route-name="map"
    >
        <img
            v-show="visiableIndex >= 1"
            class="animate__animated animate__fadeIn"
            src="@/assets/img/cartoon/canteen/canteen-01.png"
        />
        <img
            v-show="visiableIndex >= 2"
            class="animate__animated animate__fadeIn"
            src="@/assets/img/cartoon/canteen/canteen-02.png"
            style="z-index: 1"
        />
        <img
            v-show="visiableIndex >= 3"
            class="animate__animated animate__fadeIn"
            src="@/assets/img/cartoon/canteen/canteen-03.png"
            style="z-index: 1"
        />
        <img
            v-show="visiableIndex >= 4"
            class="animate__animated animate__fadeIn"
            src="@/assets/img/cartoon/canteen/canteen-04.png"
        />
        <img
            v-show="visiableIndex >= 5"
            class="animate__animated animate__fadeIn"
            src="@/assets/img/cartoon/canteen/canteen-05.png"
            style="z-index: 1"
        />
        <img
            v-show="visiableIndex >= 6"
            class="animate__animated animate__fadeIn"
            src="@/assets/img/cartoon/canteen/canteen-06.png"
            style="z-index: 1"
        />
        <img
            v-show="visiableIndex >= 7"
            class="animate__animated animate__fadeIn"
            src="@/assets/img/cartoon/canteen/canteen-07.png"
            style="z-index: 1"
        />
        <img
            v-show="visiableIndex >= 8"
            class="animate__animated animate__fadeIn"
            src="@/assets/img/cartoon/canteen/canteen-08.png"
            style="z-index: 1"
        />
      <div class="summary-card">
        <div class="animate__animated animate__fadeIn" v-if="visiableIndex >= 9">
                <div class="animate__animated animate__fadeIn" v-show="visiableIndex >= 10">
                  <n-statistic label="今年你最喜欢的食堂" tabular-nums>
                    <!-- 这里要做个字体随长度动态缩放 -->
                      <div
                          class="animate__animated animate__fadeIn canteen-name"
                          v-show="visiableIndex >= 11"
                      >
                        {{ userStore.user.paymentStatistic?.restaurant.favorite.name }}
                      </div>
                  </n-statistic>
                  <n-statistic label="你在该食堂消费了" tabular-nums >
                    <span class="animate__animated animate__fadeIn" v-if="visiableIndex >= 12">
                            <n-number-animation
                                :from="0.0"
                                :precision="2"
                                :to="userStore.user.paymentStatistic?.restaurant.favorite.total"
                            />
                        </span>
                    <span
                        class="animate__animated animate__fadeIn "
                        v-show="visiableIndex >= 13"
                    >元</span
                    >
                  </n-statistic>
                  <n-statistic label="你的食堂支出一共是" tabular-nums >
                    <!-- 这里因为有数值动画所以需要用v-if! -->
                    <span class="animate__animated animate__fadeIn" v-if="visiableIndex >= 14">
                            <n-number-animation
                                :from="0.0"
                                :precision="2"
                                :to="userStore.user.paymentStatistic?.restaurant.total"
                            />
                        </span>
                    <span
                      class="animate__animated animate__fadeIn "
                      v-show="visiableIndex >= 15"
                  >元</span
                  >
                    <div
                        class="animate__animated animate__fadeIn "
                        v-show="visiableIndex >= 16"
                    >
                      <div class="remark ">你最早的干饭时间是</div>
                      <div class="time-name ">{{userStore.user.paymentStatistic?.restaurant.earliestTime }}</div>
                    </div>
                    <div
                        class="animate__animated animate__fadeIn "
                        v-show="visiableIndex >= 17"
                    >
                      <div class="remark ">你最晚的干饭时间是</div>
                      <div class="time-name ">{{userStore.user.paymentStatistic?.restaurant.latestTime}}</div>
                    </div>

                  </n-statistic>
                </div>
        </div>
      </div>

    </cartoon-player>


</template>

<script setup lang="ts">
import CartoonPlayer from '@/components/Cartoon-Player.vue'
import { ref } from 'vue'
import router from '@/router'
import { NStatistic, NNumberAnimation } from 'naive-ui'
import { useUserStore } from '@/stores/modules/user'
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
  width: 129px;
  height: 250px;
  top: 57%;
  left: 53%;
  z-index: 1;
  padding: 5px;
  /*background: coral ;*/
}
.remark {
  color: grey;
  font-size: 13px;
}
.canteen-name{
  font-size: 17px;
}
.time-name {
  font-size: 13px;
}
</style>
