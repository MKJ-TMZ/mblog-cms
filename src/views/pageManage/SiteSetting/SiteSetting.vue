<script lang="ts" setup>
import Breadcrumb from "@/components/Breadcrumb.vue";
import BaseSetting from "@/views/pageManage/SiteSetting/BaseSetting.vue";
import ProfileSetting from "@/views/pageManage/SiteSetting/ProfileSetting.vue";
import FooterSetting from "@/views/pageManage/SiteSetting/FooterSetting.vue";
import { ref } from "vue";

const selectTag = ref<string>('baseSetting')
</script>

<template>
  <!--面包屑导航-->
  <Breadcrumb parentTitle="页面管理"/>

  <el-tabs v-model="selectTag">
    <el-tab-pane label="基础设置" name="baseSetting">
      <BaseSetting/>
    </el-tab-pane>
    <el-tab-pane label="个人档案" name="profileSetting">
      <ProfileSetting/>
    </el-tab-pane>
    <el-tab-pane label="页脚设置" name="footerSetting">
      <FooterSetting/>
    </el-tab-pane>
  </el-tabs>

</template>

<style scoped>
:deep(label) {
  line-height: 40px !important;
}

:deep(.el-form-item__content) {
  display: flex;
  justify-content: flex-end;
}

:deep(.el-tabs__content) {
  height: calc(100vh - 184px);
  overflow-y: auto;
  -ms-overflow-style: none; /* IE10 */
  scrollbar-width: none; /* Firefox */
}


:deep(.el-tabs__content::-webkit-scrollbar) {
  width: 8px;
  height: 5px;
}

:deep(.el-tabs__content::-webkit-scrollbar-thumb) {
  -webkit-box-shadow: inset 0 0 6px #48dbfb;
  box-shadow: inset 0 0 6px #48dbfb;
  background-color: #48dbfb;
  border-radius: 10px;
}

:deep(.el-tabs__content::-webkit-scrollbar-track) {
  -webkit-box-shadow: inset 0 0 6px transparent;
  box-shadow: inset 0 0 6px transparent;
  background-color: transparent;
}

:deep(.el-tabs__content::-webkit-scrollbar-track-piece) {
  background-color: transparent;
}
</style>