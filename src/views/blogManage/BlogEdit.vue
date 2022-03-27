<script lang="ts" setup>
import { onBeforeMount, reactive, ref } from "vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import { getBlogDataById, saveBlog } from "@/api/blog";
import { msgError, msgSuccess } from "@/utils/message";
import { isEmpty, isNotEmpty } from "@/utils/func";
import { useRoute, useRouter } from "vue-router";
import { getTagListData } from "@/api/tag";
import { getCategoryListData } from "@/api/category";

const router = useRouter()
const route = useRoute()

const categoryList = ref<any[]>([])
const tagList = ref<any[]>([])
const dialogVisible = ref<boolean>(false)
const radio = ref<string>('public')
const formRef = ref<any>()
const form = reactive<any>({
  id: '',
  title: '',
  coverPic: '',
  description: '',
  content: '',
  categoryName: '',
  tagNameSet: [],
  wordsCount: 0,
  readTime: 0,
  viewCounts: 0,
  isAppreciation: false,
  isRecommend: false,
  isCommentEnabled: false,
  isTop: false,
  isPublished: false,
  password: '',
  // 是否是草稿
  isDraft: false
})
const formRules = {
  title: [{required: true, message: '请输入标题', trigger: 'change'}],
  coverPic: [{required: true, message: '请输入首图链接', trigger: 'change'}],
  categoryName: [{required: true, message: '请选择分类', trigger: 'change'}],
  tagNameSet: [{required: true, message: '请选择标签', trigger: 'change'}],
  wordsCount: [{required: true, message: '请输入文章字数', trigger: 'change'}],
  description: [{required: true, message: '请输入文章描述', trigger: 'change'}],
  content: [{required: true, message: '请输入文章正文', trigger: 'change'}]
}

onBeforeMount(() => {
  init()
})

const init = () => {
  getTagList()
  getCategoryList()
  if (route.name === 'blogEdit') {
    getBlogById()
  }
}

const getTagList = () => {
  getTagListData().then((res: any) => {
    if (res.code === 200) {
      tagList.value = res.data
    }
  }).catch((error: any) => {
    msgError('获取标签失败')
    console.log(error.msg)
  })
}

const getCategoryList = () => {
  getCategoryListData().then((res: any) => {
    if (res.code === 200) {
      categoryList.value = res.data
    }
  }).catch((error: any) => {
    msgError('获取分类失败')
    console.log(error.msg)
  })
}

const handleWordCountsChange = () => {
  form.readTime = form.wordsCount ? Math.round(form.wordsCount / 200) : 0
}

const handleFormSubmit = (isDraft: boolean) => {
  form.isDraft = isDraft
  if (isDraft) {
    handleSaveBlog()
  } else {
    if (!formRef.value) {
      return;
    }
    formRef.value.validate((valid: any) => {
      if (valid) {
        dialogVisible.value = true
      } else {
        msgError('请填写必要的表单项')
        return;
      }
    })
  }
}

const handleDialogSubmit = () => {
  if (radio.value === 'password') {
    if (isEmpty(form.password)) {
      msgError("密码保护模式必须填写密码")
      return;
    }
  } else {
    form.password = ''
  }

  if (radio.value === 'private') {
    form.isAppreciation = false
    form.isRecommend = false
    form.isCommentEnabled = false
    form.isTop = false
    form.isPublished = false
  } else {
    form.isPublished = true
  }

  handleSaveBlog()
}

const getBlogById = () => {
  getBlogDataById(route.params.id as string).then((res: any) => {
    if (res.code === 200) {
      form.id = res.data.id
      form.title = res.data.title
      form.coverPic = res.data.coverPic
      form.description = res.data.description
      form.content = res.data.content
      form.categoryName = res.data.categoryName
      form.tagNameSet = res.data.tagNameSet
      form.wordsCount = res.data.wordsCount
      form.readTime = res.data.readTime
      form.viewCounts = res.data.viewCounts
      form.isAppreciation = res.data.isAppreciation
      form.isRecommend = res.data.isRecommend
      form.isCommentEnabled = res.data.isCommentEnabled
      form.isTop = res.data.isTop
      form.isPublished = res.data.isPublished
      form.password = res.data.password
      radio.value = form.isPublished ? (isNotEmpty(form.password) ? 'password' : 'public') : 'private'
    }
  }).catch((error: any) => {
    msgError('获取详情失败')
    console.log(error.msg)
  })

}

const handleSaveBlog = () => {
  saveBlog(form).then((res: any) => {
    if (res.code === 200) {
      if (form.isDraft) {
        msgSuccess('保存成功')
      } else {
        msgSuccess('发布成功')
        router.push('/blogManage/blog/list')
      }
    } else {
      msgError(res.msg)
    }
  }).catch((error: any) => {
    msgError('发布失败')
    console.log(error.msg)
  })
}
</script>

<template>
  <!--面包屑导航-->
  <Breadcrumb parentTitle="博客管理"/>

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
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="封面图片URL" prop="coverPic">
          <el-input v-model="form.coverPic" placeholder="文章首图，用于随机文章展示"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="分类" prop="categoryName">
          <el-select
              v-model="form.categoryName"
              placeholder="请选择分类（输入可添加新分类）"
              class="m-width-full"
              filterable
              allow-create
          >
            <el-option :label="item.name" :value="item.name" v-for="item in categoryList" :key="item.id"/>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="标签" prop="tagNameSet">
          <el-select
              v-model="form.tagNameSet"
              placeholder="请选择标签（输入可添加新标签）"
              class="m-width-full"
              filterable
              allow-create
              multiple
          >
            <el-option :label="item.name" :value="item.name" v-for="item in tagList" :key="item.id"/>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="字数（自动计算阅读时长）" prop="wordsCount">
          <el-input-number
              class="m-width-full"
              placeholder="请输入文章字数（自动计算阅读时长）"
              controls-position="right"
              v-model="form.wordsCount"
              :onChange="handleWordCountsChange"
              :min="0"
          />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="阅读时长(分钟)" prop="readTime">
          <el-input-number
              class="m-width-full"
              placeholder="请输入阅读时长（可选）默认 Math.round(字数 / 200)"
              controls-position="right"
              v-model="form.readTime"
              :min="0"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item label="文章描述" prop="description">
      <mavon-editor class="m-width-full" v-model="form.description"/>
    </el-form-item>
    <el-form-item label="文章正文" prop="content">
      <mavon-editor class="m-width-full" v-model="form.content"/>
    </el-form-item>

    <el-form-item class="form-buttons">
      <el-button type="info" @click="handleFormSubmit(true)">保存草稿</el-button>
      <el-button type="primary" @click="handleFormSubmit(false)">发布</el-button>
    </el-form-item>
  </el-form>

  <!--编辑可见性状态对话框-->
  <el-dialog title="博客可见性" width="30%" v-model="dialogVisible">
    <!--内容主体-->
    <el-form size="large" label-width="50px" @submit.native.prevent>
      <el-form-item>
        <el-radio-group v-model="radio">
          <el-radio label="public">公开</el-radio>
          <el-radio label="private">私密</el-radio>
          <el-radio label="password">密码保护</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="密码" v-if="radio === 'password'">
        <el-input v-model="form.password"/>
      </el-form-item>
      <el-form-item v-if="radio !== 'private'">
        <el-row class="m-width-full">
          <el-col :span="6">
            <el-switch v-model="form.isAppreciation" active-text="赞赏"></el-switch>
          </el-col>
          <el-col :span="6">
            <el-switch v-model="form.isRecommend" active-text="推荐"></el-switch>
          </el-col>
          <el-col :span="6">
            <el-switch v-model="form.isCommentEnabled" active-text="评论"></el-switch>
          </el-col>
          <el-col :span="6">
            <el-switch v-model="form.isTop" active-text="置顶"></el-switch>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>

    <!--底部-->
    <template #footer>
      <span>
				<el-button size="large" @click="dialogVisible=false">取 消</el-button>
				<el-button size="large" type="primary" @click="handleDialogSubmit">保 存</el-button>
			</span>
    </template>
  </el-dialog>
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