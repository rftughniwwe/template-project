<script lang='ts'>
import { defineComponent, ref } from "vue";
import { FormInst, FormItemRule, useNotification } from "naive-ui";
import { Message } from "@/utils/tool.js";
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
  setup() {
    const formRef = ref<FormInst | null>();
    const notifi = useNotification();
    const model = ref({
      name: null,
      school: null,
      college: null,
      phone: null,
      email: null,
      database: null,
    });
    return {
      formRef,
      model,
      treeData,
      rules: {
        name: {
          required: true,
          trigger: ["blur", "input"],
          message: "请输入姓名",
        },
        school: {
          required: true,
          trigger: ["blur", "input"],
          message: "请输入所属学校",
        },
        college: {
          required: true,
          trigger: ["blur", "input"],
          message: "请输入所属学院",
        },
        phone: {
          required: true,
          trigger: ["blur", "input"],
          validator(rule: FormItemRule, value: string) {
            if (!value) {
              return new Error("请输入联系电话");
            } else if (!/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(value)) {
              return new Error("请输入正确的电话");
            }
            return true;
          },
        },
        email: {
          required: true,
          trigger: ["blur", "input"],
          validator(rule: FormItemRule, value: string) {
            if (!value) {
              return new Error("请输入收件邮箱");
            } else if (
              !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                value
              )
            ) {
              return new Error("请输入正确的邮箱");
            }
            return true;
          },
        },
        database: {
          required: true,
          trigger: ["blur", "input"],
          message: "请选择数据库",
        },
      },
      handleValidateButtonClick(e: MouseEvent) {
        e.preventDefault();
        formRef.value?.validate((errors) => {
          if (!errors) {
            notifi.success({
              content: "注册申请已提交",
              meta: "审核结果将发送到您邮箱中,请注意查收!",
              duration: 3000,
            });
            model.value = {
              name: null,
              school: null,
              college: null,
              phone: null,
              email: null,
              database: null,
            };
          } else {
            Message("warning", "失败");
          }
        });
      },
    };
  },
});
</script>

<template>
  <div class="reg-form">
    <n-form
      ref="formRef"
      :model="model"
      :rules="rules"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
    >
      <n-form-item label="姓名" path="name">
        <n-input v-model:value="model.name" placeholder="请输入姓名" />
      </n-form-item>
      <n-form-item label="所属学校" path="school">
        <n-input v-model:value="model.school" placeholder="请输入所属学校" />
      </n-form-item>
      <n-form-item label="所属学院" path="college">
        <n-input v-model:value="model.college" placeholder="请输入所属学院" />
      </n-form-item>
      <n-form-item label="联系电话" path="phone">
        <n-input v-model:value="model.phone" placeholder="请输入联系电话" />
      </n-form-item>
      <n-form-item label="收件邮箱" path="email">
        <n-input v-model:value="model.email" placeholder="请输入收件邮箱" />
      </n-form-item>
      <n-form-item label="申请数据库" path="database">
        <!-- <n-input v-model:value="model.database" placeholder="请选择数据库" /> -->
        <el-tree-select
            v-model="model.database"
            :data="treeData"
            multiple
            style="width: 100%"
            :render-after-expand="false"
            show-checkbox
          />
      </n-form-item>
      <div class="btn-content">
        <n-button type="info" block strong @click="handleValidateButtonClick">
          注 册
        </n-button>
      </div>
    </n-form>
  </div>
</template>

<style scoped lang='less'>
.btn-content {
  margin: 20px 0;
}
.reg-form {
  margin-top: 15px;
}
</style>



