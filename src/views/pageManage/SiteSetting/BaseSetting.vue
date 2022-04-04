<script lang="ts" setup>
import { getBaseSettingData, saveBaseSetting } from "@/api/siteSetting";
import { onBeforeMount, ref } from "vue";
import { msgError, msgSuccess } from "@/utils/message";

const baseSetting = ref<any>({
  blogName: '',
  webTitleSuffix: '',
  homeTitle: '',
  copyright: '',
  icpNo: '',
  rewardUrl: ''
})

onBeforeMount(() => {
  init()
})

const init = () => {
  getBaseSetting()
}

const getBaseSetting = () => {
  getBaseSettingData().then((res: any) => {
    if (res.code == 200) {
      baseSetting.value = res.data
    }
  }).catch((error: any) => {
    msgError('获取详情失败')
  })
}

const handleSubmit = () => {
  saveBaseSetting(baseSetting.value).then((res: any) => {
    if (res.code === 200) {
      msgSuccess('更新成功')
      getBaseSetting()
    }
  }).catch((error: any) => {
    msgError('更新失败')
  })
}
</script>

<template>
  <el-card>
    <template #header>
      <span>基础设置</span>
    </template>
    <el-form size="large" label-position="right" label-width="100px">
      <el-row :gutter="20">
        <el-col :sm="{span: 12}" :xs="{span: 24}">
          <el-form-item label="博客名称">
            <el-input v-model="baseSetting.blogName"/>
          </el-form-item>
        </el-col>
        <el-col :sm="{span: 12}" :xs="{span: 24}">
          <el-form-item label="网页标题后缀">
            <el-input v-model="baseSetting.webTitleSuffix"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :sm="{span: 12}" :xs="{span: 24}">
          <el-form-item label="首页标题">
            <el-input v-model="baseSetting.homeTitle"/>
          </el-form-item>
        </el-col>
        <el-col :sm="{span: 12}" :xs="{span: 24}">
          <el-form-item label="Copyright">
            <el-input v-model="baseSetting.copyright"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :sm="{span: 12}" :xs="{span: 24}">
          <el-form-item label="ICP备案号">
            <el-input v-model="baseSetting.icpNo"/>
          </el-form-item>
        </el-col>
        <el-col :sm="{span: 12}" :xs="{span: 24}">
          <el-form-item label="赞赏码路径">
            <el-input v-model="baseSetting.rewardUrl"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item style="margin-bottom: 0" class="form-buttons">
        <el-button type="primary" @click="handleSubmit">更新</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped>

</style>