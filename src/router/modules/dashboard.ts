import type { RouteRecordRaw } from "vue-router";
import RouterView from "@/layout/routerView/index.vue";

const moduleName = "dashboard";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/dashboard",
    name: moduleName,
    redirect: "/dashboard/welcome",
    component: RouterView,
    meta: {
      title: "主面板",
      icon: "icon-yibiaopan",
    },
    children: [
      {
        path: "welcome",
        name: `${moduleName}-welcome`,
        meta: {
          title: "主面板",
          icon: "icon-shouye",
        },
        component: () =>
          import(
            /* webpackChunkName: "dashboard-welcome" */ "@/views/dashboard/index.vue"
          ),
      },
    ],
  },
];

export default routes;
