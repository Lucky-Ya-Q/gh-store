import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import naive from 'naive-ui'
// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'

const app = createApp(App).use(store).use(router)

app.use(naive)

app.mount('#app')
