<script lang="ts" setup>
import { onBeforeMount, reactive, ref } from "vue";
import {
  deleteBlogById,
  getBlogListData,
  getCategoryListData,
  saveBlog,
  updateBlogRecommend,
  updateBlogTop
} from "@/api/blog";
import { message, msgError, msgSuccess } from "@/utils/message";
import { isEmpty, isNotEmpty } from "@/utils/func";
import { useRouter } from "vue-router";
import { ElMessageBox } from "element-plus";
import Breadcrumb from "@/components/Breadcrumb.vue";
import { Search, EditPen, Edit, Delete } from "@element-plus/icons-vue";
import * as moment from 'moment'

const router = useRouter()

const queryInfo = reactive<any>({
  title: '',
  categoryId: null,
  pageNum: 1,
  pageSize: 10
})
const blogList = ref<any[]>([])
const categoryList = ref<any[]>([])
const total = ref<number>(0)
const dialogVisible = ref<boolean>(false)
const blogId = ref<string>('')
const radio = ref<string>('public')
const appreciation = ref<boolean>(false)
const recommend = ref<boolean>(false)
const commentEnabled = ref<boolean>(false)
const top = ref<boolean>(false)
const published = ref<boolean>(false)
const password = ref<string>('')

onBeforeMount(() => {
  init()
})

const init = () => {
  getCategoryList()
  getBlogList()
}

const getCategoryList = () => {
  const data = getCategoryListData();
  categoryList.value = data
}

const getBlogList = () => {
  const data = getBlogListData(queryInfo)
  blogList.value = data.blogList
  total.value = data.total
}

const handleQuery = () => {
  getBlogList()
}

const handleBlogTopSwitch = (row: any) => {
  updateBlogTop(row.id, row.top)
  row.top ? msgSuccess('置顶成功') : msgSuccess('取消置顶成功')
}

const handleBlogRecommendSwitch = (row: any) => {
  updateBlogRecommend(row.id, row.recommend)
  row.recommend ? msgSuccess('推荐成功') : msgSuccess('取消推荐成功')
}

const HandleBlogVisibilityClick = (row: any) => {
  appreciation.value = row.appreciation
  recommend.value = row.recommend
  commentEnabled.value = row.commentEnabled
  top.value = row.top
  published.value = row.published
  password.value = row.password
  blogId.value = row.id
  radio.value = published.value ? (isNotEmpty(password.value) ? 'password' : 'public') : 'private'
  dialogVisible.value = true
}

const handleVisibilitySubmit = () => {
  if (radio.value === 'password') {
    if (isEmpty(password.value)) {
      msgError("密码保护模式必须填写密码")
      return;
    }
  } else {
    password.value = ''
  }

  if (radio.value === 'private') {
    appreciation.value = false
    recommend.value = false
    commentEnabled.value = false
    top.value = false
    published.value = false
  } else {
    published.value = true
  }

  const param = {
    id: blogId.value,
    appreciation: appreciation.value,
    recommend: recommend.value,
    commentEnabled: commentEnabled.value,
    top: top.value,
    published: published.value,
    password: password.value
  }

  saveBlog(param)
  getBlogList()
  dialogVisible.value = false
}

const handleSizeChange = (newSize: number) => {
  queryInfo.pageSize = newSize
  getBlogList()
}

const handleCurrentChange = (newPage: number) => {
  queryInfo.pageNum = newPage
  getBlogList()
}

const toBlogEditPage = (id: string) => {
  router.push(`/blogManage/blog/edit/${id}`)
}

const handleDeleteBlogById = (id: string) => {
  ElMessageBox.confirm(
    `此操作将永久删除该博客<strong style="color: red">及其所有评论</strong>，是否删除?<br>建议将博客置为<strong style="color: red">私密</strong>状态！`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      dangerouslyUseHTMLString: true
    }
  ).then(() => {
    deleteBlogById(id)
    getBlogList()
  }).catch(() => {
    message('已取消')
  })
}
</script>

<template>
  <!--面包屑导航-->
  <Breadcrumb parentTitle="博客管理"/>

  <!--搜索区域-->
  <el-row>
    <el-col :span="8">
      <el-input
          v-model="queryInfo.title"
          @clear="handleQuery"
          @keyup.native.enter="handleQuery"
          clearable
          placeholder="请输入标题"
          style="min-width: 500px">
        <template #prepend>
          <el-select
              v-model="queryInfo.categoryId"
              @change="handleQuery"
              clearable
              placeholder="请选择分类"
              style="width: 160px">
            <el-option :label="item.name" :value="item.id" v-for="item in categoryList" :key="item.id"/>
          </el-select>
        </template>
        <template #append>
          <el-button :icon="Search"/>
        </template>
      </el-input>
    </el-col>
  </el-row>

  <el-table class="m-table" size="large" :data="blogList">
    <el-table-column type="index" width="50" />
    <el-table-column label="标题" prop="title" show-overflow-tooltip/>
    <el-table-column label="分类" prop="category.name" width="150"/>
    <el-table-column label="置顶" width="80">
      <template  #default="scope">
        <el-switch v-model="scope.row.top" @change="handleBlogTopSwitch(scope.row)"/>
      </template>
    </el-table-column>
    <el-table-column label="推荐" width="80">
      <template #default="scope">
        <el-switch v-model="scope.row.recommend" @change="handleBlogRecommendSwitch(scope.row)"></el-switch>
      </template>
    </el-table-column>
    <el-table-column label="可见性" width="100">
      <template #default="scope">
        <el-link :icon="EditPen" :underline="false" @click="HandleBlogVisibilityClick(scope.row)">
          {{ scope.row.published ? (isNotEmpty(scope.row.password) ? '密码保护' : '公开') : '私密' }}
        </el-link>
      </template>
    </el-table-column>
    <el-table-column label="创建时间" width="170">
      <template v-slot="scope">{{ moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss') }}</template>
    </el-table-column>
    <el-table-column label="最近更新" width="170">
      <template v-slot="scope">{{ moment(scope.row.updateTime).format('YYYY-MM-DD HH:mm:ss') }}</template>
    </el-table-column>
    <el-table-column label="操作" width="200">
      <template #default="scope">
        <el-button type="primary" size="small" :icon="Edit" @click="toBlogEditPage(scope.row.id)">编辑</el-button>
        <el-button type="danger" size="small" :icon="Delete" @click="handleDeleteBlogById(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!--分页-->
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pageNum"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="queryInfo.pageSize"
      :total="total"
      small
      layout="total, sizes, prev, pager, next, jumper"
      background/>

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
        <el-input v-model="password"/>
      </el-form-item>
      <el-form-item v-if="radio !== 'private'">
        <el-row class="m-width-full">
          <el-col :span="6">
            <el-switch v-model="appreciation" active-text="赞赏"></el-switch>
          </el-col>
          <el-col :span="6">
            <el-switch v-model="recommend" active-text="推荐"></el-switch>
          </el-col>
          <el-col :span="6">
            <el-switch v-model="commentEnabled" active-text="评论"></el-switch>
          </el-col>
          <el-col :span="6">
            <el-switch v-model="top" active-text="置顶"></el-switch>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>

    <!--底部-->
    <template #footer>
      <span>
				<el-button size="large" @click="dialogVisible=false">取 消</el-button>
				<el-button size="large" type="primary" @click="handleVisibilitySubmit">保存</el-button>
			</span>
    </template>
  </el-dialog>
</template>

<style scoped>
:deep(.el-input-group__prepend) {
  background-color: #fff !important;
}

.m-table {
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>