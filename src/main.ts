import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "@/store";
import 'element-plus/dist/index.css'
import './assets/less/base.less'
import './assets/lib/icon/iconfont.css'
// 引入mavonEditor富文本编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// prism代码高亮
import '@/assets/lib/prism/prism.css';


const app = createApp(App)

app.use(router)
  .use(store)
  .use(mavonEditor)
  .mount('#app')
