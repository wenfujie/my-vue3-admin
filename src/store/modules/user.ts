import { defineStore } from 'pinia';
import type { RouteRecordRaw } from 'vue-router';
import type { LoginParams, LoginResModel } from '@/api/sys/model/userModel';
import { store } from '@/store';
import { ACCESS_TOKEN_KEY, USER_INFO_KEY } from '@/enums/cacheEnum';
import { Storage } from '@/utils/Storage';
import { resetRouter } from '@/router';
import { generatorDynamicRouter } from '@/router/generator-router';
import { accountLogin } from '@/api/sys/user';

interface UserState {
  token: string;
  menus: RouteRecordRaw[];
  userInfo: null | LoginResModel;
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    token: Storage.get(ACCESS_TOKEN_KEY, null),
    menus: [],
    userInfo: Storage.get(USER_INFO_KEY, null),
  }),
  getters: {
    getToken(): string {
      return this.token;
    },
  },
  actions: {
    async login(data: LoginParams) {
      const userInfo = await accountLogin(data);
      this.setLoginInfo(userInfo);
      this.afterLogin();
    },
    /** 登录成功之后, 获取用户信息以及生成权限路由 */
    async afterLogin() {
      await this.setMenus();
    },
    logout() {
      this.resetCache();
      resetRouter();
    },
    async setMenus() {
      // TODO: 在此处理动态菜单
      const generatorResult = await generatorDynamicRouter();
      this.menus = generatorResult.menus.filter((item) => !item.meta?.hideInMenu);
    },
    /** 保存登录信息 */
    setLoginInfo(userInfo: LoginResModel) {
      const { expiration = null, token = '' } = userInfo;
      this.userInfo = userInfo;
      Storage.set(USER_INFO_KEY, userInfo, expiration);

      this.token = token;
      Storage.set(ACCESS_TOKEN_KEY, token, expiration);
    },
    resetCache() {
      this.menus = [];
      this.userInfo = null;
      Storage.clear();
    },
  },
});

// 在组件setup函数外使用
export function useUserStoreWithOut() {
  return useUserStore(store);
}
