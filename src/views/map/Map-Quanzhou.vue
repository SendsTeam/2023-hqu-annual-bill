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
        <img
            src="../../assets/img/map/quanzhou/background/map-quanzhou.png"
            class="map-background"
        />

        <!-- 大门 -->
        <img
            v-if="stautsStore.map.active.door"
            src="../../assets/img/map/quanzhou/active/door-active.png"
            class="map-building map-door"
        />
        <img
            v-else
            src="../../assets/img/map/quanzhou/unactive/door-unactive.png"
            class="map-building map-door"
        />

        <!-- 教学楼 -->
        <img
            v-if="stautsStore.map.active.classroom"
            src="../../assets/img/map/quanzhou/active/classroom-active.png"
            class="map-building map-classroom"
        />
        <img
            v-else
            src="../../assets/img/map/quanzhou/unactive/classroom-unactive.png"
            class="map-building map-classroom"
        />

        <!-- 图书馆 -->
        <img
            v-if="stautsStore.map.active.library"
            src="../../assets/img/map/quanzhou/active/library-active.png"
            class="map-building map-library"
        />
        <img
            v-else
            src="../../assets/img/map/quanzhou/unactive/library-unactive.png"
            class="map-building map-library"
        />

        <!-- 宿舍 -->
        <img
            v-if="stautsStore.map.active.dormitory"
            src="../../assets/img/map/quanzhou/active/dormitory-active.png"
            class="map-building map-dormitory"
        />
        <img
            v-else
            src="../../assets/img/map/quanzhou/unactive/dormitory-unactive.png"
            class="map-building map-dormitory"
        />

        <!-- 食堂 -->
        <img
            v-if="stautsStore.map.active.canteen"
            src="../../assets/img/map/quanzhou/active/canteen-active.png"
            class="map-building map-canteen"
        />
        <img
            v-else
            src="../../assets/img/map/quanzhou/unactive/canteen-unactive.png"
            class="map-building map-canteen"
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
//#region
//预制内联属性:注意要使用transform,性能会更好
const positionMap = {
    door: {
        transform: 'translateX(260px) translateY(105px)'
    },
    dormitory: {
        transform: 'translateX(90px) translateY(430px)'
    },
    classroom: {
        transform: 'translateX(250px) translateY(520px)'
    },
    library: {
        transform: 'translateX(250px) translateY(310px)'
    },
    canteen: {
        transform: 'translateX(80px) translateY(220px)'
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

    //播放用户头像移动动画
    setTimeout(() => {
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

.map-door {
    height: 140px;
    right: 45px;
    top: 30px;
}

.map-classroom {
    height: 140px;
    right: 55px;
    bottom: 100px;
}

.map-canteen {
    height: 130px;
    left: 30px;
    top: 140px;
}

.map-dormitory {
    height: 130px;
    left: 40px;
    bottom: 180px;
}

.map-library {
    height: 150px;
    left: 175px;
    top: 230px;
}
</style>
