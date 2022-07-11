<script lang='ts'>
import { defineComponent, ref, reactive, watch } from "vue";
import type { FormInstance, FormRules } from "element-plus";
const shortcuts = [
  {
    text: "近一周",
    value: () => {
      const end = new Date();
      const start = new Date();
      end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
      return [start, end];
    },
  },
  {
    text: "一个月",
    value: () => {
      const end = new Date();
      const start = new Date();
      end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
      return [start, end];
    },
  },
  {
    text: "三个月",
    value: () => {
      const end = new Date();
      const start = new Date();
      end.setTime(start.getTime() + 3600 * 1000 * 24 * 90);
      return [start, end];
    },
  },
  {
    text: "一年",
    value: () => {
      const end = new Date();
      const start = new Date();
      end.setTime(start.getTime() + 3600 * 1000 * 24 * 365);
      return [start, end];
    },
  },
];
const treeData = [
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
  name: "add-edit-drawer",
  props: {
    show: {
      type: Boolean,
    },
  },
  setup(props, context) {
    const drawer = ref(props.show);

    watch(
      () => props.show,
      (nval) => {
        drawer.value = nval;
      }
    );

    const drawerTitle = ref("新增");
    const userForm = reactive({
      accountType: "",
      userType: "",
      account: "",
      userName: "",
      useTime: "",
      dataPermission: "",
      dataUseTime: 1,
      tableUseNumber: 100,
    });
    const rules = reactive<FormRules>({
      accountType: [
        {
          required: true,
          message: "请选择账号类型",
          trigger: "blur",
        },
      ],
      userType: [
        {
          required: true,
          message: "请选择用户类型",
          trigger: "blur",
        },
      ],
      account: [
        {
          required: true,
          message: "请输入账号",
          trigger: "blur",
        },
      ],
      userName: [
        {
          required: true,
          message: "请输入用户名",
          trigger: "blur",
        },
      ],
      useTime: [
        {
          required: true,
          message: "请选择时长",
          trigger: "blur",
        },
      ],
      dataPermission: [
        {
          required: true,
          message: "请选择数据权限",
          trigger: "blur",
        },
      ],
      dataUseTime: [
        {
          required: true,
          message: "请选择时长",
          trigger: "blur",
        },
      ],
      tableUseNumber: [
        {
          required: true,
          message: "请选择各表试用条数",
          trigger: "blur",
        },
      ],
    });

    return {
      drawer,
      drawerTitle,
      userForm,
      rules,
      shortcuts,
      treeData,
      startIp: ref(""),
      endIp: ref(""),
      ipData: ref([
        { 1: "1", 2: "192.168.230.100 - 192.168.230.999" },
        { 1: "2", 2: "192.168.230.100 - 192.168.230.1999" },
      ]),
      close(){
        context.emit('closeDrawer')
      },
    };
  },
});
</script>

<template>
  <!-- 新增/编辑 用户 -->
  <el-drawer
    v-model="drawer"
    :title="drawerTitle"
    class="e-drawer-content"
    :size="500"
    @close="close"
  >
    <div class="form-content">
      <el-form
        ref="ruleFormRef"
        :model="userForm"
        :rules="rules"
        :label-width="120"
        status-icon
      >
        <el-form-item label="账号类型" prop="accountType">
          <el-select
            class="add-edit-select"
            v-model="userForm.accountType"
            placeholder="选择账号类型"
          >
            <el-option label="正式账号" value="1"> </el-option>
            <el-option label="试用账号" value="2"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户类型" prop="userType">
          <el-select
            v-model="userForm.userType"
            class="add-edit-select"
            placeholder="选择用户类型"
          >
            <el-option label="机构用户" value="1"> </el-option>
            <el-option label="个人用户" value="2"> </el-option>
          </el-select>
        </el-form-item>

        <div class="form-topic">设置使用权限</div>
        <el-form-item label="账号" prop="account">
          <el-input v-model="userForm.account" placeholder="输入账号">
          </el-input>
        </el-form-item>
        <el-form-item
          :label="userForm.accountType === '1' ? '学校名称' : '用户名称'"
          prop="userName"
        >
          <el-input v-model="userForm.userName" placeholder="输入用户名">
          </el-input>
        </el-form-item>
        <el-form-item label="账户可用时长" prop="useTime">
          <!-- <el-input v-model="userForm.useTime"> </el-input> -->
          <el-date-picker
            v-model="userForm.useTime"
            type="daterange"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :shortcuts="shortcuts"
          />
        </el-form-item>
        <el-form-item label="数据库权限" prop="dataPermission">
          <!-- <el-input v-model="userForm.dataPermission"> </el-input> -->
          <el-tree-select
            v-model="userForm.dataPermission"
            :data="treeData"
            multiple
            style="width: 100%"
            :render-after-expand="false"
            show-checkbox
          />
        </el-form-item>
        <el-form-item label="对应数据库可用时长" prop="dataUseTime">
          <el-space>
            <el-input-number
              v-model="userForm.dataUseTime"
              :min="1"
              :max="10"
            />
            (年)
          </el-space>
        </el-form-item>
        <template v-if="userForm.accountType === '2'">
          <el-form-item label="各表可下载条数" prop="tableUseNumber">
            <el-space>
              <el-input-number
                v-model="userForm.tableUseNumber"
                :min="1"
                :max="9999"
              />
              (条)
            </el-space>
          </el-form-item>
        </template>
        <template v-if="userForm.userType === '1'">
          <div class="form-topic">添加IP白名单</div>
          <div class="ip-add">
            <el-space>
              <el-input v-model="startIp" placeholder="输入ip段"></el-input>
              <span>至</span>
              <el-input v-model="endIp" placeholder="输入ip段"></el-input>
              <el-button>添加</el-button>
            </el-space>
          </div>
          <div class="ip-table">
            <el-table :data="ipData" style="width: 100%">
              <el-table-column align="left" width="70" prop="1" label="序号" />
              <el-table-column
                align="center"
                width="300"
                prop="2"
                label="ip段"
              />
              <el-table-column align="center" width="70" label="操作">
                <template #default>
                  <div class="ip-remove">
                    <icon icon="ep:delete" size="16px" />
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
      </el-form>
    </div>
    <div class="add-edit-btn-content">
      <el-button type="primary" size="large">确定</el-button>
    </div>
  </el-drawer>
</template>

<style scoped lang='less'>
.table-content {
  margin: 15px 0;
}
.btn-content {
  margin: 15px 0 30px;
}
.e-drawer-content {
  position: relative;
}
.add-edit-btn-content {
  box-shadow: 0 -5px 6px 0 rgba(0, 0, 0, 0.1);
  padding: 15px 20px;
  bottom: 0;
  background: #fff;
  position: sticky;
  position: -webkit-sticky;
  z-index: 99;
  text-align: right;
}
.form-topic {
  margin: 25px 0 15px;
  font-size: 18px;
  font-weight: 500;
  color: #000;
}
.add-edit-select {
  width: 100%;
}
.form-content {
  height: 100%;
  padding: 20px;
}
.ip-remove {
  text-align: left;
  padding: 7px;
  cursor: pointer;
}
.ip-table {
  margin: 10px 0;
}
</style>
<style lang="less">
.el-drawer__body {
  padding: 0;
}
.el-form-item__label {
  line-height: 18px;
}
</style>