<script lang='ts'>
import { defineComponent, reactive, ref } from "vue";
import addEditDrawerVue from "./components/addEditDrawer.vue";
export default defineComponent({
  components: { addEditDrawerVue },
  setup() {
    const searchForm = ref({
      type: "1",
      value: "",
    });

    const show = ref(false);

    return {
      tableData: ref([{ 1: "1", 2: "1", 3: "1", 4: "1", 5: "1", 6: "1" }]),
      searchForm,
      show,
      handleClose() {},
      showDrawer() {
        show.value = true;
      },
      closeDrawer() {
        show.value = false;
      },
    };
  },
});
</script>

<template>
  <div class="g-card">
    <div class="tree-list">
      <div class="search-content">
        <el-space>
          <el-select
            v-model="searchForm.type"
            placeholder="选择账号类型"
            style="width: 120px"
          >
            <el-option label="试用账号" value="1"></el-option>
            <el-option label="正式账号" value="2"></el-option>
          </el-select>
          <el-input v-model="searchForm.value" placeholder="输入账号名称">
            <template #prefix>
              <icon icon="bi:search" />
            </template>
          </el-input>
        </el-space>
        <div class="btn-content">
          <el-button type="primary" @click="showDrawer">新建</el-button>
        </div>
      </div>
      <div class="table-content">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="1" label="账号" />
          <el-table-column prop="2" label="名称" />
          <el-table-column prop="4" label="账号类型">
            <template #default>
              <div>
                <el-tag class="ml-2" type="success">试用账户</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="5" label="用户类型">
            <template #default>
              <div>
                <el-tag class="ml-2" type="success">机构用户</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="6" label="用户状态">
            <template #default>
              <div>
                <el-tag type="success">可用</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="6" label="试用时间" />
          <el-table-column label="操作">
            <template #default>
              <el-button link type="primary"> 编辑 </el-button>
              <el-button link type="primary">修改密码</el-button>
              <el-button link type="primary">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <addEditDrawerVue :show="show" @closeDrawer="closeDrawer" />
  </div>
</template>

<style scoped lang='less'>
.table-content {
  margin: 15px 0;
}
.btn-content {
  margin: 15px 0 30px;
}
</style>
