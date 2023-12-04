<template>
    <div id="dormitory-container">
        <cartoon-player v-slot="{ visiableIndex }">
            <img src="@/assets/img/cartoon/dormitory/dormitory-00.png" />
            <img
                v-show="visiableIndex >= 1"
                class="animate__animated animate__fadeIn"
                src="@/assets/img/cartoon/dormitory/dormitory-01.png"
            />
            <img
                v-show="visiableIndex >= 2"
                class="animate__animated animate__fadeIn"
                src="@/assets/img/cartoon/dormitory/dormitory-02.png"
            />
            <img
                v-show="visiableIndex >= 3"
                class="animate__animated animate__fadeIn"
                src="@/assets/img/cartoon/dormitory/dormitory-03.png"
            />
            <img
                v-show="visiableIndex >= 4"
                class="animate__animated animate__fadeIn"
                src="@/assets/img/cartoon/dormitory/dormitory-04.png"
                style="z-index: 1"
            />
            <img
                v-show="visiableIndex >= 5"
                class="animate__animated animate__fadeIn"
                src="@/assets/img/cartoon/dormitory/dormitory-05.png"
                style="z-index: 1"
            />
            <img
                v-show="visiableIndex >= 6"
                class="animate__animated animate__fadeIn"
                src="@/assets/img/cartoon/dormitory/dormitory-06.png"
            />
        </cartoon-player>
    </div>
</template>

<script setup lang="ts">
import CartoonPlayer from '@/components/Cartoon-Player.vue'
</script>

<style scoped>
#dormitory-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}
img {
    height: 110%;
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
</style>
