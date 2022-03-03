<script lang="ts" setup>
import { reactive, ref } from "vue";
import Breadcrumb from "@/components/Breadcrumb.vue";

const categoryList = ref<any[]>([])
const tagList = ref<any[]>([])
const dialogVisible = ref<boolean>(false)
const radio = ref<number>(1)
const form = reactive<any>({
  title: '',
  firstPicture: '',
  description: '',
  content: '',
  cate: null,
  tagList: [],
  wordCounts: null,
  readTime: null,
  views: 0,
  appreciation: false,
  recommend: false,
  commentEnabled: false,
  top: false,
  published: false,
  password: ''
})
const formRules = {
  title: [{required: true, message: '请输入标题', trigger: 'change'}],
  firstPicture: [{required: true, message: '请输入首图链接', trigger: 'change'}],
  cate: [{required: true, message: '请选择分类', trigger: 'change'}],
  tagList: [{required: true, message: '请选择标签', trigger: 'change'}],
  wordCounts: [{required: true, message: '请输入文章字数', trigger: 'change'}]
}
</script>

<template>
  <!--面包屑导航-->
  <Breadcrumb parentTitle="博客管理"/>

  <el-form
      size="large"
      ref="formRef"
      label-position="top"
      :model="form"
      :rules="formRules"
  >
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="文章首图URL" prop="firstPicture">
          <el-input v-model="form.firstPicture" placeholder="文章首图，用于随机文章展示"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="分类" prop="cate">
          <el-select
              v-model="form.cate"
              placeholder="请选择分类（输入可添加新分类）"
              style="width: 100%;"
              :allow-create="true"
              :filterable="true"
          >
            <el-option :label="item.name" :value="item.id" v-for="item in categoryList" :key="item.id"/>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="标签" prop="tagList">
          <el-select
              v-model="form.tagList"
              placeholder="请选择标签（输入可添加新标签）"
              style="width: 100%;"
              :allow-create="true"
              :filterable="true"
              :multiple="true"
          >
            <el-option :label="item.name" :value="item.id" v-for="item in tagList" :key="item.id"/>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="字数" prop="wordCounts">
          <el-input-number
              style="width: 100%"
              placeholder="请输入文章字数（自动计算阅读时长）"
              controls-position="right"
              v-model="form.wordCounts"
              :min="0"
          />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="阅读时长(分钟)" prop="readTime">
          <el-input-number
              style="width: 100%"
              placeholder="请输入阅读时长（可选）默认 Math.round(字数 / 200)"
              controls-position="right"
              v-model="form.readTime"
              :min="0"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="文章描述" prop="description">
          <mavon-editor style="width: 100%" v-model="form.description"/>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="文章正文" prop="content">
          <mavon-editor style="width: 100%" v-model="form.content"/>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<style scoped>
:deep(label) {
  line-height: 40px !important;
}
</style>