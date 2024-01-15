<template>
    <div id="map-container">
        <!-- 用户头像 -->
        <Transition leave-active-class="animate__animated animate__fadeOut">
            <n-avatar
                v-if="enterBuildingSignal"
                id="map-user"
                :style="userPosition"
                :src="userStore.user.avatar"
            />
        </Transition>

        <!-- 整个地图的背景 -->
        <img src="../../assets/img/map/xiamen/background/map-xiamen.png" class="map-background" />

        <!-- 教学楼 -->
        <img
            src="../../assets/img/map/xiamen/building/classroom.png"
            class="map-building map-classroom"
            :class="!stautsStore.map.active.classroom ? 'gray' : ''"
        />

        <!-- 图书馆 -->
        <img
            src="../../assets/img/map/xiamen/building/library.png"
            class="map-building map-library"
            :class="!stautsStore.map.active.library ? 'gray' : ''"
        />

        <!-- 宿舍 -->
        <img
            src="../../assets/img/map/xiamen/building/dormitory.png"
            class="map-building map-dormitory"
            :class="!stautsStore.map.active.dormitory ? 'gray' : ''"
        />

        <!-- 食堂 -->
        <img
            src="../../assets/img/map/xiamen/building/canteen.png"
            class="map-building map-canteen"
            :class="!stautsStore.map.active.canteen ? 'gray' : ''"
        />
    </div>
</template>

<script setup lang="ts">
import { NAvatar } from 'naive-ui'
import { useStatusStore } from '@/stores/modules/status'
import { useUserStore } from '@/stores/modules/user'
import { computed, onMounted, ref } from 'vue'
import router from '@/router'

//Store getting
const stautsStore = useStatusStore()
const userStore = useUserStore()

//适配
const appHeight = stautsStore.appHeight
const appWidth = stautsStore.appWidth
const horizontalOffset = stautsStore.appHorizontalOffset
const verticalOffset = stautsStore.appVerticalOffset
//比例因子
const verticalRate = appHeight / 800
const horizontalRate = appWidth / 400

//用户移动动画
//预制内联属性:注意要使用transform,性能会更好
const userMovingPositionMap = {
    door: {
        transform: `translateX(${(horizontalOffset + 320) * horizontalRate}px) translateY(${
            (verticalOffset + 630) * verticalRate
        }px)`
    },
    dormitory: {
        transform: `translateX(${(horizontalOffset + 300) * horizontalRate}px) translateY(${
            (verticalOffset + 300) * verticalRate
        }px)`
    },
    classroom: {
        transform: `translateX(${(horizontalOffset + 100) * horizontalRate}px) translateY(${
            (verticalOffset + 620) * verticalRate
        }px)`
    },
    library: {
        transform: `translateX(${(horizontalOffset + 200) * horizontalRate}px) translateY(${
            (verticalOffset + 420) * verticalRate
        }px)`
    },
    canteen: {
        transform: `translateX(${(horizontalOffset + 100) * horizontalRate}px) translateY(${
            (verticalOffset + 210) * verticalRate
        }px)`
    }
}
//用户头像的位置
const userPosition = computed(() => {
    return userMovingPositionMap[stautsStore.map.current]
})
//控制用户头像渐变消失进入建筑物
const enterBuildingSignal = ref(true)
//映射下一个建筑名
const nextBuildingName = computed(() => {
    switch (stautsStore.map.current) {
        case 'door':
            return 'dormitory'
        case 'dormitory':
            return 'classroom'
        case 'classroom':
            return 'library'
        case 'library':
            return 'canteen'
        case 'canteen':
            return 'dormitory'
        default:
            return 'door'
    }
})
const moveToNextBuilding = () => {
    //下一个路由
    let nextRoute: string = ''

    //更新map.current为下一个建筑
    if (nextBuildingName.value == 'dormitory' && stautsStore.map.current == 'canteen') {
        //这里要指向第二个宿舍页
        stautsStore.map.current = 'dormitory'
        nextRoute = 'dormitory-two'
    } else {
        stautsStore.map.current = nextBuildingName.value
        nextRoute = stautsStore.map.current
    }

    //跳转下一个场景
    setTimeout(() => {
        router.push({ name: nextRoute })
    }, 3000)
}

onMounted(() => {
    //将建筑物激活
    stautsStore.map.active[nextBuildingName.value] = true

    //播放用户头像移动动画
    setTimeout(() => {
        moveToNextBuilding()
        //两秒后播放消失动画
        setTimeout(() => {
            enterBuildingSignal.value = false
        }, 2000)
    }, 2000)
})
</script>

<style scoped>
#map-container {
    width: 100%;
    height: v-bind(appHeight + 'px');
}

#map-user {
    position: absolute;
    z-index: 1;
    width: v-bind(30 * verticalRate + 'px');
    height: v-bind(30 * verticalRate + 'px');
    transition: all 2s;
}

/* 100%灰度 */
.gray {
    filter: grayscale(100%);
}

/* 这里要让背景铺满整个app容器 */
.map-background {
    width: v-bind(appWidth + 'px');
    height: v-bind(appHeight + 'px');
    position: absolute;
}

/* 教学楼 */
.map-classroom {
    height: v-bind(110 * verticalRate + 'px');
    left: v-bind((horizontalOffset + 60) * horizontalRate + 'px');
    bottom: v-bind((verticalOffset + 100) * verticalRate + 'px');
}

/* 食堂 */
.map-canteen {
    height: v-bind(110 * verticalRate + 'px');
    left: v-bind((horizontalOffset + 60) * horizontalRate + 'px');
    top: v-bind((verticalOffset + 180) * verticalRate + 'px');
}

/* 宿舍 */
.map-dormitory {
    height: v-bind(100 * verticalRate + 'px');
    right: v-bind((horizontalOffset + 40) * horizontalRate + 'px');
    top: v-bind((verticalOffset + 280) * verticalRate + 'px');
}

/* 图书馆 */
.map-library {
    height: v-bind(100 * verticalRate + 'px');
    left: v-bind((horizontalOffset + 155) * horizontalRate + 'px');
    top: v-bind((verticalOffset + 400) * verticalRate + 'px');
}

.map-building {
    position: absolute;
}
</style>
