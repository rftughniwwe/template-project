<script lang='ts'>
import { defineComponent, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import bus from "@/utils/bus";
export default defineComponent({
  setup() {
    const show = ref(0);
    const isHome = ref(true);
    const isLogin = ref(true);
    const router = useRouter();
    const pathStr = ref();
    const handleScroll = () => {
      let top =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      show.value = top;
    };
    const menuActive = () => {
      let path = localStorage.getItem("router-path");
      pathStr.value = path;
      if (path === "/home") {
        isHome.value = true;
      } else {
        isHome.value = false;
      }
    };

    menuActive();

    // 监听
    bus.on("routerListener", menuActive);
    window.addEventListener("scroll", handleScroll, true);
    onUnmounted(() => {
      bus.off("routerListener");
      window.removeEventListener("scroll", handleScroll);
    });
    // 监听

    return {
      show,
      isHome,
      pathStr,
      menuActive,
      handleScroll,
      isLogin,
      goRouter(num: number) {
        if (num === 1) {
          router.push({ path: "/" });
        } else if (num === 2) {
          router.push({ path: "/index" });
        } else {
          if(isLogin.value){
            router.push({ path: "/usercenter" });
          }else {
            router.push({ path: "/login" });
          }
        }
      },
    };
  },
});
</script>

<template>
  <div
    :class="[
      'index-header-wrap',
      !isHome ? 'bg-linear' : show > 0 ? 'bg-linear' : 'bg-trans',
    ]"
  >
    <div class="g-layout-container">
      <n-space align="center" justify="space-between">
        <span class="topic" @click="goRouter(1)">数据库</span>
        <div class="user-content">
          <n-space align="center" justify="end">
            <div
              :class="[
                'u-c-info',
                'flex-center',
                pathStr === '/home' || pathStr === '/' ? 'menu-active' : '',
              ]"
              @click="goRouter(1)"
            >
              <span class="u-c-i-menu-txt">首页</span>
            </div>
            <div
              :class="[
                'u-c-info',
                'flex-center',
                pathStr === '/index' ? 'menu-active' : '',
              ]"
              @click="goRouter(2)"
            >
              <span class="u-c-i-menu-txt">数据中心</span>
            </div>
            <div class="u-c-info flex-center" @click="goRouter(3)">
              <template v-if="isLogin">
                <n-avatar
                  round
                  src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                />
                <span class="u-c-i-name">张三</span>
              </template>
              <template v-else>
                <span class="login-txt" >登录/注册</span>
              </template>
            </div>
          </n-space>
        </div>
      </n-space>
    </div>
  </div>
</template>

<style scoped lang='less'>
.bg-linear {
  background: linear-gradient(to bottom right, #008ba1, #00718d, #0053a1);
}
.bg-trans {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), transparent);
}
.index-header-wrap {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 10;
  padding: 10px 0;
  color: #fff;
  transition: all 0.2s;
  .topic {
    letter-spacing: 2px;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
  }
  .u-c-info {
    cursor: pointer;
    border-radius: 3px;
    transition: all 0.2s;
    padding: 6px 12px;
    margin: 0 10px;
    &:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }
    .u-c-i-name {
      margin-left: 10px;
      font-size: 17px;
      color: #fff;
    }
  }
}
.menu-active {
  background-color: rgba(255, 255, 255, 0.3);
}
.u-c-i-menu-txt {
  font-size: 18px;
  color: #fff;
}
.login-txt {
  font-size: 17px;
  color: #fff;
  letter-spacing: 1px;
}
</style>
