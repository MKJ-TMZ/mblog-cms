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
import { Plus, Delete } from "@element-plus/icons-vue";

const baseSetting = ref<any>({})
const profilesSetting = ref<any>({})
const footerSetting = ref<any>({})

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

  <el-card>
    <template #header>
      <span>基础设置</span>
    </template>
    <el-form size="large" label-position="right" label-width="100px">
      <el-row :gutter="20">
        <el-col v-for="item in baseSetting" :sm="{span: 12}" :xs="{span: 24}">
          <el-form-item :label="item.nameZh" :key="item.id">
            <el-input v-model="item.value"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item style="margin-bottom: 0" class="form-buttons">
        <el-button type="primary" @click="handleBaseSettingSubmit">更新</el-button>
      </el-form-item>
    </el-form>
  </el-card>

  <el-card style="margin-top: 20px;">
    <template #header>
      <span>基础设置</span>
    </template>
    <el-form size="large" label-position="right" label-width="100px">
      <el-row :gutter="20">
        <el-col v-for="item in profilesSetting" :sm="{span: 12}" :xs="{span: 24}">
          <el-form-item :label="item.nameZh" v-if="item.nameEn === 'favorite'">
            <el-input v-model="item.value">
              <template #append>
                <el-button style="background-color: #f56c6c; color: #fcecff" @click="handleDeleteProfiles(item)">删除</el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item :label="item.nameZh" v-if="item.nameEn !== 'favorite'">
            <el-input v-model="item.value"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item style="margin-bottom: 0" class="form-buttons">
        <el-button type="primary" :icon="Plus" @click="handleAddProfiles">添加自定义</el-button>
        <el-button type="primary" @click="handleProfilesSettingSubmit">更新</el-button>
      </el-form-item>
    </el-form>
  </el-card>

  <el-card style="margin-top: 20px;">
    <template #header>
      <span>页脚徽标</span>
    </template>
    <el-form size="large" label-position="right" :inline="true">
      <el-row v-for="badge in footerSetting" :key="badge.id">
        <el-form-item label="title">
          <el-input v-model="badge.value.title"/>
        </el-form-item>
        <el-form-item label="url">
          <el-input v-model="badge.value.url"/>
        </el-form-item>
        <el-form-item label="subject">
          <el-input v-model="badge.value.subject"/>
        </el-form-item>
        <el-form-item label="value">
          <el-input v-model="badge.value.value"/>
        </el-form-item>
        <el-form-item label="color">
          <el-input v-model="badge.value.color"/>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" :icon="Delete" @click="handleDeleteBadge(badge)">删除</el-button>
        </el-form-item>
      </el-row>
      <el-form-item style="margin-bottom: 0;" class="form-buttons">
        <el-button type="primary" :icon="Plus" @click="handleAddBadge">添加自定义</el-button>
        <el-button type="primary" @click="handleFooterSettingSubmit">更新</el-button>
      </el-form-item>
    </el-form>
  </el-card>

</template>

<style scoped>
:deep(label) {
  line-height: 40px !important;
}

:deep(.el-form-item__content) {
  display: flex;
  justify-content: flex-end;
}
</style>