
<script lang='ts'>
import { defineComponent, ref } from "vue";
import { FormItemRule, FormRules } from "naive-ui";
import { Message } from "@/utils/tool.js";

interface ModelType {
  pwd: string | null;
  newPwd: string | null;
  againPwd: string | null;
}
const modelRef = ref<ModelType>({
  pwd: "",
  newPwd: "",
  againPwd: "",
});
function validatePasswordStartWith(rule: FormItemRule, value: string): boolean {
  return (
    !!modelRef.value.newPwd &&
    modelRef.value.newPwd.startsWith(value) &&
    modelRef.value.newPwd.length >= value.length
  );
}
function validatePasswordSame(rule: FormItemRule, value: string): boolean {
  return value === modelRef.value.newPwd;
}
export default defineComponent({
  setup() {
    const rules: FormRules = {
      pwd: [
        {
          required: true,
          validator(rule: FormItemRule, value: string) {
            if (!value) {
              return new Error("请输入现用密码");
            } else if (value.length < 6) {
              return new Error("密码长度不能小于6位");
            }
            return true;
          },
          trigger: ["input", "blur"],
        },
      ],
      newPwd: [
        {
          required: true,
          validator(rule: FormItemRule, value: string) {
            if (!value) {
              return new Error("请输入新密码");
            } else if (value.length < 6) {
              return new Error("密码长度不能小于6位");
            }
            return true;
          },
          trigger: ["input", "blur"],
        },
      ],
      againPwd: [
        {
          required: true,
          message: "请再次输入密码",
          trigger: ["input", "blur"],
        },
        {
          validator: validatePasswordStartWith,
          message: "两次密码输入不一致",
          trigger: "input",
        },
        // {
        //   validator: validatePasswordSame,
        //   message: "两次密码输入不一致",
        //   trigger: ["input"],
        // },
      ],
    };
    const formRef = ref<null>(null);

    return {
      rules,
      formRef,
      model: modelRef,
      submit(e: Event) {
        e.preventDefault();
        //@ts-ignore
        formRef.value?.validate((errors: any) => {
          if (!errors) {
            Message("success", "修改成功");
          }
        });
      },
    };
  },
});
</script>

<template>
  <div>
    <n-form
      ref="formRef"
      :model="model"
      :rules="rules"
      label-placement="left"
      label-width="100"
      style="max-width: 600px"
    >
      <n-form-item label="现用密码" path="pwd">
        <n-input
          type="password"
          v-model:value="model.pwd"
          placeholder="输入密码"
        />
      </n-form-item>
      <n-form-item label="新密码" path="newPwd">
        <n-input
          type="password"
          v-model:value="model.newPwd"
          placeholder="输入新密码"
        />
      </n-form-item>
      <n-form-item label="重复密码" path="againPwd">
        <n-input
          type="password"
          v-model:value="model.againPwd"
          placeholder="重复新密码"
        />
      </n-form-item>
      <div class="btn-content">
        <n-button size="large" type="primary" @click="submit">保存</n-button>
      </div>
    </n-form>
  </div>
</template>

<style scoped lang='less'>
.btn-content {
  text-align: center;
  padding: 30px 0;
}
</style>
