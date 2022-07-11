<script lang='ts'>
import { defineComponent, ref } from "vue";
import { backTop } from "@/utils/tool.js";
import { useRouter } from "vue-router";
import { useIndex } from "@/stores/user";
export default defineComponent({
  setup() {
    const activeKey = ref(0);
    const loading = ref(false);
    const menuOptions = ref([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
    const router = useRouter()
    const ui = useIndex()
    if(ui.singleKey !== -1){
      activeKey.value = ui.singleKey
    }
    return {
      activeKey,
      menuOptions,
      loading,
      selected(num: number) {
        activeKey.value = num;
        ui.setSingleKey(num)
        backTop();
      },
      goQuery(){
        router.push({path:'/singleQuery'})
      },
    };
  },
});
</script>

<template>
  <div class="wrap">
    <el-row :gutter="25">
      <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="6">
        <div class="left-direct">
          <div
            v-for="(item, idx) in menuOptions"
            :key="idx"
            :class="['l-d-item', idx === activeKey ? 'active' : '']"
            @click="selected(idx)"
          >
            <div class="flex-between">
              <div class="f-b-left">
                <n-ellipsis style="max-width: 100%"> 热门数据库 </n-ellipsis>
              </div>
              <div class="f-b-right">
                <icon
                  icon="ant-design:arrow-right-outlined"
                  flex="flex-end-center"
                />
              </div>
            </div>
            <!-- <transition name="el-zoom-in-center"> -->
            <div v-show="idx === activeKey" class="triangle"></div>
            <div v-show="idx !== activeKey" class="triangle-left"></div>
            <!-- </transition> -->
          </div>
        </div>
      </el-col>
      <el-col :xs="16" :sm="16" :md="16" :lg="18" :xl="18">
        <n-spin :show="loading">
          <div class="right-content">
            <template v-if="menuOptions && menuOptions.length > 0">
              <el-row :gutter="20">
                <el-col
                  v-for="(item, idx) in menuOptions"
                  :key="idx"
                  :xs="24"
                  :sm="12"
                  :md="12"
                  :lg="8"
                  :xl="8"
                  style="margin-bottom: 20px"
                >
                  <div class="r-c-item" @click="goQuery">
                    <n-ellipsis style="max-width: 100%"> 精准扶贫 </n-ellipsis>
                  </div>
                </el-col>
              </el-row>
            </template>
            <template v-else>
              <el-empty description="没有数据" />
            </template>
          </div>
        </n-spin>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang='less'>
.left-direct {
  box-shadow: 0 0 30px 0 rgb(0 0 0 / 10%);
  padding: 15px 20px 15px 0;
  border-top: 5px solid @primary-color;
}
.l-d-item {
  padding: 10px 15px;
  margin: 20px 0 20px -15px;
  font-size: 16px;
  letter-spacing: 1px;
  background: @third-color;
  color: #fff;
  cursor: pointer;
  transition: all 0.15s;
  position: relative;
  &:hover {
    padding: 10px 0 10px 15px;
    color: #000;
    background-color: #fff;
    .triangle-left {
      border-color: #adadad #adadad transparent transparent;
    }
  }

  .triangle {
    position: absolute;
    right: 0;
    bottom: -13px;
    width: 0;
    height: 0;
    border-top: 7px solid;
    border-right: 7px solid;
    border-bottom: 7px solid;
    border-left: 7px solid;
    border-color: #adadad transparent transparent #adadad;
    transition: all 0.15s;
  }
  .triangle-left {
    position: absolute;
    left: 0;
    bottom: -13px;
    width: 0;
    height: 0;
    border-top: 7px solid;
    border-right: 7px solid;
    border-bottom: 7px solid;
    border-left: 7px solid;
    border-color: #134850 #134850 transparent transparent;
    transition: all 0.15s;
  }
}
.active {
  .index-single-left-direct-item-active();
}
.f-b-left {
  width: 70%;
}
.f-b-right {
  width: 25%;
}
.right-content {
  background: #fff;
  padding: 35px 20px;
}
.r-c-item {
  padding: 10px 15px;
  background-color: #caeff5b0;
  cursor: pointer;
  border-left: 4px solid @primary-color;
  transition: all 0.15s;
  &:hover {
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>
