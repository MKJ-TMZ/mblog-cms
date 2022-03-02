import { createRouter, createWebHistory } from 'vue-router';
import store from "@/store";
import { msgError } from "@/utils/message";
import { SAVE_NAV_STATE } from "@/store/mutations-types";

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
  {
    path: '/home',
    component: () => import('@/views/Home.vue'),
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

//挂载路由守卫
router.beforeEach((to: any, from: any, next: any) => {
  if (to.path !== '/login') {
    // token判断
    const tokenStr = window.localStorage.getItem('token')
    if (!tokenStr) {
      next("/login")
      msgError('登录超时')
    }
  }

  if (to.meta.title) {
    if (store.state.webTitleSuffix) {
      document.title = to.meta.title + ' - ' + store.state.webTitleSuffix
    } else {
      document.title = to.meta.title
    }
  }

  // 储存当前菜单id
  store.commit(SAVE_NAV_STATE, to.path)

  next()
})

export default router