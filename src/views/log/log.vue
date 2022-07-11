<script lang='ts'>
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    return {
      tableData: ref([
        { 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6" },
        { 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6" },
        { 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6" },
      ]),
    };
  },
});
</script>

<template>
  <div class="g-card">
    <div class="table-content">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="1" label="账号" />
        <el-table-column prop="2" label="名称" />
        <el-table-column prop="4" label="查询关键词" />
        <el-table-column prop="4" label="查询时间" />
        <el-table-column label="操作">
          <template #default>
            <el-button link type="primary">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style scoped lang='less'>
</style>
