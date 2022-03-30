<script lang="ts" setup>
import { onBeforeMount, reactive, ref } from "vue";
import {
  deleteFriendById,
  getFriendInfoData,
  getFriendPageData,
  saveFriend,
  saveFriendSave,
  updatePublished
} from "@/api/friend";
import { ElMessageBox } from "element-plus";
import { message, msgError, msgSuccess } from "@/utils/message";
import Breadcrumb from "@/components/Breadcrumb.vue";
import { Delete, Edit, Plus } from "@element-plus/icons-vue";
import * as moment from 'moment'

const infoForm = reactive<any>({
  id: '',
  content: '',
  isCommentEnabled: false,
})
const queryInfo = reactive<any>({
  current: 1,
  size: 10
})
const friendList = ref<any[]>([])
const total = ref<number>(0)
const dialogTitle = ref<string>('')
const dialogVisible = ref<boolean>(false)
const dialogForm = reactive<any>({
  id: '',
  nickname: '',
  description: '',
  website: '',
  avatar: '',
  isPublished: true
})
const formRef = ref<any>()
const formRules = {
  nickname: [{required: true, message: '请输入昵称', trigger: 'blur'}],
  description: [{required: true, message: '请输入描述', trigger: 'blur'}],
  website: [{required: true, message: '请输入网站', trigger: 'blur'}],
  avatar: [{required: true, message: '请输入头像URL', trigger: 'blur'}],
}

onBeforeMount(() => {
  init()
})

const init = () => {
  getFriendList()
  getFriendInfo()
}

const getFriendList = () => {
  getFriendPageData().then((res: any) => {
    if (res.code === 200) {
      const { data } = res
      friendList.value = data.records
      total.value = data.total
    }
  }).catch((error: any) => {
    msgError('获取分页信息失败')
    console.log(error.msg)
  })
}

const getFriendInfo = () => {
  getFriendInfoData().then((res: any) => {
    if (res.code === 200) {
      const { data } = res
      infoForm.id = data.id || ''
      infoForm.content = data.content || ''
      infoForm.isCommentEnabled = data.isCommentEnabled || false
    }
  })
}

const handleSaveFriendContent = () => {
  const param = {
    id: infoForm.id,
    content: infoForm.content
  }
  saveFriendSave(param).then((res: any) => {
    if (res.code === 200) {
      getFriendInfo()
      msgSuccess('保存成功')
    }
  }).catch((error: any) => {
    msgError('保存失败')
    console.log(error.msg)
  })
}

const handleFriendCommentSwitch = () => {
  const param = {
    id: infoForm.id,
    isCommentEnabled: infoForm.isCommentEnabled
  }
  saveFriendSave(param).then((res: any) => {
    if (res.code === 200) {
      infoForm.isCommentEnabled ? msgSuccess('开启评论成功') : msgSuccess('关闭评论成功')
    }
  }).catch((error: any) => {
    msgError('保存失败')
    console.log(error.msg)
  })
}

const handleSizeChange = (newSize: number) => {
  queryInfo.size = newSize
  getFriendList()
}

const handleCurrentChange = (newPage: number) => {
  queryInfo.current = newPage
  getFriendList()
}

const handleFriendPublishedSwitch = (row: any) => {
  const { id, isPublished } = row
  const param = {
    id,
    isPublished
  }
  saveFriend(param).then((res: any) => {
    if (res.code === 200) {
      isPublished ? msgSuccess('公开成功') : msgSuccess('取消公开成功')
    }
  }).catch((error: any) => {
    msgError('更新失败')
    console.log(error.msg)
  })
}

const handleDeleteFriendById = (id : string) => {
  ElMessageBox.confirm(
      `此操作将永久删除该友链，是否删除?`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true
      }
  ).then(() => {
    deleteFriendById(id).then((res: any) => {
      if (res.code === 200) {
        getFriendList()
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

const handleEditClick = (row: any) => {
  dialogTitle.value = '编辑分类'
  dialogForm.id = row['id']
  dialogForm.nickname = row['nickname']
  dialogForm.description = row['description']
  dialogForm.website = row['website']
  dialogForm.avatar = row['avatar']
  dialogVisible.value = true
}

const handleDialogClosed = () => {
  dialogTitle.value = ''
  dialogForm.id = ''
  dialogForm.nickname = ''
  dialogForm.description = ''
  dialogForm.website = ''
  dialogForm.avatar = ''
}

const HandleSaveFriend = () => {
  if (!formRef.value) {
    return;
  }
  formRef.value.validate((valid: any) => {
    if (valid) {
      saveFriend(dialogForm).then((res: any) => {
        if (res.code === 200) {
          msgSuccess('保存成功')
          getFriendList()
          dialogVisible.value = false
        }
      }).catch((error: any) => {
        msgError('保存失败')
        console.log(error.msg)
      })
    } else {
      msgError('请填写必要的表单项')
      return;
    }
  })
}
</script>

<template>
  <!--面包屑导航-->
  <Breadcrumb parentTitle="页面管理"/>

  <!--添加按钮-->
  <el-row :gutter="10">
    <el-col :span="6">
      <el-button type="primary" :icon="Plus" @click="dialogVisible = true">添加友链</el-button>
      <el-switch style="margin-left: 30px" v-model="infoForm.isCommentEnabled" active-text="页面评论" @change="handleFriendCommentSwitch"/>
    </el-col>
  </el-row>

  <el-table class="m-table" :data="friendList">
    <el-table-column type="index" width="50"/>
    <el-table-column label="头像" width="100">
      <template #default="scope">
        <el-avatar shape="square" :size="60" fit="contain" :src="scope.row.avatar"/>
      </template>
    </el-table-column>
    <el-table-column label="昵称" prop="nickname"  show-overflow-tooltip/>
    <el-table-column label="描述" prop="description"  show-overflow-tooltip/>
    <el-table-column label="站点" show-overflow-tooltip>
      <template #default="scope">
        <el-link type="primary" :href="scope.row.website" target="_blank">{{ scope.row.website }}</el-link>
      </template>
    </el-table-column>
    <el-table-column label="是否公开" width="100">
      <template #default="scope">
        <el-switch v-model="scope.row.isPublished" @change="handleFriendPublishedSwitch(scope.row)"/>
      </template>
    </el-table-column>
    <el-table-column label="创建时间" width="170">
      <template #default="scope">{{ moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss') }}</template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="200">
      <template #default="scope">
        <el-button type="primary" size="small" :icon="Edit" @click="handleEditClick(scope.row)">编辑</el-button>
        <el-button type="danger" size="small" :icon="Delete" @click="handleDeleteFriendById(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

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

  <!--友链页面信息-->
  <el-form size="large" style="margin-top: 20px" label-position="top">
    <el-form-item label="友链页面信息">
      <mavon-editor class="m-width-full" v-model="infoForm.content"/>
    </el-form-item>
    <el-form-item class="form-buttons">
      <el-button type="primary" @click="handleSaveFriendContent">保存</el-button>
    </el-form-item>
  </el-form>

  <!--对话框-->
  <el-dialog :title="dialogTitle ? dialogTitle : '添加友链'" width="40%" v-model="dialogVisible" @close="handleDialogClosed">
    <!--内容主体-->
    <el-form size="large" :model="dialogForm" ref="formRef" :rules="formRules" label-width="80px">
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="dialogForm.nickname"/>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="dialogForm.description"/>
      </el-form-item>
      <el-form-item label="网站" prop="website">
        <el-input v-model="dialogForm.website"/>
      </el-form-item>
      <el-form-item label="头像URL" prop="avatar">
        <el-input v-model="dialogForm.avatar"/>
      </el-form-item>
    </el-form>
    <!--底部-->
    <template #footer>
      <span>
				<el-button size="large" @click="dialogVisible=false">取 消</el-button>
				<el-button size="large" type="primary" @click="HandleSaveFriend">确 定</el-button>
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