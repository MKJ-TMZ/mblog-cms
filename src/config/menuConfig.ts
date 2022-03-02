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
        path: '/blogManage/writeBlog'
      },
      {
        title: '写动态',
        id: 12,
        path: '/blogManage/writeMoments'
      },
      {
        title: '文章管理',
        id: 13,
        path: '/blogManage/blogs'
      },
      {
        title: '动态管理',
        id: 14,
        path: '/blogManage/moments'
      },
      {
        title: '分类管理',
        id: 15,
        path: '/blogManage/categories'
      },
      {
        title: '标签管理',
        id: 16,
        path: '/blogManage/tags'
      },
      {
        title: '评论管理',
        id: 17,
        path: '/blogManage/comments'
      }
    ]
  },
  {
    title: '页面管理',
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
        path: '/pageManage/friends'
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
  '1': 'el-icon-menu',
  '11': 'el-icon-edit',
  '12': 'el-icon-edit',
  '13': 'el-icon-s-order',
  '14': 'el-icon-chat-dot-round',
  '15': 'el-icon-s-opportunity',
  '16': 'submenu ali-iconfont icon-biaoqian',
  '17': 'el-icon-s-comment',
}

// 默认打开的菜单
const defaultOpenedMenu = ['1', '2', '3', '4', '5']


export { menuList, menuIcons, defaultOpenedMenu }