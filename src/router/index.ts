import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home",
    component: () => import("@/layouts/indexLayout.vue"),
    name: "home",
    meta: {
      title: "主页",
    },
    children: [
      {
        path: "/home",
        name: "home",
        meta: {
          title: "主页",
        },
        component: () => import("@/views/home.vue"),
      },
      {
        path: "/index",
        name: "index",
        meta: {
          title: "主页",
        },
        component: () => import("@/views/index.vue"),
      },
      {
        path: "/search",
        name: "search",
        meta: {
          title: "检索",
        },
        component: () => import("@/views/search/search.vue"),
      },
      {
        path: "/usercenter",
        name: "usercenter",
        meta: {
          title: "个人中心",
        },
        component: () => import("@/views/userCenter/userCenter.vue"),
      },
      {
        path: "/previewdata",
        name: "previewdata",
        meta: {
          title: "预览数据",
        },
        component: () => import("@/views/previewData/previewData.vue"),
      },
      {
        path: "/singleQuery",
        name: "singlequery",
        meta: {
          title: "单表查询",
        },
        component: () => import("@/views/query/singleQueryPage.vue"),
      },
    ],
  },

  {
    path: "/login",
    name: "Login",
    redirect: "/login-register",
    component: () => import("@/layouts/BlankLayout.vue"),
    meta: {
      title: "登录",
    },
    children: [
      {
        path: "/login-register",
        name: "login-register",
        meta: {
          title: "登录注册",
        },
        component: () => import("@/views/login/login.vue"),
      },
    ],
  },
  // {
  //   path: "/charts",
  //   name: "Charts",
  //   meta: {
  //     title: "图表",
  //   },
  //   component: () => import("@/views/charts/charts.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
