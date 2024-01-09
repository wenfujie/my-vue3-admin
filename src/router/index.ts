import "nprogress/css/nprogress.css"; // 进度条样式
import { createRouter, createWebHashHistory } from "vue-router";
import { LOGIN_NAME, whiteNameList } from "./constant";
import type { App } from "vue";
import type { RouteRecordRaw } from "vue-router";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Layout",
    component: () =>
      import(/* webpackChunkName: "layout" */ "@/layout/index.vue"),
    meta: {
      title: "首页",
    },
    children: [],
  },
  {
    path: "/login",
    name: LOGIN_NAME,
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/login/index.vue"),
    meta: {
      title: "登录",
    },
  },
];

export const router = createRouter({
  // process.env.BASE_URL
  history: createWebHashHistory(""),
  routes,
});

// reset router
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !whiteNameList.some((n) => n === name)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

export async function setupRouter(app: App) {
  app.use(router);

  // 路由准备就绪后挂载APP实例
  await router.isReady();
}

export default router;
