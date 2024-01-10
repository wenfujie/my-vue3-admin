import type { RouteRecordRaw } from "vue-router";
import RouterView from "@/layout/routerView/index.vue";

const moduleName = "demos";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/demos",
    name: moduleName,
    redirect: { name: `${moduleName}-custom-modal` },
    component: RouterView,
    meta: {
      title: "demo演示",
      icon: "icon-zhuomian",
    },
    children: [
      {
        path: "form",
        name: `${moduleName}-form`,
        meta: {
          title: "表单演示",
          icon: "icon-zhuomian",
          keepAlive: true,
        },
        redirect: { name: `${moduleName}-form-basic` },
        component: RouterView,
        children: [
          {
            path: "basic",
            name: `${moduleName}-form-basic`,
            meta: {
              title: "基础表单",
              icon: "icon-zhuomian",
              keepAlive: true,
            },
            component: () =>
              import(
                /* webpackChunkName: "basic-form" */ "@/views/demos/form/basic-form/index.vue"
              ),
          },
          // {
          //   path: 'rule',
          //   name: `${moduleName}-form-rule`,
          //   meta: {
          //     title: t('routes.demo.form.rule'),
          //     icon: 'icon-zhuomian',
          //     keepAlive: true,
          //   },
          //   component: () => import('@/views/demos/form/rule-form/index.vue'),
          // },
          // {
          //   path: 'dynamic',
          //   name: `${moduleName}-form-dynamic`,
          //   meta: {
          //     title: t('routes.demo.form.dynamic'),
          //     icon: 'icon-zhuomian',
          //     keepAlive: true,
          //   },
          //   component: () => import('@/views/demos/form/dynamic-form/index.vue'),
          // },
          // {
          //   path: 'useForm',
          //   name: `${moduleName}-form-use`,
          //   meta: {
          //     title: 'useForm',
          //     icon: 'icon-zhuomian',
          //     keepAlive: true,
          //   },
          //   component: () => import('@/views/demos/form/use-form/index.vue'),
          // },
          // {
          //   path: 'custom-form',
          //   name: `${moduleName}-form-custom`,
          //   meta: {
          //     title: t('routes.demo.form.customForm'),
          //     icon: 'icon-zhuomian',
          //     keepAlive: true,
          //   },
          //   component: () => import('@/views/demos/form/custom-form/index.vue'),
          // },
          // {
          //   path: 'request-form',
          //   name: `${moduleName}-form-request`,
          //   meta: {
          //     title: '自定义请求表单',
          //     icon: 'icon-zhuomian',
          //     keepAlive: true,
          //   },
          //   component: () => import('@/views/demos/form/request-form/index.vue'),
          // },
        ],
      },
    ],
  },
];

export default routes;
