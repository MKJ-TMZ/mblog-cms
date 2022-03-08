<script lang="ts" setup>
import { onBeforeMount, reactive, ref } from "vue";
import { deleteCategoryById, getCategoryListData, saveCategory } from "@/api/category";
import Breadcrumb from "@/components/Breadcrumb.vue";
import { Delete, Edit, Plus } from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";
import { message, msgError, msgSuccess } from "@/utils/message";

const queryInfo = reactive<any>({
  pageNum: 1,
  pageSize: 10
})
const categoryList = ref<any[]>([])
const total = ref<number>(0)
const dialogVisible = ref<boolean>(false)
const dialogForm = reactive<any>({
  id: '',
  name: ''
})
const formRef = ref<any>()
const formRules = {
  name: [{required: true, message: '请输入分类名称', trigger: 'blur'}]
}

onBeforeMount(() => {
  init()
})

const init = () => {
  getCategoryList()
}

const getCategoryList = () => {
  const data = getCategoryListData(queryInfo)
  categoryList.value = data.list;
  total.value = data.total
}

const handleSizeChange = (newSize: number) => {
  queryInfo.pageSize = newSize
  getCategoryList()
}

const handleCurrentChange = (newPage: number) => {
  queryInfo.pageNum = newPage
  getCategoryList()
}

const handleDialogClosed = () => {
  dialogForm['id'] = ''
  dialogForm['name'] = ''
}

const HandleSaveCategory = () => {
  if (!formRef.value) {
    return;
  }
  formRef.value.validate((valid: any) => {
    if (valid) {
      saveCategory(dialogForm)
      dialogVisible.value = false
    } else {
      msgError('请填写必要的表单项')
      return;
    }
  })
}

const handleEditClick = (row: any) => {
  dialogForm.id = row['id']
  dialogForm.name = row['name']
  dialogVisible.value = true
}

const handleDeleteCategoryById = (id: string) => {
  ElMessageBox.confirm(
      `此操作将永久删除该分类，是否删除?`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true
      }
  ).then(() => {
    deleteCategoryById(id)
    getCategoryList()
    msgSuccess('刪除成功')
  }).catch(() => {
    message('已取消')
  })
}

</script>

<template>
  <!--面包屑导航-->
  <Breadcrumb parentTitle="博客管理"/>

  <!--添加按钮-->
  <el-row :gutter="10">
    <el-col :span="6">
      <el-button type="primary" :icon="Plus" @click="dialogVisible = true">添加分类</el-button>
    </el-col>
  </el-row>

  <el-table class="m-table" :data="categoryList">
    <el-table-column type="index" width="50"/>
    <el-table-column label="名称" prop="name"  show-overflow-tooltip/>
    <el-table-column fixed="right" label="操作" width="200">
      <template #default="scope">
        <el-button type="primary" size="small" :icon="Edit" @click="handleEditClick(scope.row)">编辑</el-button>
        <el-button type="danger" size="small" :icon="Delete" @click="handleDeleteCategoryById(scope.row.id)">删除</el-button>
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
      layout="total, sizes, prev, pager, next, jumper"
      background
      small
  />

  <!--对话框-->
  <el-dialog title="添加分类" width="50%" v-model="dialogVisible" @close="handleDialogClosed">
    <!--内容主体-->
    <el-form size="large" :model="dialogForm" ref="formRef" :rules="formRules" label-width="80px">
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="dialogForm.name"/>
      </el-form-item>
    </el-form>
    <!--底部-->
    <template #footer>
      <span>
				<el-button size="large" @click="dialogVisible=false">取 消</el-button>
				<el-button size="large" type="primary" @click="HandleSaveCategory">确 定</el-button>
			</span>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>