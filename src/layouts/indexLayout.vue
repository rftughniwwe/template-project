<script lang='ts'>
import { defineComponent, ref } from "vue";
import { Document, Location, User, Coin, Files } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
export default defineComponent({
  components: {
    Document,
    Location,
    Coin,
    User,
    Files,
  },
  setup() {
    const r = useRouter();
    const active = ref('');
    const p = localStorage.getItem('active-menu')
    if(p){
      active.value = p
    }
    return {
      active,
      logoutSys() {
        r.replace({ path: "/login" });
      },
      menuClick(path:string){
        localStorage.setItem('active-menu',path)
      }
    };
  },
});
</script>

<template>
  <div class="common-layout">
    <el-container style="height: 100%">
      <el-header style="background: #1a90e3; height: auto">
        <div class="el-h-content">
          <el-row justify="space-between" align="middle">
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
              <div class="logo">
                <el-space align="center">
                  <img src="@/assets/elogo.png" alt="" />
                  <span>熠朗数据库后台管理</span>
                </el-space>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
              <div class="avatar">
                <el-space justify="center" align="center">
                  <div class="a-content">
                    <el-space align="center">
                      <el-avatar
                        :size="30"
                        src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                      />
                      <span>UserName</span>
                    </el-space>
                  </div>
                  <div class="logout" @click="logoutSys">退出登录</div>
                </el-space>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-header>
      <el-container>
        <el-aside
          width="200px"
          style="box-shadow: 4px 0 30px 0 rgba(0, 0, 0, 0.15)"
        >
          <el-menu
            class="el-menu-vertical-demo"
            style="border-right: none"
            :default-active="active"
            router
          >
            <el-menu-item index="/dataSource" @click="menuClick('/dataSource')">
              <template #title>
                <el-icon><Coin /></el-icon>
                <span>数据源管理</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/personMan" @click="menuClick('/personMan')">
              <el-icon><User /></el-icon>
              <template #title>人员管理</template>
            </el-menu-item>
            <el-menu-item index="/auditUsag" @click="menuClick('/auditUsag')">
              <el-icon><document /></el-icon>
              <template #title>试用审核</template>
            </el-menu-item>
            <el-sub-menu index="4">
              <template #title>
                <el-icon><Files /></el-icon>
                <span>查询日志</span>
              </template>
              <el-menu-item index="/log" @click="menuClick('/log')">查询记录</el-menu-item>
              <el-menu-item index="/download" @click="menuClick('/download')">下载记录</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main style="background: #eee">
            <router-view></router-view>
          </el-main>
          <el-footer class="footer">
            <div class="f-wrap">Copyright 2022 上海熠朗信息科技</div>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang='less'>
.logo {
  img {
    height: 50px;
  }
  span {
    font-size: 25px;
    font-weight: 600;
    color: #fff;
    font-family: "Courier New", Courier, monospace;
  }
}
.common-layout {
  height: 100vh;
  box-sizing: border-box;
}
.footer {
  background: rgb(58, 55, 55);
  height: auto;
}
.f-wrap {
  color: #fff;
  padding: 12px 0;
  text-align: center;
  font-size: 15px;
}
.a-content {
  color: #fff;
  font-size: 14px;
  padding: 6px 10px;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
}
.logout {
  color: #fff;
  padding: 6px 10px;
  border-radius: 2px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
}
.avatar {
  text-align: right;
}
.el-h-content {
  padding: 5px 0;
}
</style>
