import { defineStore } from "pinia";
// 用户登录信息
export const useUserInfo = defineStore("user", {
  state: () => {
    return {
      token: "",
      info: {},
    };
  },
  getters: {
    tokens: (state) => {
      return state.token || localStorage.getItem("user_login_token") || "";
    },
    userInfo: (state) => {
      return state.info || localStorage.getItem("user_login_info") || {};
    },
  },
  actions: {
    add(res: any) {
      this.token = res.result.token;
      this.info = res.result.userInfo;
      localStorage.setItem("user_login_token", res.result.token);
      localStorage.setItem("user_login_info", res.result.userInfo);
    },
    remove() {
      this.token = "";
      this.info = {};
      localStorage.removeItem("user_login_token");
      localStorage.removeItem("user_login_info");
    },
  },
});

// 首页检索
export const useSearch = defineStore("search", {
  state: () => {
    return {
      params: "123",
    };
  },
  getters: {
    getParams(state) {
      return state.params;
    },
  },
  actions: {
    setParams(p: string) {
      console.log("G", p);
      this.params = p;
    },
  },
});

// 个人中心路由
export const useUserCenter = defineStore("userCenterRoute", {
  state: () => {
    return {
      key: "",
    };
  },
  getters: {
    getKey(state) {
      return state.key || localStorage.getItem("us-key") || "";
    },
  },
  actions: {
    setKey(p: string) {
      this.key = p;
      localStorage.setItem("us-key", p);
    },
  },
});

// index
export const useIndex = defineStore("useIndex", {
  state: () => {
    return {
      indexKey: 0,
      singleKey: -1,
    };
  },
  getters: {
    getIndexKey(state) {
      return state.indexKey;
    },
    getSingleKey(state) {
      return state.singleKey;
    },
  },
  actions: {
    setIndexKey(p: number) {
      this.indexKey = p;
    },
    setSingleKey(p: number) {
      this.singleKey = p;
    },
  },
});
