<script lang='ts'>
import { defineComponent, ref } from "vue";
import { useSearch } from "@/stores/user";
import { useRouter } from "vue-router";
import SearchResult from "./component/searchResult.vue";
export default defineComponent({
  setup() {
    const search = useSearch();
    const searchVal = ref(search.getParams);
    const type = ref(0);
    const r = useRouter();
    const show = ref(false);
    return {
      search,
      show,
      searchVal,
      type,
      searchHandle() {
        show.value = true;
        setTimeout(() => {
          show.value = false;
        }, 1000);
      },
      handleBack() {
        r.push({ path: "/home" });
      },
    };
  },
  components: { SearchResult },
});
</script>

<template>
  <div class="g-layout-container g-second-page">
    <div class="margin-top">
      <div class="input-search-content">
        <div class="bread">
          <n-breadcrumb>
            <n-breadcrumb-item @click="handleBack">首页</n-breadcrumb-item>
            <n-breadcrumb-item>搜索</n-breadcrumb-item>
          </n-breadcrumb>
        </div>
        <n-input-group>
          <n-input
            type="text"
            v-model:value="searchVal"
            size="large"
            placeholder="请输入关键词"
            @keydown.enter="searchHandle"
            clearable
          >
            <template #prefix> </template>
            <template #clear-icon>
              <icon icon="ic:baseline-cancel" size="20px" />
            </template>
          </n-input>
          <n-button type="primary" size="large" @click="searchHandle">
            <template #icon>
              <icon icon="bytesize:search" size="18px" />
            </template>
          </n-button>
        </n-input-group>
      </div>
      <div class="main-content">
        <n-spin size="large" :show="show">
          <n-tabs animated type="card" v-model:value="type" size="large">
            <n-tab-pane tab="字段名" :name="0">
              <SearchResult />
            </n-tab-pane>
            <n-tab-pane tab="表名" :name="1"> <SearchResult /> </n-tab-pane>
            <n-tab-pane tab="库名" :name="2"> <SearchResult /> </n-tab-pane>
          </n-tabs>
        </n-spin>
      </div>
    </div>
  </div>
</template>

<style scoped lang='less'>

.input-search-content {
  min-width: 400px;
  width: 50%;
}
.bread {
  margin: 20px 0;
}
.radio-content {
  margin: 20px 0;
}
.main-content {
  margin: 20px 0;
}
</style>
