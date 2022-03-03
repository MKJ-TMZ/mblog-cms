<script lang="ts" setup>
import { menuList, menuIcons, defaultOpenedMenu } from "@/config/menuConfig";
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { msgError, msgSuccess } from "@/utils/message";
import { Expand, Fold } from "_@element-plus_icons-vue@1.0.0@@element-plus/icons-vue";
import { useStore } from "vuex";

const router = useRouter()
const route = useRoute()
const store = useStore()

//是否折叠
const isCollapse = ref<boolean>(false)
const user = ref<any>(null)

onBeforeMount(() => {
  getUserInfo()
})

const getUserInfo = () => {
  user.value = JSON.parse(window.localStorage.getItem('user') || '{}')
  if (Object.keys(user.value).length === 0) {
    window.localStorage.clear()
    router.push('/login')
    msgError('登录超时')
  }
}

const handleDropdown = (menuType: string) => {
  switch (menuType) {
    case 'logout':
      logout()
      break;
    default:
      break;
  }
}

const logout = () => {
  window.localStorage.clear()
  router.push('/login')
  msgSuccess('退出成功')
}
</script>

<template>
  <el-container class="home-container">
    <!--头部-->
    <el-header>
      <div class="title">
        <img src="~assets/logo.png" alt="" height="60">
        <span>MTCode 博客后台管理</span>
      </div>
      <el-dropdown trigger="click" class="user" v-if="user" @command="handleDropdown">
        <div class="el-dropdown-link">
          <el-avatar shape="circle" :size="45" fit="contain" :src="user.avatar"/>
        </div>
        <template #dropdown>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </template>
      </el-dropdown>
    </el-header>
    <!--页面主体-->
    <el-container>
      <!--侧边栏-->
      <el-aside :width="isCollapse? '64px' : '190px'">
        <div class="toggle-button" @click="isCollapse = !isCollapse">
          <el-icon style="height: 40px" v-if="isCollapse">
            <Expand/>
          </el-icon>
          <el-icon style="height: 40px" v-if="!isCollapse">
            <Fold/>
          </el-icon>
        </div>
        <!--菜单-->
        <el-menu background-color="#333744"
                 text-color="#fff"
                 active-text-color="#409eff"
                 :default-openeds="defaultOpenedMenu"
                 :unique-opened="true"
                 :collapse="isCollapse"
                 :collapse-transition="false"
                 :router="true"
                 :default-active="store.state.activePath"
        >
          <!-- 一级菜单 -->
          <el-sub-menu :index="item.path" v-for="item in menuList" :key="item.id">
            <!-- 一级菜单的模板区域 -->
            <template #title>
              <i class="menu-icon" :class="menuIcons[item.id]"></i>
              <span>{{ item.title }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="subItem.path" v-for="subItem in item.children" :key="subItem.id">
              <i class="menu-icon" :class="menuIcons[subItem.id]"/>
              <template #title>
                <span>{{ subItem.title }}</span>
              </template>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <!--右侧内容主体-->
      <el-main :class="isCollapse ? 'main-Collapse' : 'main-no-Collapse'">
        <!--加 key 让组件被重用时 重新执行生命周期 否则在编辑文章页面路由到写文章页面时 数据被重用-->
        <router-view :key="route.fullPath"/>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="less" scoped>
.el-aside {
  -ms-overflow-style: none; /* IE10 */
  scrollbar-width: none; /* Firefox */
}

.el-aside::-webkit-scrollbar {
  display: none;
}

.el-main::-webkit-scrollbar {
  width: 8px;
  height: 5px;
}

.el-main::-webkit-scrollbar-thumb {
  -webkit-box-shadow: inset 0 0 6px #48dbfb;
  box-shadow: inset 0 0 6px #48dbfb;
  background-color: #48dbfb;
}

.el-main::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px transparent;
  box-shadow: inset 0 0 6px transparent;
  background-color: transparent;
}

.el-main::-webkit-scrollbar-track-piece {
  background-color: transparent;
}

.home-container {
  height: 100%;
}

.el-header {
  background-color: #373D41;
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
  align-items: center;
  color: #ffffff;
  font-size: 22px;
  user-select: none;
}

.el-header div {
  display: flex;
  align-items: center;
}

.el-header .title span {
  margin-left: 15px;
}

.el-dropdown-link {
  outline-style: none !important;
  outline-color: unset !important;
  height: 100%;
  cursor: pointer;
}

.el-aside {
  background-color: #333744;
  position: absolute;
  top: 60px;
  bottom: 0;
  user-select: none;
}

.el-aside .el-menu {
  border-right: none;
}

.el-sub-menu .el-menu-item {
  min-width: inherit;
}

.el-main {
  background-color: #ffffff;
  position: absolute;
  top: 60px;
  bottom: 0;
  right: 0;
  overflow-y: auto;
  overflow-x: hidden;
}

.main-no-Collapse {
  width: calc(100vw - 190px);
}

.main-Collapse {
  width: calc(100vw - 64px);
}

.menu-icon {
  margin-right: 18px;
  font-size: 18px;
  color: #909399;
}

.el-menu-item {
  .iconfont {
    vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    text-align: center;
    display: inline-block;
  }
}

.toggle-button {
  background-color: #4a5064;
  font-size: 20px;
  line-height: 40px;
  color: #ffffff;
  text-align: center;
  cursor: pointer;
}

</style>