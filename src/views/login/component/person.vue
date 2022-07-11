<!-- 个人登录 -->
<script lang='ts'>
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "mechanism",
  setup() {
    const pwd = ref(false);
    return {
      pwd,
    };
  },
});
</script>

<template>
  <n-form>
    <n-form-item-row label="用户名">
      <n-input placeholder='用户名/手机号'/>
    </n-form-item-row>
    <n-form-item-row label="密码">
      <n-input placeholder='密码'/>
    </n-form-item-row>
  </n-form>
  <n-space justify="space-between" class="remember-pwd">
    <n-checkbox v-model:checked="pwd"> 记住密码 </n-checkbox>
    <n-button text tag="a" type="primary"> 忘记密码? </n-button>
  </n-space>
  <n-button type="primary" block strong> 登 录 </n-button>
  <div class="register">
    还没账号? <n-button text tag="a" type="primary">立即申请</n-button>
  </div>
</template>

<style scoped lang='less'>
.remember-pwd {
  margin: 0 2px 15px;
}
.register{
    margin: 15px 2px 0;
}

</style>
