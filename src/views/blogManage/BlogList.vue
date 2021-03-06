<script lang="ts" setup>
import { onBeforeMount, reactive, ref } from "vue";
import { deleteBlogById, getBlogPageData, saveBlog } from "@/api/blog";
import { message, msgError, msgSuccess } from "@/utils/message";
import { isEmpty, isNotEmpty } from "@/utils/func";
import { useRouter } from "vue-router";
import { ElMessageBox } from "element-plus";
import Breadcrumb from "@/components/Breadcrumb.vue";
import { Delete, Edit, EditPen, Search } from "@element-plus/icons-vue";
import * as moment from 'moment'
import { getCategoryListData } from "@/api/category";

const router = useRouter()

const queryInfo = reactive<any>({
  title: '',
  categoryId: null,
  current: 1,
  size: 10
})
const blogList = ref<any[]>([])
const categoryList = ref<any[]>([])
const total = ref<number>(0)
const dialogVisible = ref<boolean>(false)
const blogId = ref<string>('')
const radio = ref<string>('public')
const isAppreciation = ref<boolean>(false)
const isRecommend = ref<boolean>(false)
const isCommentEnabled = ref<boolean>(false)
const isTop = ref<boolean>(false)
const isPublished = ref<boolean>(false)
const password = ref<string>('')

onBeforeMount(() => {
  init()
})

const init = () => {
  getCategoryList()
  getBlogPage()
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

const getBlogPage = () => {
  getBlogPageData(queryInfo).then((res: any) => {
    if (res.code === 200) {
      const { data } = res
      blogList.value = data.records
      total.value = data.total
    }
  }).catch((error: any) => {
    msgError('获取分页信息失败')
    console.log(error.msg)
  })
}

const handleQuery = () => {
  getBlogPage()
}

const handleBlogTopSwitch = (row: any) => {
  const {id, isTop} = row
  saveBlog({id, isTop}).then((res: any) => {
    if (res.code == 200) {
      isTop ? msgSuccess('置顶成功') : msgSuccess('取消置顶成功')
      getBlogPage()
    }
  }).catch((error: any) => {
    msgError('更新失败')
    console.log(error.msg)
  })
}

const handleBlogRecommendSwitch = (row: any) => {
  const {id, isRecommend} = row
  saveBlog({id, isRecommend}).then((res: any) => {
    if (res.code == 200) {
      isRecommend ? msgSuccess('推荐成功') : msgSuccess('取消推荐成功')
      getBlogPage()
    }
  }).catch((error: any) => {
    msgError('更新失败')
    console.log(error.msg)
  })
}

const HandleBlogVisibilityClick = (row: any) => {
  isAppreciation.value = row.isAppreciation
  isRecommend.value = row.isRecommend
  isCommentEnabled.value = row.isCommentEnabled
  isTop.value = row.isTop
  isPublished.value = row.isPublished
  password.value = row.password
  blogId.value = row.id
  radio.value = isPublished.value ? (isNotEmpty(password.value) ? 'password' : 'public') : 'private'
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
    isAppreciation.value = false
    isRecommend.value = false
    isCommentEnabled.value = false
    isTop.value = false
    isPublished.value = false
  } else {
    isPublished.value = true
  }

  const param = {
    id: blogId.value,
    isAppreciation: isAppreciation.value,
    isRecommend: isRecommend.value,
    isCommentEnabled: isCommentEnabled.value,
    isTop: isTop.value,
    isPublished: isPublished.value,
    password: password.value
  }

  saveBlog(param).then((res: any) => {
    if (res.code === 200) {
      msgSuccess("更新成功")
      getBlogPage()
      dialogVisible.value = false
    }
  }).catch((error: any) => {
    msgError('更新失败')
    console.log(error.msg)
  })
}

const handleSizeChange = (newSize: number) => {
  queryInfo.size = newSize
  getBlogPage()
}

const handleCurrentChange = (newPage: number) => {
  queryInfo.current = newPage
  getBlogPage()
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
    deleteBlogById(id).then((res: any) => {
      if (res.code == 200) {
        msgSuccess('刪除成功')
        getBlogPage()
      }
    }).catch((error: any) => {
      msgError('删除失败')
      console.log(error.msg)
    })
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
          <el-button :onclick="handleQuery" :icon="Search"/>
        </template>
      </el-input>
    </el-col>
  </el-row>

  <el-table class="m-table" size="large" :data="blogList">
    <el-table-column type="index" width="50"/>
    <el-table-column label="标题" prop="title" show-overflow-tooltip/>
    <el-table-column label="分类" prop="categoryName" width="150"/>
    <el-table-column label="置顶" width="80">
      <template #default="scope">
        <el-switch v-model="scope.row.isTop" @change="handleBlogTopSwitch(scope.row)"/>
      </template>
    </el-table-column>
    <el-table-column label="推荐" width="80">
      <template #default="scope">
        <el-switch v-model="scope.row.isRecommend" @change="handleBlogRecommendSwitch(scope.row)"/>
      </template>
    </el-table-column>
    <el-table-column label="可见性" width="120">
      <template #default="scope">
        <el-link :icon="EditPen" :underline="false" @click="HandleBlogVisibilityClick(scope.row)">
          {{ scope.row.isPublished ? (isNotEmpty(scope.row.password) ? '密码保护' : '公开') : '私密' }}
        </el-link>
      </template>
    </el-table-column>
    <el-table-column label="创建时间" width="200">
      <template #default="scope">
        {{ scope.row.createTime ? moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss') : '' }}
      </template>
    </el-table-column>
    <el-table-column label="最近更新" width="200">
      <template #default="scope">
        {{ scope.row.updateTime ? moment(scope.row.updateTime).format('YYYY-MM-DD HH:mm:ss') : '' }}
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="200">
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
      :current-page="queryInfo.current"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="queryInfo.size"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      background
      small
  />

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
            <el-switch v-model="isAppreciation" active-text="赞赏"></el-switch>
          </el-col>
          <el-col :span="6">
            <el-switch v-model="isRecommend" active-text="推荐"></el-switch>
          </el-col>
          <el-col :span="6">
            <el-switch v-model="isCommentEnabled" active-text="评论"></el-switch>
          </el-col>
          <el-col :span="6">
            <el-switch v-model="isTop" active-text="置顶"></el-switch>
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
</style>