import { createRouter, createWebHistory } from 'vue-router';
import store from "@/store";
import { msgError } from "@/utils/message";
import { SAVE_NAV_STATE, SCROLL_TO_TOP } from "@/store/mutations-types";

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
      {
        path: '/blogManage/moment/list',
        name: 'momentList',
        component: () => import('@/views/blogManage/momentList.vue'),
        meta: {
          title: '动态管理'
        }
      },
      {
        path: '/blogManage/category/list',
        name: 'categoryList',
        component: () => import('@/views/blogManage/CategoryList.vue'),
        meta: {
          title: '分类管理'
        }
      },
      {
        path: '/blogManage/tag/list',
        name: 'tagList',
        component: () => import('@/views/blogManage/TagList.vue'),
        meta: {
          title: '标签管理'
        }
      },
      {
        path: '/pageManage/siteSettings',
        name: 'siteSettings',
        component: () => import('@/views/pageManage/SiteSetting/SiteSetting.vue'),
        meta: {
          title: '站点管理'
        }
      },
      {
        path: '/pageManage/friend/list',
        name: 'friendList',
        component: () => import('@/views/pageManage/FriendList.vue'),
        meta: {
          title: '友链管理'
        }
      },
      {
        path: '/pageManage/about',
        name: 'about',
        component: () => import('@/views/pageManage/About.vue'),
        meta: {
          title: '关于我'
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

  // 回到顶部
  store.commit(SCROLL_TO_TOP)

  next()
})

export default router