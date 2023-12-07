<template>
    <n-space vertical size="large">
        <n-layout>
            <n-layout-header>
                <n-space vertical>
                    <h2>欢迎来到年度账单!</h2>
                    <p>在开始前,需要相关设置来确保你的体验</p>
                    <p>在你配置完之后,配置信息将被保存</p>
                    <p>再次访问年度账单将不会再出现这个界面</p>
                    <p>但你仍然可以在设置里更改相关选项</p>
                    <img src="@/assets/gif/chiikawa.png" />
                </n-space>
            </n-layout-header>
            <!-- <n-divider /> -->
            <n-layout-content>
                <n-space vertical>
                    <n-list>
                        <template #header> <h2>配置</h2> </template>
                        <n-list-item>
                            <n-card :bordered="false" title="1. 校区">
                                <n-space>
                                    <n-radio label="厦门校区"></n-radio>
                                    <n-radio label="泉州校区"></n-radio>
                                    <n-radio label="华文校区"></n-radio>
                                </n-space>
                            </n-card>
                        </n-list-item>
                        <n-list-item>
                            <n-card :bordered="false" title="2. BGM">
                                <n-space>
                                    <n-radio label="不需要"></n-radio>
                                    <n-radio label="需要"></n-radio>
                                    <!-- <n-radio label="华文校区"></n-radio> -->
                                </n-space>
                            </n-card>
                        </n-list-item>
                        <n-list-item>
                            <n-card :bordered="false" title="3. 漫画播放">
                                <n-space>

                                    <n-checkbox> 自动播放 </n-checkbox>
                                    <n-checkbox> 不重复播放 </n-checkbox>
                                </n-space>
                            </n-card>
                        </n-list-item>
                    </n-list>
                </n-space>
            </n-layout-content>
            <n-layout-footer>
                <!-- 这里应该根据用户选择的选项来展示信息 -->
                eg:一个需要bgm的泉州校区选手即将入场
            </n-layout-footer>
        </n-layout>
    </n-space>
</template>

<script setup lang="ts">
import {
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutFooter,
    NSpace,
    NDivider,
    NCheckbox,
    NCard,
    NList,
    NListItem,
    NRadio
} from 'naive-ui'
</script>

<style scoped>
.n-layout-header {
    padding: 20px;
}
.n-layout-content {
    padding: 20px;
}
.n-layout-footer {
    padding: 20px;
}
</style>
