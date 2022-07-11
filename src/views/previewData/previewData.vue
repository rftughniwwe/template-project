<script lang='ts'>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const router = useRouter();
    return {
      loading: ref(false),
      tableData: ref([]),
      handleBack(num: number) {
        if (num === 0) {
          router.push({ path: "/home" });
        } else if (num === 1) {
          router.go(-1);
        }
      },
    };
  },
});
</script>

<template>
  <div class="g-layout-container g-second-page">
    <n-spin :show="loading">
      <div class="margin-top">
        <n-page-header
          title="精准扶贫"
          subtitle="热门数据库"
          @back="handleBack(1)"
        >
          <template #header>
            <n-breadcrumb>
              <n-breadcrumb-item @click="handleBack(0)">首页</n-breadcrumb-item>
              <n-breadcrumb-item @click="handleBack(1)"
                >单表查询</n-breadcrumb-item
              >
              <n-breadcrumb-item @click="handleBack(1)">
                热门数据库
              </n-breadcrumb-item>
              <n-breadcrumb-item>预览</n-breadcrumb-item>
            </n-breadcrumb>
          </template>
        </n-page-header>
        <div class="table-content">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="Date" width="200" />
            <el-table-column prop="name" label="Name" width="200" />
            <el-table-column prop="address" label="Address" width="200" />
            <el-table-column prop="1" label="asd" width="200" />
            <el-table-column prop="2" label="zxc" width="200" />
            <el-table-column prop="3" label="qwe" width="200" />
            <el-table-column prop="4" label="qzx" width="200" />
            <el-table-column prop="6" label="dfgt" width="200" />
            <el-table-column prop="7" label="xsw" width="200" />
            <el-table-column prop="8" label="stfrystry" width="200" />
          </el-table>
        </div>
        <pagination :total="0" />
      </div>
    </n-spin>
  </div>
</template>

<style scoped lang='less'>
.table-content {
  margin: 20px 0;
}
</style>
