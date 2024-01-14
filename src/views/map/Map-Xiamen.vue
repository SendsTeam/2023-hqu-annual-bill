<template>
    <div id="map-container">
        <!-- 用户头像 -->
        <Transition leave-active-class="animate__animated animate__fadeOut">
            <n-avatar
                v-if="enterBuildingSignal"
                id="map-user"
                :style="userPosition"
                size="medium"
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

//用户移动动画

//预制内联属性:注意要使用transform,性能会更好
const positionMap = {
    canteen: {
        transform: 'translateX(80px) translateY(175px)'
    },
    classroom: {
        transform: 'translateX(100px) translateY(500px)'
    },
    dormitory: {
        transform: 'translateX(275px) translateY(240px)'
    },
    library: {
        transform: 'translateX(190px) translateY(350px)'
    },
    door: {
        transform: 'translateX(310px) translateY(530px)'
    }
}
//用户头像的位置
const userPosition = computed(() => {
    return positionMap[stautsStore.map.current]
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
    width: 100vw;
    height: 100vh;
}

#map-user {
    position: absolute;
    z-index: 1;
    width: 30px;
    height: 30px;
    transition: all 2s;
}
.map-background {
    width: 100%;
    height: 100%;
    position: absolute;
}

.map-building {
    position: absolute;
}

.map-classroom {
    height: 100px;
    left: 50px;
    top: 485px;
}

.map-canteen {
    height: 100px;
    left: 60px;
    top: 150px;
}

.map-dormitory {
    height: 90px;
    left: 240px;
    top: 230px;
}

.map-library {
    height: 80px;
    left: 150px;
    top: 340px;
}
</style>
