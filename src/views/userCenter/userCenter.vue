<script lang='ts'>
import { defineComponent, ref, h, Component } from "vue";
import { useRouter } from "vue-router";
import type { MenuOption } from "naive-ui";
import {
  basicInfo,
  editPwd,
  dataPermission,
  download,
  myCase,
} from "./components";
import {
  InformationCircleOutline,
  CalculatorOutline,
  BarChartOutline,
  BagCheckOutline,
  BookmarksOutline,
  LogOutOutline,
} from "@vicons/ionicons5";
import { NIcon } from "naive-ui";
import { logout } from "@/utils/hooks.js";
import { useUserCenter } from "@/stores/user";

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
const menuOptions: MenuOption[] = [
  {
    label: "基本信息",
    key: "0",
    icon: renderIcon(InformationCircleOutline),
  },
  {
    label: "修改密码",
    key: "1",
    icon: renderIcon(CalculatorOutline),
  },
  {
    label: "数据权限",
    key: "2",
    icon: renderIcon(BarChartOutline),
  },
  {
    label: "下载记录",
    key: "3",
    icon: renderIcon(BagCheckOutline),
  },
  {
    label: "我的方案",
    key: "4",
    icon: renderIcon(BookmarksOutline),
  },
  {
    label: "退出登录",
    key: "6",
    icon: renderIcon(LogOutOutline),
  },
];
export default defineComponent({
  setup() {
    const r = useRouter();
    const keyStr = ref("1");
    const keyLabel = ref("基本信息");
    const us = useUserCenter();
    console.log(us.getKey);
    if (us.getKey && us.getKey !== "6") {
      // @ts-ignore
      keyLabel.value = menuOptions[parseInt(us.getKey)].label;
      keyStr.value = us.getKey;
    }
    const loading = ref(false);
    return {
      us,
      menuOptions,
      keyStr,
      loading,
      keyLabel,
      goIndex() {
        r.push({ path: "/home" });
      },
      menuChange(key: string, item: MenuOption) {
        if (key === "6") {
          logout(1);
        } else {
          us.setKey(key);
          //@ts-ignore
          keyLabel.value = item.label;
          loading.value = true;
          keyStr.value = key;
          setTimeout(() => {
            loading.value = false;
          }, 500);
        }
      },
    };
  },
  components: { basicInfo, editPwd, dataPermission, download, myCase },
});
</script>

<template>
  <div class="margin-top">
    <div class="g-layout-container">
      <div style="margin: 20px 0">
        <n-breadcrumb>
          <n-breadcrumb-item @click="goIndex"> 首页</n-breadcrumb-item>
          <n-breadcrumb-item> 个人中心</n-breadcrumb-item>
          <n-breadcrumb-item v-if="keyLabel"> {{ keyLabel }}</n-breadcrumb-item>
        </n-breadcrumb>
      </div>
      <div class="main-content">
        <n-layout>
          <n-layout has-sider>
            <n-layout-sider
              bordered
              collapse-mode="width"
              :collapsed-width="64"
              :width="200"
              show-trigger
            >
              <n-menu
                :collapsed-width="64"
                :collapsed-icon-size="22"
                :options="menuOptions"
                @update:value="menuChange"
                :default-value="keyStr"
              />
            </n-layout-sider>
            <n-layout-content content-style="padding: 24px;min-height:700px;">
              <n-spin :show="loading" style="height: 100%">
                <template v-if="keyStr === '0'">
                  <basicInfo />
                </template>
                <template v-else-if="keyStr === '1'">
                  <editPwd />
                </template>
                <template v-else-if="keyStr === '2'">
                  <dataPermission />
                </template>
                <template v-else-if="keyStr === '3'">
                  <download />
                </template>
                <template v-else-if="keyStr === '4'">
                  <myCase />
                </template>
              </n-spin>
            </n-layout-content>
          </n-layout>
        </n-layout>
      </div>
    </div>
  </div>
</template>

<style scoped lang='less'>
.margin-top {
  min-height: 900px;
  box-sizing: border-box;
}
</style>
