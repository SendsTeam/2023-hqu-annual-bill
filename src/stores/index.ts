import { createPinia } from 'pinia'
//!所有需要在组件外使用到store的地方都注入这个实例，如果在main中初始化则在vue根组件外无法使用。
const pinia = createPinia()
export default pinia
