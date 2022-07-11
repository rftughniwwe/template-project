<script lang='ts'>
import { defineComponent, ref } from "vue";
const sourceData = [
  {
    value: "1",
    label: "Level one 1",
    children: [
      {
        value: "1-1",
        label: "Level two 1-1",
        children: [
          {
            value: "1-1-1",
            label: "Level three 1-1-1",
          },
        ],
      },
    ],
  },
  {
    value: "2",
    label: "Level one 2",
    children: [
      {
        value: "2-1",
        label: "Level two 2-1",
        children: [
          {
            value: "2-1-1",
            label: "Level three 2-1-1",
          },
        ],
      },
      {
        value: "2-2",
        label: "Level two 2-2",
        children: [
          {
            value: "2-2-1",
            label: "Level three 2-2-1",
          },
        ],
      },
    ],
  },
  {
    value: "3",
    label: "Level one 3",
    children: [
      {
        value: "3-1",
        label: "Level two 3-1",
        children: [
          {
            value: "3-1-1",
            label: "Level three 3-1-1",
          },
        ],
      },
      {
        value: "3-2",
        label: "Level two 3-2",
        children: [
          {
            value: "3-2-1",
            label: "Level three 3-2-1",
          },
        ],
      },
    ],
  },
];
export default defineComponent({
  setup() {
    return {
      source: ref("1-1-1"),
      data: sourceData,
      tableData: ref([]),
    };
  },
});
</script>

<template>
  <div class="g-card">
    <div class="tree-list">
      <span style="margin-right: 10px">数据源</span>
      <el-tree-select
        style="width: 250px"
        v-model="source"
        :data="data"
        filterable
      />
      <div class="table-content">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="1" label="公司ID" />
          <el-table-column prop="2" label="证券ID" />
          <el-table-column prop="4" label="证券代码" />
          <el-table-column prop="5" label="未缴款供股权代码" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<style scoped lang='less'>
.table-content{
  margin: 15px 0;
}
</style>
