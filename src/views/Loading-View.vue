<template>
    <div id="loading-container">
        <loading-step @finished="next"></loading-step>
    </div>
</template>

<script setup lang="ts">
import LoadingStep from '@/components/Loading-Step.vue'
import router from '@/router'
// import { useStatusStore } from '@/stores/modules/status'
const next = () => {
    // router.replace({ name: 'summary' })
    // router.replace({ name: 'home' })
    router.replace({ name: 'map' })
    
}
</script>

<style scoped>
#loading-container {
    padding: 50px;
}
</style>
