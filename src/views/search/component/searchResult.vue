<script lang='ts'>
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const tableData = ref([
      {
        date: 1,
        name: "1",
        phone: "1",
        gender: "1",
        age: "1",
        height: "123",
        weight: "123",
        xxx: "1",
        zzz: "222",
      },
      {
        date: 1,
        name: "1",
        phone: "1",
        gender: "1",
        age: "1",
        height: "123",
        weight: "123",
        xxx: "1",
        zzz: "222",
      },
      {
        date: 1,
        name: "1",
        phone: "1",
        gender: "1",
        age: "1",
        height: "123",
        weight: "123",
        xxx: "1",
        zzz: "222",
      },
    ]);
    return {
      tableData,
    };
  },
});
</script>

<template>
  <div style="padding: 20px 0">
    <el-row :gutter="35" justify="space-between">
      <el-col :xs="24" :sm="16" :md="18" :lg="20" :xl="20">
        <div class="table-content">
          <el-table
            :data="tableData"
            stripe
            border
            style="width: 100%"
            max-height="550"
          >
            <el-table-column prop="date" label="Date" width="150" />
            <el-table-column prop="name" label="Name" width="150" />
            <el-table-column prop="address" label="qqq" width="150" />
            <el-table-column prop="phone" label="ggg" width="150" />
            <el-table-column prop="gender" label="nnn" width="150" />
            <el-table-column prop="age" label="bbb" width="150" />
            <el-table-column prop="height" label="vvv" width="150" />
            <el-table-column prop="weight" label="ccc" width="150" />
            <el-table-column prop="xxx" label="xxx" width="150" />
            <el-table-column prop="zzz" label="zzz" width="150" />
          </el-table>
        </div>
      </el-col>
      <el-col :xs="0" :sm="8" :md="6" :lg="4" :xl="4">
        <div class="filter-content">
          <div class="f-c-item">
            <div class="f-c-i-topic">按系列筛选</div>
            <div class="f-c-i-checkbox">
              <n-checkbox-group>
                <n-grid :y-gap="4" :cols="1">
                  <n-gi>
                    <n-checkbox value="Pushes Open" label="人生" />
                  </n-gi>
                  <n-gi>
                    <n-checkbox value="The Window" label="就是" />
                  </n-gi>
                  <n-gi>
                    <n-checkbox value="And Raises" label="如此的" />
                  </n-gi>
                  <n-gi>
                    <n-checkbox value="The Spyglass" label="看不到" />
                  </n-gi>
                  <n-gi>
                    <n-checkbox value="GIao" label="希望" />
                  </n-gi>
                </n-grid>
              </n-checkbox-group>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang='less'>
.table-content {
}
.filter-content {
}
.f-c-item {
  padding: 0 20px;
}
.f-c-i-topic {
  font-size: 18px;
  font-weight: 500;
  color: #000;
  padding: 0 0 5px;
}
.f-c-i-checkbox{
}
</style>
