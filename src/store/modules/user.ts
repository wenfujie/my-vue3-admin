import { defineStore } from "pinia";
import { store } from "@/store";
import { ACCESS_TOKEN_KEY } from "@/enums/cacheEnum";
import { Storage } from "@/utils/Storage";
import type { RouteRecordRaw } from "vue-router";

interface UserState {
  token: string;
  name: string;
  menus: RouteRecordRaw[];
  // TODO:
  userInfo: any;
}

export const useUserStore = defineStore({
  id: "user",
  state: (): UserState => ({
    token: Storage.get(ACCESS_TOKEN_KEY, null),
    name: "wfj",
    menus: [],
    userInfo: {},
  }),
  getters: {
    getToken(): string {
      return this.token;
    },
    getName(): string {
      return this.name;
    },
  },
  actions: {},
});

// 在组件setup函数外使用
export function useUserStoreWithOut() {
  return useUserStore(store);
}
