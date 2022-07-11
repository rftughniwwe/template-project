<template>
  <div v-loading="loading" :element-loading-text="tips" class="app-warp g-bg-main">
    <!-- :theme-overrides="themeOverrides" -->
    <n-config-provider
      :locale="zhCN"
      :date-locale="dateZhCN"
      :theme-overrides="themeOverrides"
    >
    <n-notification-provider>
      <router-view />
      </n-notification-provider>
    </n-config-provider>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onUnmounted } from "vue";
import {
  NConfigProvider,
  zhCN,
  dateZhCN,
  GlobalThemeOverrides,
} from "naive-ui";
import bus from "@/utils/bus";

export default defineComponent({
  components: { NConfigProvider },
  setup() {
    onUnmounted(() => {
      bus.off("loading");
    });

    bus.on("loading", (params: any) => {
      if (params.desc) {
        tips.value = params.desc;
      } else {
        tips.value = "";
      }
      loading.value = params.show;
    });

    const loading = ref(false);
    const tips = ref("");

    const themeOverrides: GlobalThemeOverrides = {
      common: {
        primaryColor: "#008ba1",
        primaryColorHover: "#4da1af",
        primaryColorPressed: "#3b7c87",
      },
    };

    return {
      loading,
      tips,
      zhCN,
      dateZhCN,
      themeOverrides,
    };
  },
});
</script>
<style>
</style>