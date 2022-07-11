<!-- ip登录 -->
<script lang='ts'>
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "mechanism",
  setup() {
    return {
      ip: ref("192.168.0.112"),
    };
  },
});
</script>

<template>
  <div class="ip-wrap">
    <n-form label-placement="left" label-width="60" class="nf">
      <n-form-item label="Ip地址">
        <n-input readonly v-model:value="ip" />
      </n-form-item>
    </n-form>
    <n-button type="primary" block strong> 登 录 </n-button>
  </div>
</template>

<style scoped lang='less'>
.nf{
  padding: 15px 0 5px;
}
</style>
