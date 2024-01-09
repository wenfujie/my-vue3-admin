import { defineStore } from "pinia";
import { store } from "@/store";
import { ACCESS_TOKEN_KEY } from "@/enums/cacheEnum";
import { Storage } from "@/utils/Storage";
import type { RouteRecordRaw } from "vue-router";
import routesChildren from "@/router/modules";
import { resetRouter } from "@/router";

interface UserState {
  token: string;
  menus: RouteRecordRaw[];
  // TODO:
  userInfo: any;
}

export const useUserStore = defineStore({
  id: "user",
  state: (): UserState => ({
    token: Storage.get(ACCESS_TOKEN_KEY, null),
    menus: [...routesChildren],
    userInfo: {
      name: "wfj",
    },
  }),
  getters: {
    getToken(): string {
      return this.token;
    },
  },
  actions: {
    login() {
      // TODO: use api
      // this.setToken(data.token);
      this.afterLogin();
    },
    /** 登录成功之后, 获取用户信息以及生成权限路由 */
    async afterLogin() {
      // TODO: use api/ generator menu
      // this.name = userInfo.name;
      // this.userInfo = userInfo;
      // this.setMenus()
    },
    logout() {
      this.resetToken();
      resetRouter();
    },
    setMenus() {
      // TODO: 处理动态菜单
    },
    /** 登录成功保存token */
    setToken(token: string, ex: number) {
      this.token = token ?? "";
      Storage.set(ACCESS_TOKEN_KEY, this.token, ex);
    },
    resetToken() {
      this.menus = [];
      this.userInfo = {};
      Storage.clear();
    },
  },
});

// 在组件setup函数外使用
export function useUserStoreWithOut() {
  return useUserStore(store);
}
