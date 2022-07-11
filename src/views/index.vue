<script lang='ts'>
import { defineComponent, onMounted, ref } from "vue";
import singleQueryVue from "@/components/indexComponents/singleQuery.vue";
import multipleQueryVue from "@/components/indexComponents/multipleQuery.vue";
import { useRoute } from "vue-router";
import { useIndex } from "@/stores/user";
export default defineComponent({
  components: { singleQueryVue, multipleQueryVue },
  setup() {
    const tab = ref(1);
    const route = useRoute();
    const uindex = useIndex();
    let id = uindex.getIndexKey;

    if (id !== 0) {
      //@ts-ignore
      tab.value = id;
    }
    return {
      tab,
      checkoutTab(num: number) {
        tab.value = num;
      },
    };
  },
});
</script>

<template>
  <div class="head-content">
    <div class="g-layout-container index-head">
      <!-- <div class="search-content">
        <n-space align="end" justify="end">
          <div class="search-input">
            <n-input clearable size="large" placeholder="请输入关键字">
              <template #prefix>
                <icon icon="bytesize:search" />
              </template>
            </n-input>
          </div>
        </n-space>
      </div> -->
      <div class="head-tabs">
        <n-space justify="start">
          <div
            :class="['tab-pane', tab === 1 ? 'active' : '']"
            @click="checkoutTab(1)"
          >
            <n-space align="center">
              <icon icon="dashicons:database" size="20px" />
              单表查询
            </n-space>
          </div>
          <div
            :class="['tab-pane', tab === 2 ? 'active' : '']"
            @click="checkoutTab(2)"
          >
            <n-space align="center">
              <icon icon="ant-design:database-filled" size="20px" />
              跨表查询
            </n-space>
          </div>
        </n-space>
      </div>
    </div>
  </div>
  <div class="g-layout-container index-main">
    <div v-show="tab === 1">
      <singleQueryVue />
    </div>
    <div v-show="tab === 2">
      <multipleQueryVue />
    </div>
  </div>
</template>

<style scoped lang='less'>
.head-content {
  height: 180px;
  background-image: url(https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg);
  background-repeat: repeat;
  background-size: 100% 200%;
}
.search-content {
  padding: 20px 0;
}
.index-head {
  position: relative;
  height: 100%;
}
.head-tabs {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
.tab-pane {
  padding: 8px 15px;
  font-size: 17px;

  background-color: @primary-color;
  color: #fff;
  letter-spacing: 1px;
  cursor: pointer;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-left: 1px solid @primary-color;
  border-right: 1px solid @primary-color;
  border-top: 1px solid @primary-color;
  transition: all 0.2s;
  &:hover {
    color: @primary-color;
    background-color: #fff;
  }
}
.active {
  color: @primary-color;
  background-color: #fff;
}
.index-main {
  padding: 30px 0;
}
</style>
