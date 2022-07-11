<template>
  <div :class="flex" :style="{ fontSize: size }">
    <span class="iconify m-iconify" :data-icon="icon"></span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Icon",
  props: {
    icon: { type: String, required: true },
    flex: { type: String, required: false, default: "flex-center" },
    size: { type: String, default: "17px" },
  },

  setup() {
    return {};
  },
});
</script>

<style scoped lang="less">
.m-iconify {
  margin: 0 4px;
}
</style>