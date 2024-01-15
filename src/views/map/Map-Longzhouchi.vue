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
        <img
            src="../../assets/img/map/longzhouchi/background/map-longzhouchi.png"
            class="map-background"
        />

        <!-- 教学楼 -->
        <img
            src="../../assets/img/map/longzhouchi/building/classroom.png"
            class="map-building map-classroom"
            :class="!stautsStore.map.active.classroom ? 'gray' : ''"
        />

        <!-- 图书馆 -->
        <img
            src="../../assets/img/map/longzhouchi/building/library.png"
            class="map-building map-library"
            :class="!stautsStore.map.active.library ? 'gray' : ''"
        />

        <!-- 宿舍 -->
        <img
            src="../../assets/img/map/longzhouchi/building/dormitory.png"
            class="map-building map-dormitory"
            :class="!stautsStore.map.active.dormitory ? 'gray' : ''"
        />

        <!-- 食堂 -->
        <img
            src="../../assets/img/map/longzhouchi/building/canteen.png"
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
//#region
//预制内联属性:注意要使用transform,性能会更好
//TODO: 后续可以按地图路径来设计动画(多个点过渡)
const userMovingPositionMap = {
    //用户默认是从door开始的,也就是说door的坐标就是用户最开始的坐标
    door: {
        transform: `translateX(${(horizontalOffset + 190) * horizontalRate}px) translateY(${
            (verticalOffset + 580) * verticalRate
        }px)`
    },
    dormitory: {
        transform: `translateX(${(horizontalOffset + 280) * horizontalRate}px) translateY(${
            (verticalOffset + 430) * verticalRate
        }px)`
    },
    classroom: {
        transform: `translateX(${(horizontalOffset + 250) * horizontalRate}px) translateY(${
            (verticalOffset + 100) * verticalRate
        }px)`
    },
    library: {
        transform: `translateX(${(horizontalOffset + 180) * horizontalRate}px) translateY(${
            (verticalOffset + 320) * verticalRate
        }px)`
    },
    canteen: {
        transform: `translateX(${(horizontalOffset + 90) * horizontalRate}px) translateY(${
            (verticalOffset + 190) * verticalRate
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

//让用户头像动起来!!!!
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
    // 将建筑物激活
    stautsStore.map.active[nextBuildingName.value] = true

    // 激活
    setTimeout(() => {
        //播放用户头像移动动画
        moveToNextBuilding()
        //两秒后播放消失动画
        setTimeout(() => {
            enterBuildingSignal.value = false
        }, 2000)
    }, 2000)
})
//#endregion
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
    height: v-bind(100 * verticalRate + 'px');
    right: v-bind((horizontalOffset + 55) * horizontalRate + 'px');
    top: v-bind((verticalOffset + 70) * verticalRate + 'px');
}

/* 食堂 */
.map-canteen {
    height: v-bind(100 * verticalRate + 'px');
    left: v-bind((horizontalOffset + 60) * horizontalRate + 'px');
    top: v-bind((verticalOffset + 160) * verticalRate + 'px');
}

/* 宿舍 */
.map-dormitory {
    height: v-bind(100 * verticalRate + 'px');
    right: v-bind((horizontalOffset + 40) * horizontalRate + 'px');
    top: v-bind((verticalOffset + 420) * verticalRate + 'px');
}

/* 图书馆 */
.map-library {
    height: v-bind(100 * verticalRate + 'px');
    left: v-bind((horizontalOffset + 155) * horizontalRate + 'px');
    top: v-bind((verticalOffset + 300) * verticalRate + 'px');
}

.map-building {
    position: absolute;
}
</style>
