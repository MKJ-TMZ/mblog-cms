<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { useRoute } from "vue-router";

const route = useRoute()
const props = defineProps({
  parentTitle: {
    type: String,
    required: true
  }
})
</script>

<template>
  <el-breadcrumb :separator-icon="ArrowRight" style="margin-bottom: 15px;">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{ parentTitle }}</el-breadcrumb-item>
    <el-breadcrumb-item>{{ route.meta['title'] }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped>

</style>