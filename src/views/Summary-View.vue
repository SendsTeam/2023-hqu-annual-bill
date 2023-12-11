<template>
    <div id="summary-container">
        <div id="user-info">
            <n-space>
                <h2>Hi!</h2>
                <n-badge value="0">
                    <n-avatar
                        size="small"
                        src="https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEIq5tn9A4EuBTjDusZ1Rd79dTibpNJlrar1RjcI4icIpVdsyMsmtmia5WTShraxVv1q5vVoHMVN7LDxZHgDy99CJwXxjYLW6H4I8C7oq6HkPT9GQ/132"
                    />
                </n-badge>

                <h2 id="nick-name">柚子茶</h2>
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
            <!-- 这里到时候少一位,然后setTimeOut +1 -->
            <template #prefix>
                <span class="animate__animated animate__fadeIn">第</span>
            </template>
            <n-number-animation :from="0" :to="114" />
            <template #suffix>
                <span class="animate__animated animate__fadeIn">名✨</span>
            </template>
        </n-statistic>

        <div id="summary-area">
            <div class="summary-line"></div>
            <div class="summary-line"></div>
            <div class="summary-line"></div>
        </div>
        <div id="share-area"></div>
    </div>
</template>

<script setup lang="ts">
import { NStatistic, NNumberAnimation, NSpace, NAvatar, NBadge } from 'naive-ui'
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
</style>
