
<script lang='ts'>
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    return {
      searchVal: ref(""),
      tableData:ref([]),
      searchHandle() {},
    };
  },
});
</script>

<template>
  <div class="search-content">
    <n-form inline label-placement="left">
      <n-form-item label="关键词" path="account">
        <n-input
          style="width: 200px"
          clearable
          v-model:value="searchVal"
          placeholder="输入关键词检索"
        />
      </n-form-item>
      <n-form-item>
        <n-button type="info" @click="searchHandle">
          <icon icon="bytesize:search" size="14px" />
          搜索
        </n-button>
      </n-form-item>
    </n-form>
  </div>
  <div class="data-table">
    <el-table :data="tableData" stripe style="width: 100%" max-height="550">
      <el-table-column prop="1" label="系列名称" />
      <el-table-column prop="2" label="数据库名称"/>
      <el-table-column prop="3" label="类型" />
      <el-table-column prop="4" label="可用数据区间" />
      <el-table-column prop="5" label="使用截止时间"/>
    </el-table>
  </div>
</template>

<style scoped lang='less'>
</style>
