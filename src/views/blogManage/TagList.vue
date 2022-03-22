<script lang="ts" setup>
import { onBeforeMount, reactive, ref } from "vue";
import { deleteTagById, getTagPageData, saveTag } from "@/api/tag";
import { message, msgError, msgSuccess } from "@/utils/message";
import { ElMessageBox } from "element-plus";
import Breadcrumb from "@/components/Breadcrumb.vue";
import { Delete, Edit, Plus } from "@element-plus/icons-vue";

const queryInfo = reactive<any>({
  pageNum: 1,
  pageSize: 10
})
const tagList = ref<any[]>([])
const total = ref<number>(0)
const dialogVisible = ref<boolean>(false)
const dialogForm = reactive<any>({
  id: '',
  name: '',
  color: ''
})
const formRef = ref<any>()
const formRules = {
  name: [{required: true, message: '请输入标签名称', trigger: 'blur'}],
  color: [{required: true, message: '请选择标签颜色', trigger: 'blur'}]
}
const colors = [
  {label: '红色', value: 'red'},
  {label: '橘黄', value: 'orange'},
  {label: '黄色', value: 'yellow'},
  {label: '橄榄绿', value: 'olive'},
  {label: '纯绿', value: 'green'},
  {label: '水鸭蓝', value: 'teal'},
  {label: '纯蓝', value: 'blue'},
  {label: '紫罗兰', value: 'violet'},
  {label: '紫色', value: 'purple'},
  {label: '粉红', value: 'pink'},
  {label: '棕色', value: 'brown'},
  {label: '灰色', value: 'grey'},
  {label: '黑色', value: 'black'},
]

onBeforeMount(() => {
  init()
})

const init = () => {
  getTagList()
}

const getTagList = () => {
  const data = getTagPageData(queryInfo)
  tagList.value = data.list
  total.value = data.total
}


const handleSizeChange = (newSize: number) => {
  queryInfo.pageSize = newSize
  getTagList()
}

const handleCurrentChange = (newPage: number) => {
  queryInfo.pageNum = newPage
  getTagList()
}

const handleDialogClosed = () => {
  dialogForm['id'] = ''
  dialogForm['name'] = ''
  dialogForm['color'] = ''
}

const HandleSaveTag = () => {
  if (!formRef.value) {
    return;
  }
  formRef.value.validate((valid: any) => {
    if (valid) {
      saveTag(dialogForm)
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
  dialogForm.color = row['color']
  dialogVisible.value = true
}

const handleDeleteTagById = (id: string) => {
  ElMessageBox.confirm(
      `此操作将永久删除该标签，是否删除?`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true
      }
  ).then(() => {
    deleteTagById(id)
    getTagList()
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
      <el-button type="primary" :icon="Plus" @click="dialogVisible = true">添加标签</el-button>
    </el-col>
  </el-row>

  <el-table class="m-table" :data="tagList">
    <el-table-column type="index" width="50"/>
    <el-table-column label="名称" prop="name"  show-overflow-tooltip/>
    <el-table-column label="颜色">
      <template #default="scope">
        <span style="float: left; width: 100px;">{{ scope.row.color }}</span>
        <span style="float: left; width: 100px; height: 23px" :class="`me-${scope.row.color}`"></span>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="200">
      <template #default="scope">
        <el-button type="primary" size="small" :icon="Edit" @click="handleEditClick(scope.row)">编辑</el-button>
        <el-button type="danger" size="small" :icon="Delete" @click="handleDeleteTagById(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

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
  <el-dialog title="添加标签" width="50%" v-model="dialogVisible" @close="handleDialogClosed">
    <!--内容主体-->
    <el-form size="large" :model="dialogForm" ref="formRef" :rules="formRules" label-width="80px">
      <el-form-item label="标签名称" prop="name">
        <el-input v-model="dialogForm.name"/>
      </el-form-item>
      <el-form-item size="large" label="标签颜色" prop="color">
        <el-select v-model="dialogForm.color" placeholder="请选择颜色" :clearable="true" style="width: 100%">
          <el-option v-for="item in colors" :key="item.value" :label="item.label" :value="item.value">
            <span style="float: left; width: 100px;">{{ item.label }}</span>
            <span style="float: left; width: 100px; height: inherit" :class="`me-${item.value}`"></span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <!--底部-->
    <template #footer>
      <span>
				<el-button size="large" @click="dialogVisible=false">取 消</el-button>
				<el-button size="large" type="primary" @click="HandleSaveTag">确 定</el-button>
			</span>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>