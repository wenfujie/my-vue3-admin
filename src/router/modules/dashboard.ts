import type { RouteRecordRaw } from "vue-router";
import RouterView from "@/layout/routerView/index.vue";

const moduleName = "dashboard";

const routes: Array<RouteRecordRaw> = [
  {
    path: "dashboard",
    name: `${moduleName}-welcome`,
    meta: {
      title: "首页",
      icon: "icon-shouye",
    },
    component: () =>
      import(
        /* webpackChunkName: "dashboard-welcome" */ "@/views/dashboard/index.vue"
      ),
  },
];

export default routes;
