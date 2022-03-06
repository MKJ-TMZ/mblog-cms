<script lang="ts" setup>
import { ref, onBeforeMount, reactive } from "vue";
import { getMomentDataById, saveMoment } from "@/api/moment";
import { useRoute, useRouter } from "vue-router";
import { msgError, msgSuccess } from "@/utils/message";
import Breadcrumb from "@/components/Breadcrumb.vue";

const router = useRouter()
const route = useRoute()

const form = reactive<any>({
  content: '',
  createTime: null,
  likes: 0,
  published: false
})
const formRef = ref<any>()
const formRules = {
  content: [{required: true, message: '请输入动态内容', trigger: 'change'}]
}

onBeforeMount(() => {
  if (route.name === 'momentEdit') {
    getMomentById(route.params.id as string)
  }
})

const handleSubmit = (published: boolean) => {
  form.published = published
  if (published) {
    if (!formRef.value) {
      return;
    }
    formRef.value.validate((valid: any) => {
      if (valid) {
        handleSaveMoment()
      } else {
        msgError('请填写必要的表单项')
        return;
      }
    })
  } else {
    handleSaveMoment()
  }
}

const getMomentById = (id: string) => {
  const data = getMomentDataById(id)
  form.content = data.content
  form.createTime = data.createTime
  form.likes = data.likes
  form.published = data.published
}

const handleSaveMoment = () => {
  saveMoment(form)
  msgSuccess('发布成功')
  router.push('/blogManage/moment/list')
}
</script>

<template>
  <!--面包屑导航-->
  <Breadcrumb parentTitle="博客管理"/>

  <el-form ref="formRef" size="lager" label-position="top" :model="form" :rules="formRules">
    <el-form-item label="动态内容" prop="content">
      <mavon-editor class="m-width-full" v-model="form.content"/>
    </el-form-item>

    <el-form-item size="large" class="form-buttons">
      <el-button type="info" @click="handleSubmit(false)">保存草稿</el-button>
      <el-button type="primary" @click="handleSubmit(true)">发布动态</el-button>
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