<script lang="ts" setup>
import { Delete, Edit, Plus } from "@element-plus/icons-vue";
import { onBeforeMount, reactive, ref } from "vue";
import { message, msgError, msgSuccess } from "@/utils/message";
import {
  deleteFooterSettingById,
  getFooterSettingPageData,
  saveFooterSetting
} from "@/api/siteSetting";
import { ElMessageBox } from "element-plus";

const queryInfo = reactive<any>({
  pageNum: 1,
  pageSize: 10,
  total: 0
})
const footerList = ref<any[]>([])
const dialogTitle = ref<string>('')
const dialogVisible = ref<boolean>(false)
const dialogForm = reactive<any>({
  id: '',
  title: '',
  url: '',
  subject: '',
  content: '',
  color: ''
})
const formRef = ref<any>()
const formRules = {
  title: [{required: true, message: '请输入标题名称', trigger: 'blur'}],
  url: [{required: true, message: '请输入链接', trigger: 'blur'}],
  subject: [{required: true, message: '请输入主题', trigger: 'blur'}],
  content: [{required: true, message: '请输入内容', trigger: 'blur'}],
  color: [{required: true, message: '请选择标签颜色', trigger: 'blur'}]
}

onBeforeMount(() => {
  init()
})

const init = () => {
  getFooterSettingPage()
}

const getFooterSettingPage = () => {
  getFooterSettingPageData(queryInfo).then((res: any) => {
    if (res.code === 200) {
      const { data } = res
      footerList.value = data.records
      queryInfo.total = data.total
    }
  }).catch((error: any) => {
    msgError('获取分页信息失败')
    console.log(error.msg)
  })
}

const handleSizeChange = (newSize: number) => {
  queryInfo.pageSize = newSize
  getFooterSettingPage()
}

const handleCurrentChange = (newPage: number) => {
  queryInfo.pageNum = newPage
  getFooterSettingPage()
}

const handleDialogClosed = () => {
  dialogTitle.value = ''
  dialogForm['id'] = ''
  dialogForm['title'] = ''
  dialogForm['url'] = ''
  dialogForm['subject'] = ''
  dialogForm['content'] = ''
  dialogForm['color'] = ''
}

const handleEditClick = (row: any) => {
  dialogTitle.value = '编辑页脚徽标'
  dialogForm.id = row['id']
  dialogForm.title = row['title']
  dialogForm.url = row['url']
  dialogForm.subject = row['subject']
  dialogForm.content = row['content']
  dialogForm.color = row['color']
  dialogVisible.value = true
}

const HandleSaveFooterSetting = () => {
  if (!formRef.value) {
    return;
  }
  formRef.value.validate((valid: any) => {
    if (valid) {
      saveFooterSetting(dialogForm).then((res: any) => {
        if (res.code == 200) {
          msgSuccess("提交成功")
          getFooterSettingPage()
          dialogVisible.value = false
        }
      }).catch((error: any) => {
        msgError('提交失败')
        console.log(error.msg)
      })
    } else {
      msgError('请填写必要的表单项')
      return;
    }
  })
}

const handleDeleteFooterSettingById = (id: string) => {
  ElMessageBox.confirm(
      `此操作将永久删除该徽标，是否删除?`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true
      }
  ).then(() => {
    deleteFooterSettingById(id).then((res: any) => {
      if (res.code === 200) {
        getFooterSettingPage()
        msgSuccess('刪除成功')
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
  <el-card>
    <template #header>
      <span>页脚徽标</span>
    </template>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-button type="primary" :icon="Plus" @click="dialogVisible = true">新增</el-button>
      </el-col>
    </el-row>
    <el-table class="m-table" :data="footerList">
      <el-table-column type="index" width="50"/>
      <el-table-column label="标题" prop="title" show-overflow-tooltip/>
      <el-table-column label="链接" prop="url" show-overflow-tooltip/>
      <el-table-column label="主题" prop="subject" show-overflow-tooltip/>
      <el-table-column label="内容" prop="content" show-overflow-tooltip/>
      <el-table-column label="颜色" prop="color" show-overflow-tooltip/>
      <el-table-column fixed="right" label="操作" width="200">
        <template #default="scope">
          <el-button type="primary" size="small" :icon="Edit" @click="handleEditClick(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" :icon="Delete" @click="handleDeleteFooterSettingById(scope.row.id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="queryInfo.pageSize"
        :total="queryInfo.total"
        layout="total, sizes, prev, pager, next, jumper"
        background
        small
    />

    <!--对话框-->
    <el-dialog :title="dialogTitle ? dialogTitle : '添加页脚徽标'" width="50%" v-model="dialogVisible" @close="handleDialogClosed">
      <!--内容主体-->
      <el-form size="large" :model="dialogForm" ref="formRef" :rules="formRules" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="dialogForm.title"/>
        </el-form-item>
        <el-form-item label="链接" prop="url">
          <el-input v-model="dialogForm.url"/>
        </el-form-item>
        <el-form-item label="主题" prop="subject">
          <el-input v-model="dialogForm.subject"/>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="dialogForm.content"/>
        </el-form-item>
        <el-form-item label="颜色" prop="color">
          <el-input v-model="dialogForm.color"/>
        </el-form-item>
      </el-form>
      <!--底部-->
      <template #footer>
      <span>
				<el-button size="large" @click="dialogVisible=false">取 消</el-button>
				<el-button size="large" type="primary" @click="HandleSaveFooterSetting">确 定</el-button>
			</span>
      </template>
    </el-dialog>
  </el-card>
</template>

<style scoped>

</style>