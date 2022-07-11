<script lang='ts'>
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "basic-info",
  setup() {
    return {
      model: ref({
        account: "15779090999",
        school: "黄石第一小学",
        name: "秩序册",
        email: "qweasdzxc@qq.com",
      }),
    };
  },
});
</script>

<template>
  <div>
    <n-form ref="formRef" :model="model" label-placement="left" label-width="100" style="max-width:600px">
      <n-form-item label="账号" path="account">
        <n-input readonly v-model:value="model.account" placeholder="账号" />
      </n-form-item>
      <n-form-item label="学校" path="school">
        <n-input readonly v-model:value="model.school" placeholder="输入学校" />
      </n-form-item>
      <n-form-item label="用户名" path="name">
        <n-input readonly v-model:value="model.name" placeholder="输入用户名" />
      </n-form-item>
      <n-form-item label="邮箱" path="email">
        <n-input readonly v-model:value="model.email" placeholder="输入邮箱" />
      </n-form-item>
    </n-form>
  </div>
</template>

<style scoped lang='less'>
</style>

