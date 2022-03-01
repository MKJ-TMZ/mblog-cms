import { createRouter, createWebHistory } from 'vue-router';
import store from "@/store";

const routes: any[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
    meta: {
      title: '后台管理登录'
    }
  },
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

//挂载路由守卫
router.beforeEach((to: any, from: any, next: any) => {
  if (to.path !== '/login') {
    // token判断
  }

  if (to.meta.title) {
    if (store.state.webTitleSuffix) {
      document.title = to.meta.title + ' - ' + store.state.webTitleSuffix
    } else {
      document.title = to.meta.title
    }
  }

  next()
})

export default router