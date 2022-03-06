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
    name: 'login',
    component: () => import('@/views/Login.vue'),
    meta: {
      title: '后台管理登录'
    }
  },
  {
    path: '/home',
    component: () => import('@/views/Home.vue'),
    redirect: '/blogManage/blog/write',
    children: [
      {
        path: '/blogManage/blog/write',
        name: 'blogWrite',
        component: () => import('@/views/blogManage/BlogEdit.vue'),
        meta: {
          title: '写文章'
        }
      },
      {
        path: '/blogManage/blog/edit/:id',
        name: 'blogEdit',
        component: () => import('@/views/blogManage/BlogEdit.vue'),
        meta: {
          title: '编辑文章'
        }
      },
      {
        path: '/blogManage/moment/write',
        name: 'momentWrite',
        component: () => import('@/views/blogManage/MomentEdit.vue'),
        meta: {
          title: '写动态'
        }
      },
      {
        path: '/blogManage/moment/edit/:id',
        name: 'momentEdit',
        component: () => import('@/views/blogManage/MomentEdit.vue'),
        meta: {
          title: '编辑动态'
        }
      },
      {
        path: '/blogManage/blog/list',
        name: 'blogList',
        component: () => import('@/views/blogManage/blogList.vue'),
        meta: {
          title: '文章管理'
        }
      },
    ]
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