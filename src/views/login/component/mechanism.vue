<!-- 机构登录 -->
<script lang='ts'>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "mechanism",
  setup() {
    const pwd = ref(false);
    const route = useRouter()
    return {
      pwd,
      login(){
        route.push({path:'/'})
      },
    };
  },
});
</script>

<template>
  <n-form label-placement="left" label-width="60" class="nf">
    <n-form-item label="用户名">
      <n-input placeholder="用户名/手机号" />
    </n-form-item>
    <n-form-item label="密码">
      <n-input placeholder="密码" />
    </n-form-item>
  </n-form>
  <n-space justify="space-between" class="remember-pwd">
    <n-checkbox v-model:checked="pwd"> 记住密码 </n-checkbox>
    <n-button text tag="a" type="primary"> 忘记密码? </n-button>
  </n-space>
  <n-button type="primary" block strong @click="login"> 登 录 </n-button>
</template>

<style scoped lang='less'>
.remember-pwd {
  margin: 0 2px 15px;
}
.nf{
  padding: 20px 0 0;
}
</style>
