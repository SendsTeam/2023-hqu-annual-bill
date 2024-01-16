import './assets/css/main.css'
import 'animate.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'

const app = createApp(App)

//配置全局错误处理
app.config.errorHandler = (error) => {
    alert(`未捕获错误: ${error}`)
}

app.use(pinia)
app.use(router)

app.mount('#app')
