<script lang="ts" setup>

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
    <el-table class="m-table" :data="friendList">
      <el-table-column type="index" width="50"/>
      <el-table-column label="标题" prop="title" show-overflow-tooltip/>
      <el-table-column label="链接" prop="url" show-overflow-tooltip/>
      <el-table-column label="主题" prop="subject" show-overflow-tooltip/>
      <el-table-column label="内容" prop="value" show-overflow-tooltip/>
      <el-table-column label="颜色" prop="color" show-overflow-tooltip/>
      <el-table-column fixed="right" label="操作" width="200">
        <template #default="scope">
          <el-button type="primary" size="small" :icon="Edit" @click="handleEditClick(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" :icon="Delete" @click="handleDeleteFriendById(scope.row.id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<style scoped>

</style>