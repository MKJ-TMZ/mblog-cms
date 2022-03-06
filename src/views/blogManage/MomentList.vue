<script lang="ts" setup>
import Breadcrumb from "@/components/Breadcrumb.vue";
import { onBeforeMount, reactive, ref } from "vue";
import { deleteMomentById, getMomentListData, updateMomentPublished } from "@/api/moment";
import { message, msgSuccess } from "@/utils/message";
import { useRouter } from "vue-router";
import { ElMessageBox } from "element-plus";
import * as moment from 'moment'
import { Edit, Delete } from "@element-plus/icons-vue";

const router = useRouter()

const queryInfo = reactive<any>({
  pageNum: 1,
  pageSize: 10
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
  const data = getMomentListData(queryInfo);
  momentList.value = data.momentList;
  total.value = data.total
}

const handleSizeChange = (newSize: number) => {
  queryInfo.pageSize = newSize
  getMomentList()
}

const handleCurrentChange = (newPage: number) => {
  queryInfo.pageNum = newPage
  getMomentList()
}

const handleMomentPublishedSwitch = (row: any) => {
  updateMomentPublished(row.id, row.published)
  row.published ? msgSuccess('发布成功') : msgSuccess('取消发布成功')
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
    deleteMomentById(id)
    getMomentList()
    msgSuccess('刪除成功')
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
        <el-switch v-model="scope.row.published" @change="handleMomentPublishedSwitch(scope.row)"/>
      </template>
    </el-table-column>
    <el-table-column label="点赞数" prop="likes" width="80"/>
    <el-table-column label="创建时间" width="170">
      <template #default="scope">{{ moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss') }}</template>
    </el-table-column>
    <el-table-column label="操作" width="200">
      <template #default="scope">
        <el-button type="primary" size="small" :icon="Edit" @click="toMomentEditPage(scope.row.id)">编辑</el-button>
        <el-button type="danger" size="small" :icon="Delete" @click="handleDeleteMomentById(scope.row.id)">删除</el-button>
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
</template>

<style scoped>
.m-table {
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>