<template>
    <div id="loading-container">
        <loading-step @finished="next"></loading-step>
    </div>
</template>

<script setup lang="ts">
import LoadingStep from '@/components/Loading-Step.vue'
import router from '@/router'
const next = () => {
    router.replace({ name: 'summary' })
    // router.replace({ name: 'home' })
}
</script>

<style scoped>
#loading-container {
    padding: 50px;
}
</style>
