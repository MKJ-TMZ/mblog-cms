<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";
import {
  deleteBadge,
  deleteProfiles,
  getSiteSettingData,
  saveBaseSetting,
  saveFooterSetting,
  saveProfilesSetting
} from "@/api/siteSetting";
import Breadcrumb from "@/components/Breadcrumb.vue";
import BaseSetting from "@/views/pageManage/SiteSetting/BaseSetting.vue";
import ProfileSetting from "@/views/pageManage/SiteSetting/ProfileSetting.vue";
import FooterSetting from "@/views/pageManage/SiteSetting/FooterSetting.vue";

const baseSetting = ref<any>({})
const profilesSetting = ref<any>({})
const footerSetting = ref<any>({})
const selectTag = 'baseSetting'

onBeforeMount(() => {
  init()
})

const init = () => {
  getSiteSetting()
}

const getSiteSetting = () => {
  const data = getSiteSettingData();
  baseSetting.value = data.baseSetting
  profilesSetting.value = data.profilesSetting
  footerSetting.value = data.footerSetting
}

const handleBaseSettingSubmit = () => {
  saveBaseSetting(baseSetting.value)
}

const handleAddProfiles = () => {
  profilesSetting.value.push({
    key: Date.now(),
    nameEn: "favorite",
    nameZh: "自定义",
    type: 3,
    value: "{\"title\":\"\",\"content\":\"\"}"
  })
}

const handleProfilesSettingSubmit = () => {
  saveProfilesSetting(profilesSetting.value)
}

const handleDeleteProfiles = (favorite: any) => {
  if (favorite.id) {
    deleteProfiles(favorite.id)
    profilesSetting.value.forEach((item: any, index: number) => {
      if (item.id === favorite.id) {
        profilesSetting.value.splice(index, 1)
        return
      }
    })
  } else {
    profilesSetting.value.forEach((item: any, index: number) => {
      if (item.key === favorite.key) {
        profilesSetting.value.splice(index, 1)
        return
      }
    })
  }
}

const handleAddBadge = () => {
  footerSetting.value.push({
    key: Date.now(),
    nameEn: "badge",
    nameZh: "徽标",
    type: 2,
    value: {
      color: "",
      subject: "",
      title: "",
      url: "",
      value: ""
    }
  })
}


const handleFooterSettingSubmit = () => {
  saveFooterSetting(footerSetting.value)
}

const handleDeleteBadge = (badge: any) => {
  if (badge.id) {
    deleteBadge(badge.id)
    footerSetting.value.forEach((item: any, index: number) => {
      if (item.id === badge.id) {
        footerSetting.value.splice(index, 1)
        return
      }
    })
  } else {
    footerSetting.value.forEach((item: any, index: number) => {
      if (item.key === badge.key) {
        footerSetting.value.splice(index, 1)
        return
      }
    })
  }
}
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
  box-shadow: inset 0 0 6px #48dbfb ;
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