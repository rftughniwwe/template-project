import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/dataSource",
    name: "index",
    component: () => import("@/layouts/indexLayout.vue"),
    children: [
      {
        path: "/dataSource",
        name: "dataSource",
        meta: {
          title: "数据源管理",
        },
        component: () => import("@/views/dataSource/dataSource.vue"),
      },
      {
        path: "/personMan",
        name: "personMan",
        meta: {
          title: "人员管理",
        },
        component: () => import("@/views/personMan/personMan.vue"),
      },
      {
        path: "/auditUsag",
        name: "auditUsag",
        meta: {
          title: "试用审核",
        },
        component: () => import("@/views/auditUsag/auditUsag.vue"),
      },
      {
        path: "/log",
        name: "log",
        meta: {
          title: "查询记录",
        },
        component: () => import("@/views/log/log.vue"),
      },
      {
        path: "/download",
        name: "download",
        meta: {
          title: "下载记录",
        },
        component: () => import("@/views/log/download.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录",
    },
    component: () => import("@/views/login/login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
