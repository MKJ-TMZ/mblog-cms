<script lang="ts" setup>
import { ref, onBeforeMount, reactive } from "vue";
import { getMomentDataById, saveMoment } from "@/api/moment";
import { useRoute, useRouter } from "vue-router";
import { msgError, msgSuccess } from "@/utils/message";
import Breadcrumb from "@/components/Breadcrumb.vue";

const router = useRouter()
const route = useRoute()

const form = reactive<any>({
  id: '',
  content: '',
  createTime: null,
  likeCount: 0,
  isPublished: false
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

const handleSubmit = (isPublished: boolean) => {
  if (isPublished) {
    if (!formRef.value) {
      return;
    }
    formRef.value.validate((valid: any) => {
      if (valid) {
        form.isPublished = true
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
  getMomentDataById(id).then((res: any) => {
    if (res.code === 200) {
      const { data } = res
      form.content = data.content
      form.id = data.id
      form.createTime = data.createTime
      form.likeCount = data.likeCount
      form.isPublished = data.isPublished
    }
  }).catch((error: any) => {
    msgError('获取详情失败')
    console.log(error.msg)
  })
}

const handleSaveMoment = () => {
  saveMoment(form).then((res: any) => {
    if (res.code === 200) {
      msgSuccess('发布成功')
      router.push('/blogManage/moment/list')
    }
  }).catch((error: any) => {
    msgError('保存失败')
    console.log(error.msg)
  })
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