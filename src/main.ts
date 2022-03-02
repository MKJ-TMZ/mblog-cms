import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "@/store";
import 'element-plus/dist/index.css'
import './assets/less/base.less'
import './assets/lib/icon/iconfont.css'

const app = createApp(App)

app.use(router)
  .use(store)
  .mount('#app')
