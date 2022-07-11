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
    <div class="btn-content">
      <el-button type="primary">导出</el-button>
    </div>
    <div class="table-content">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="1" label="序号" />
        <el-table-column prop="2" label="用户姓名" />
        <el-table-column prop="4" label="所属学校"/>
        <el-table-column prop="4" label="所在学院"/>
        <el-table-column prop="4" label="申请数据库"/>
        <el-table-column prop="5" label="邮箱" />
        <el-table-column prop="6" label="联系电话"/>
      </el-table>
    </div>
  </div>
</template>

<style scoped lang='less'>
.btn-content {
  margin: 20px 0;
}
</style>
