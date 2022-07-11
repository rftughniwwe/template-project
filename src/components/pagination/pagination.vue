<!-- 分页 -->
<script lang='ts'>
import { defineComponent, watch, ref } from "vue";
export default defineComponent({
  name: "pagination",
  props: {
    total: {
      type: Number,
      required: true,
    },
  },
  setup(props, context) {
    watch(
      () => props.total,
      (state, prevState) => {
        count.value = state;
      }
    );
    const count = ref(props.total);
    return {
      count,
      pageChange(page:number){
        context.emit('pageChange',{page})
      },
    };
  },
});
</script>

<template>
  <div class="wrap">
    <n-space justify="end" align="center">
      <n-pagination :item-count="count" @update:page="pageChange" />
    </n-space>
  </div>
</template>

<style scoped lang='less'>
.wrap {
  margin: 20px 0;
}
</style>
