<script lang='ts'>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useIndex, useSearch } from "@/stores/user";
export default defineComponent({
  setup() {
    const tab = ref(0);
    const router = useRouter();
    const search = useSearch();
    const searchVal = ref("");
    const ui = useIndex()
    return {
      tab,
      searchVal,
      goquery(num: number) {
        ui.setIndexKey(num)
        router.push({ path: `/index`});
      },
      goDetail() {
        router.push({ path: "/singleQuery" });
      },
      // 搜索
      searchHandle() {
        search.setParams(searchVal.value);
        router.push({ path: "/search" });
      },
    };
  },
});
</script>
<template>
  <div class="head-content">
    <n-carousel autoplay :show-dots="false">
      <img class="carousel-img" src="@/assets/index-bg2.jpeg" />
      <img class="carousel-img" src="@/assets/login-bg.jpg" />
    </n-carousel>
    <div class="g-layout-container index-head">
      <n-input-group>
        <n-input
          class="i-h-search-input"
          type="text"
          size="large"
          v-model:value="searchVal"
          placeholder="请输入关键词"
          @keydown.enter="searchHandle"
          clearable
        >
          <template #prefix>
            <icon icon="bytesize:search" size="20px" />
          </template>
          <template #clear-icon>
            <icon icon="ic:baseline-cancel" size="20px" />
          </template>
        </n-input>
        <n-button
          type="primary"
          size="large"
          style="padding: 26px 25px"
          @click="searchHandle"
        >
          搜 索
        </n-button>
      </n-input-group>
    </div>
  </div>
  <div class="g-layout-container">
    <div class="index-main">
      <n-tabs v-model:value="tab" type="line" size="large">
        <n-tab-pane tab="单表查询" :name="0">
          <n-p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            euismod bibendum laoreet. Proin gravida dolor sit amet lacus
            accumsan et viverra justo commodo. Proin sodales pulvinar sic
            tempor. Sociis natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra
            vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc
            accuan eget
          </n-p>
          <n-button type="primary" text @click="goquery(1)" class="enter-txt"
            >单表查询入口>></n-button
          >
        </n-tab-pane>
        <n-tab-pane tab="跨表查询" :name="1">
          <n-p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            euismod bibendum laoreet. Proin gravida dolor sit amet lacus
            accumsan et viverra justo commodo. Proin sodales pulvinar sic
            tempor. Sociis natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra
            vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc
            accuan eget
          </n-p>
          <n-button type="primary" text @click="goquery(2)" class="enter-txt"
            >跨表查询入口>></n-button
          >
        </n-tab-pane>
      </n-tabs>

      <div class="lib-card">
        <div class="l-c-item">
          <div class="l-c-i-topic">
            <n-h2 prefix="bar">
              <n-space align="center" justify="space-between">
                <n-text> XXX系列 </n-text>
                <n-button text type="primary">查看更多</n-button>
              </n-space>
            </n-h2>
          </div>
          <div class="l-c-i-content">
            <n-space wrap justify="start" align="start">
              <div class="r-c-item" @click="goDetail">
                精准扶贫精准扶贫精准扶贫精准扶贫精准扶贫精准扶贫
              </div>
              <div class="r-c-item" @click="goDetail">
                精准扶贫 精准扶贫精准扶贫
              </div>
              <div class="r-c-item" @click="goDetail">
                精准扶贫 精准扶贫精准扶贫
              </div>
              <div class="r-c-item" @click="goDetail">
                精精准扶贫精准扶贫精准扶贫准扶贫
              </div>
              <div class="r-c-item" @click="goDetail">
                精准扶贫 精准扶贫精准扶贫
              </div>
              <div class="r-c-item" @click="goDetail">
                精准扶贫 精准扶贫精准扶贫
              </div>
              <div class="r-c-item" @click="goDetail">
                精精准扶贫精准扶贫精准扶贫准扶贫
              </div>
            </n-space>
          </div>
        </div>
        <div class="l-c-item">
          <div class="l-c-i-topic">
            <n-h2 prefix="bar">
              <n-space align="center" justify="space-between">
                <n-text> XXX系列 </n-text>
                <n-button text type="primary">查看更多</n-button>
              </n-space>
            </n-h2>
          </div>
          <div class="l-c-i-content">
            <n-space wrap justify="start" align="start">
              <div class="r-c-item" @click="goDetail">
                精准扶贫精准扶贫精准扶贫精准扶贫精准扶贫精准扶贫
              </div>
              <div class="r-c-item" @click="goDetail">
                精准扶贫 精准扶贫精准扶贫
              </div>
              <div class="r-c-item" @click="goDetail">
                精准扶贫 精准扶贫精准扶贫
              </div>
              <div class="r-c-item" @click="goDetail">
                精精准扶贫精准扶贫精准扶贫准扶贫
              </div>
              <div class="r-c-item" @click="goDetail">
                精准扶贫 精准扶贫精准扶贫
              </div>
              <div class="r-c-item" @click="goDetail">
                精准扶贫 精准扶贫精准扶贫
              </div>
              <div class="r-c-item" @click="goDetail">
                精精准扶贫精准扶贫精准扶贫准扶贫
              </div>
            </n-space>
          </div>
        </div>
        <div class="l-c-item">
          <div class="l-c-i-topic">
            <n-h2 prefix="bar">
              <n-space align="center" justify="space-between">
                <n-text> XXX系列 </n-text>
                <n-button text type="primary">查看更多</n-button>
              </n-space>
            </n-h2>
          </div>
          <div class="l-c-i-content">
            <n-space wrap justify="start" align="start">
              <div class="r-c-item" @click="goDetail">
                精准扶贫精准扶贫精准扶贫精准扶贫精准扶贫精准扶贫
              </div>
              <div class="r-c-item" @click="goDetail">
                精准扶贫 精准扶贫精准扶贫
              </div>
              <div class="r-c-item" @click="goDetail">
                精准扶贫 精准扶贫精准扶贫
              </div>
              <div class="r-c-item" @click="goDetail">
                精精准扶贫精准扶贫精准扶贫准扶贫
              </div>
              <div class="r-c-item" @click="goDetail">
                精准扶贫 精准扶贫精准扶贫
              </div>
              <div class="r-c-item" @click="goDetail">
                精准扶贫 精准扶贫精准扶贫
              </div>
              <div class="r-c-item" @click="goDetail">
                精精准扶贫精准扶贫精准扶贫准扶贫
              </div>
            </n-space>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='less'>
.head-content {
  height: 400px;
  width: 100%;
  // background-image: url(@/assets/index-bg.jpg);
  background-repeat: repeat;
  background-size: 100% 200%;
}
.index-main {
  padding: 20px 0;
}
.index-head {
  width: 40%;
  margin-top: -150px;
  @media screen and (max-width: 1086px) {
    width: 70%;
  }
}
.i-h-search-input {
  padding: 6px 0;
  font-size: 18px;
}
.carousel-img {
  width: 100%;
  height: 100%;
}
.enter-txt {
  font-size: 15px;
}
.lib-card {
  margin: 60px 0 30px;
}
.l-c-item {
  margin-bottom: 40px;
}
.l-c-i-topic {
  font-weight: 500;
  font-size: 19px;
  color: #000;
  padding: 5px 0;
}
.r-c-item {
  padding: 8px 12px;
  background-color: #caeff5b0;
  cursor: pointer;
  border-left: 4px solid @second-color;
  transition: all 0.15s;
  letter-spacing: 1px;
  &:hover {
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>
