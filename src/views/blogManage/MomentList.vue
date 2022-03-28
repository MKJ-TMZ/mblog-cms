<script lang="ts" setup>
import Breadcrumb from "@/components/Breadcrumb.vue";
import { onBeforeMount, reactive, ref } from "vue";
import { deleteMomentById, getMomentPageData, updateMomentPublished } from "@/api/moment";
import { message, msgError, msgSuccess } from "@/utils/message";
import { useRouter } from "vue-router";
import { ElMessageBox } from "element-plus";
import * as moment from 'moment'
import { Edit, Delete } from "@element-plus/icons-vue";

const router = useRouter()

const queryInfo = reactive<any>({
  current: 1,
  size: 10
})
const momentList = ref<any[]>([])
const total = ref<number>(0)

onBeforeMount(() => {
  init()
})

const init = () => {
  getMomentList()
}

const getMomentList = () => {
  getMomentPageData(queryInfo).then((res: any) => {
    if (res.code === 200) {
      const { data } = res
      momentList.value = data.records;
      total.value = data.total
    }
  }).catch((error: any) => {
    msgError('获取分页信息失败')
    console.log(error.msg)
  })
}

const handleSizeChange = (newSize: number) => {
  queryInfo.size = newSize
  getMomentList()
}

const handleCurrentChange = (newPage: number) => {
  queryInfo.current = newPage
  getMomentList()
}

const handleMomentPublishedSwitch = (row: any) => {
  const { id, isPublished } = row
  updateMomentPublished({ id, isPublished }).then((res: any) => {
    if (res.code === 200) {
      isPublished ? msgSuccess('发布成功') : msgSuccess('取消发布成功')
    }
  }).catch((error: any) => {
    msgError('更新失败')
    console.log(error.msg)
  })
}

const toMomentEditPage = (id: string) => {
  router.push(`/blogManage/moment/edit/${id}`)
}

const handleDeleteMomentById = (id: string) => {
  ElMessageBox.confirm(
      `此操作将永久删除该动态，是否删除?<br>建议将动态置为<strong style="color: red">未发布</strong>状态！`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true
      }
  ).then(() => {
    deleteMomentById(id).then((res: any) => {
      if (res.code === 200) {
        getMomentList()
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
  <!--面包屑导航-->
  <Breadcrumb parentTitle="博客管理"/>

  <el-table class="m-table" :data="momentList">
    <el-table-column type="index" width="50"/>
    <el-table-column label="内容" prop="content" show-overflow-tooltip/>
    <el-table-column label="发布状态" width="80">
      <template #default="scope">
        <el-switch v-model="scope.row.isPublished" @change="handleMomentPublishedSwitch(scope.row)"/>
      </template>
    </el-table-column>
    <el-table-column label="点赞数" prop="likeCount" width="80"/>
    <el-table-column label="创建时间" width="170">
      <template #default="scope">{{ moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss') }}</template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="200">
      <template #default="scope">
        <el-button type="primary" size="small" :icon="Edit" @click="toMomentEditPage(scope.row.id)">编辑</el-button>
        <el-button type="danger" size="small" :icon="Delete" @click="handleDeleteMomentById(scope.row.id)">删除
        </el-button>
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
</template>

<style scoped>

</style>