<script lang="ts" setup>
import { onBeforeMount, reactive, ref } from "vue";
import { getAboutDate, saveAbout } from "@/api/about";
import { msgError, msgSuccess } from "@/utils/message";
import Breadcrumb from "@/components/Breadcrumb.vue";

const form = reactive<any>({
  id: '',
  title: '',
  content: '',
  isCommentEnabled: true
})
const formRef = ref<any>()
const formRules = {
  title: [{required: true, message: '请输入标题', trigger: 'change'}],
}

onBeforeMount(() => {
  init()
})

const init = () => {
  getAbout()
}

const getAbout = () => {
  getAboutDate().then((res: any) => {
    if (res.code === 200) {
      const {data} = res
      form.id = data.id
      form.title = data.title
      form.content = data.content
      form.isCommentEnabled = data.isCommentEnabled
    }
  }).catch((error: any) => {
    msgError('获取关于我信息失败')
    console.log(error.msg)
  })
}

const handleSubmit = () => {
  if (!formRef.value) {
    return;
  }
  formRef.value.validate((valid: any) => {
    if (valid) {
      saveAbout(form).then((res: any) => {
        if (res.code === 200) {
          msgSuccess('更新成功')
          getAbout()
        }
      }).catch((error: any) => {
        msgError('更新失败')
        console.log(error.msg)
      })
    } else {
      msgError('请填写必要的表单项')
      return;
    }
  })
}
</script>

<template>
  <!--面包屑导航-->
  <Breadcrumb parentTitle="页面管理"/>

  <!--主体部分-->
  <el-form
      size="large"
      ref="formRef"
      label-position="top"
      :model="form"
      :rules="formRules"
  >
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="评论开关">
          <el-switch v-model="form.isCommentEnabled"/>
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item label="正文" prop="content">
      <mavon-editor class="m-width-full" v-model="form.content"/>
    </el-form-item>

    <el-form-item class="form-buttons">
      <el-button type="primary" @click="handleSubmit">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="less" scoped>
:deep(label) {
  line-height: 40px !important;
}

:deep(.form-buttons) {
  .el-form-item__content {
    justify-content: flex-end;
  }
}
</style>