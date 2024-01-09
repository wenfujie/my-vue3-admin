import { defineStore } from "pinia";
import { store } from "@/store";
import { ACCESS_TOKEN_KEY } from "@/enums/cacheEnum";
import { Storage } from "@/utils/Storage";
import type { RouteRecordRaw } from "vue-router";
import { resetRouter } from "@/router";
import type { LoginParams, LoginRes } from "@/api/sys/model/userModel";
import { generatorDynamicRouter } from "@/router/generator-router";

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
    menus: [],
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
    async login(data: LoginParams) {
      // TODO: use api
      const loginInfo: LoginRes = {
        token: "123123123",
        expire: 24 * 3600,
      };
      this.setToken(loginInfo.token, loginInfo.expire);
      this.afterLogin();
    },
    /** 登录成功之后, 获取用户信息以及生成权限路由 */
    async afterLogin() {
      // TODO: use api getUser
      this.userInfo = { name: "wfj" };
      await this.setMenus();
    },
    logout() {
      this.resetCache();
      resetRouter();
    },
    async setMenus() {
      // TODO: 在此处理动态菜单
      const generatorResult = await generatorDynamicRouter();
      this.menus = generatorResult.menus.filter(
        (item) => !item.meta?.hideInMenu
      );
      console.log("%c label", "color:#0f0;", this.menus);
    },
    /** 登录成功保存token */
    setToken(token: string, ex: number) {
      this.token = token ?? "";
      Storage.set(ACCESS_TOKEN_KEY, this.token, ex);
    },
    resetCache() {
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
