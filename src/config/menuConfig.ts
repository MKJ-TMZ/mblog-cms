// 展示的菜单
const menuList = [
  {
    title: '博客管理',
    id: 1,
    path: '/blogManage',
    children: [
      {
        title: '写文章',
        id: 11,
        path: '/blogManage/blog/write'
      },
      {
        title: '写动态',
        id: 12,
        path: '/blogManage/moment/write'
      },
      {
        title: '文章管理',
        id: 13,
        path: '/blogManage/blog/list'
      },
      {
        title: '动态管理',
        id: 14,
        path: '/blogManage/moment/list'
      },
      {
        title: '分类管理',
        id: 15,
        path: '/blogManage/category/list'
      },
      {
        title: '标签管理',
        id: 16,
        path: '/blogManage/tag/list'
      },
      // {
      //   title: '评论管理',
      //   id: 17,
      //   path: '/blogManage/comment/list'
      // }
    ]
  },
  {
    title: '页面管理',
    id: 2,
    path: '/pageManage',
    children: [
      {
        id: 21,
        title: '站点设置',
        path: '/pageManage/siteSettings'
      },
      {
        id: 22,
        title: '友链管理',
        path: '/pageManage/friend/list'
      },
      {
        id: 23,
        title: '关于我',
        path: '/pageManage/about'
      }
    ]
  },
]

// 菜单图标配置
const menuIcons = {
  '1': 'iconfont icon-blog',
  '2': 'iconfont icon-web',
  '11': 'iconfont icon-edit-write',
  '12': 'iconfont icon-edit-write',
  '13': 'iconfont icon-svgwrite',
  '14': 'iconfont icon-dynamic',
  '15': 'iconfont icon-sort',
  '16': 'iconfont icon-tags-fill',
  '17': 'iconfont icon-comment_fill_light',
  '21': 'iconfont icon-pages',
  '22': 'iconfont icon-firends',
  '23': 'iconfont icon-about',
}

// 默认打开的菜单
const defaultOpenedMenu = ['1']


export { menuList, menuIcons, defaultOpenedMenu }