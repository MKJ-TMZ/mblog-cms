<script lang="ts" setup>
import { onBeforeMount, reactive, ref } from "vue";
import { Delete, Edit, Plus } from "@element-plus/icons-vue";
import { message, msgError, msgSuccess } from "@/utils/message";
import {
  deleteProfilesCustomById,
  getProfileCustomPageData,
  getProfileSettingData,
  saveProfilesCustom,
  saveProfileSetting
} from "@/api/siteSetting";
import { ElMessageBox } from "element-plus";

const queryInfo = reactive<any>({
  pageNum: 1,
  pageSize: 10,
  total: 0
})
const profileSetting = ref<any>({
  coverUrl: '',
  nickname: '',
  autograph: '',
  githubUrl: '',
  qqUrl: '',
  biliUrl: '',
  bangumiUrl: '',
  emailUrl: '',
})
const profileCustomList = ref<any[]>([])
const dialogTitle = ref<string>('')
const dialogVisible = ref<boolean>(false)
const dialogForm = reactive<any>({
  id: '',
  title: '',
  content: ''
})
const formRef = ref<any>()
const formRules = {
  title: [{required: true, message: '请输入标题', trigger: 'blur'}],
  content: [{required: true, message: '请输入内容', trigger: 'blur'}]
}

onBeforeMount(() => {
  init()
})

const init = () => {
  getProfileSetting()
  getProfileCustomPage()
}

const getProfileSetting = () => {
  getProfileSettingData().then((res: any) => {
    if (res.code == 200) {
      profileSetting.value = res.data
    }
  }).catch((error: any) => {
    msgError('获取详情失败')
    console.log(error.msg)
  })
}

const handleSubmit = () => {
  saveProfileSetting(profileSetting.value).then((res: any) => {
    if (res.code === 200) {
      msgSuccess('更新成功')
      getProfileSetting()
    }
  }).catch((error: any) => {
    msgError('更新失败')
  })
}

const getProfileCustomPage = () => {
  getProfileCustomPageData(queryInfo).then((res: any) => {
    if (res.code === 200) {
      const {data} = res
      profileCustomList.value = data.records
      queryInfo.total = data.total
    }
  }).catch((error: any) => {
    msgError('获取分页失败')
    console.log(error.msg)
  })
}

const handleSizeChange = (newSize: number) => {
  queryInfo.pageSize = newSize
  getProfileCustomPage()
}

const handleCurrentChange = (newPage: number) => {
  queryInfo.pageNum = newPage
  getProfileCustomPage()
}

const handleDialogClosed = () => {
  dialogTitle.value = ''
  dialogForm['id'] = ''
  dialogForm['title'] = ''
  dialogForm['content'] = ''
}

const handleEditClick = (row: any) => {
  dialogTitle.value = '编辑自定义介绍'
  dialogForm.id = row['id']
  dialogForm.title = row['title']
  dialogForm.content = row['content']
  dialogVisible.value = true
}

const HandleSaveProfileCustom = () => {
  if (!formRef.value) {
    return;
  }
  formRef.value.validate((valid: any) => {
    if (valid) {
      saveProfilesCustom(dialogForm).then((res: any) => {
        if (res.code == 200) {
          msgSuccess("提交成功")
          getProfileCustomPage()
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

const handleDeleteProfileCustomById = (id: string) => {
  ElMessageBox.confirm(
      `此操作将永久删除该自定义介绍，是否删除?`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true
      }
  ).then(() => {
    deleteProfilesCustomById(id).then((res: any) => {
      if (res.code === 200) {
        getProfileCustomPage()
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
      <span>个人档案</span>
    </template>
    <el-form size="large" label-position="right" label-width="100px">
      <el-row :gutter="20">
        <el-col :sm="{span: 12}" :xs="{span: 24}">
          <el-form-item label="封面url">
            <el-input v-model="profileSetting.coverUrl"/>
          </el-form-item>
        </el-col>
        <el-col :sm="{span: 12}" :xs="{span: 24}">
          <el-form-item label="昵称">
            <el-input v-model="profileSetting.nickname"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :sm="{span: 12}" :xs="{span: 24}">
          <el-form-item label="签名">
            <el-input v-model="profileSetting.autograph"/>
          </el-form-item>
        </el-col>
        <el-col :sm="{span: 12}" :xs="{span: 24}">
          <el-form-item label="GitHub">
            <el-input v-model="profileSetting.githubUrl"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :sm="{span: 12}" :xs="{span: 24}">
          <el-form-item label="QQ">
            <el-input v-model="profileSetting.qqUrl"/>
          </el-form-item>
        </el-col>
        <el-col :sm="{span: 12}" :xs="{span: 24}">
          <el-form-item label="bilibili">
            <el-input v-model="profileSetting.biliUrl"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :sm="{span: 12}" :xs="{span: 24}">
          <el-form-item label="网易云音乐">
            <el-input v-model="profileSetting.bangumiUrl"/>
          </el-form-item>
        </el-col>
        <el-col :sm="{span: 12}" :xs="{span: 24}">
          <el-form-item label="邮箱">
            <el-input v-model="profileSetting.emailUrl"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item style="margin-bottom: 0" class="form-buttons">
        <el-button type="primary" @click="handleSubmit">更新</el-button>
      </el-form-item>
    </el-form>
  </el-card>

  <el-card style="margin-top: 20px">
    <template #header>
      <span>自定义介绍</span>
    </template>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-button type="primary" :icon="Plus" @click="dialogVisible = true">新增</el-button>
      </el-col>
    </el-row>
    <el-table class="m-table" :data="profileCustomList">
      <el-table-column type="index" width="50"/>
      <el-table-column label="标题" prop="title" show-overflow-tooltip/>
      <el-table-column label="内容" prop="content" show-overflow-tooltip/>
      <el-table-column fixed="right" label="操作" width="200">
        <template #default="scope">
          <el-button type="primary" size="small" :icon="Edit" @click="handleEditClick(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" :icon="Delete" @click="handleDeleteProfileCustomById(scope.row.id)">删除
          </el-button>
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
        :total="queryInfo.total"
        layout="total, sizes, prev, pager, next, jumper"
        background
        small
    />
  </el-card>

  <!--对话框-->
  <el-dialog :title="dialogTitle ? dialogTitle : '添加自定义介绍'" width="50%" v-model="dialogVisible"
             @close="handleDialogClosed">
    <!--内容主体-->
    <el-form size="large" :model="dialogForm" ref="formRef" :rules="formRules" label-width="80px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="dialogForm.title"/>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input v-model="dialogForm.content"/>
      </el-form-item>
    </el-form>
    <!--底部-->
    <template #footer>
      <span>
				<el-button size="large" @click="dialogVisible=false">取 消</el-button>
				<el-button size="large" type="primary" @click="HandleSaveProfileCustom">确 定</el-button>
			</span>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>