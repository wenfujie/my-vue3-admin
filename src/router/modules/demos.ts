import type { RouteRecordRaw } from 'vue-router';
import RouterView from '@/layout/routerView/index.vue';

const moduleName = 'demos';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/demos',
    name: moduleName,
    redirect: { name: `${moduleName}-custom-modal` },
    component: RouterView,
    meta: {
      title: '组件demo演示',
      icon: 'icon-yibiaopan',
    },
    children: [
      {
        path: 'form',
        name: `${moduleName}-form`,
        meta: {
          title: '表单演示',
          icon: 'icon-icon_shiyongwendang',
          keepAlive: true,
        },
        redirect: { name: `${moduleName}-form-basic` },
        component: RouterView,
        children: [
          {
            path: 'basic',
            name: `${moduleName}-form-basic`,
            meta: {
              title: '基础表单',
              icon: 'icon-zhuomian',
              keepAlive: true,
            },
            component: () =>
              import(
                /* webpackChunkName: "basic-form" */ '@/views/demos/form/basic-form/index.vue'
              ),
          },
          {
            path: 'rule',
            name: `${moduleName}-form-rule`,
            meta: {
              title: '表单校验',
              icon: 'icon-zhuomian',
              keepAlive: true,
            },
            component: () =>
              import(/* webpackChunkName: "rule-form" */ '@/views/demos/form/rule-form/index.vue'),
          },
          {
            path: 'dynamic',
            name: `${moduleName}-form-dynamic`,
            meta: {
              title: '动态表单',
              icon: 'icon-zhuomian',
              keepAlive: true,
            },
            component: () => import('@/views/demos/form/dynamic-form/index.vue'),
          },
          {
            path: 'useForm',
            name: `${moduleName}-form-use`,
            meta: {
              title: 'useForm',
              icon: 'icon-zhuomian',
              keepAlive: true,
            },
            component: () => import('@/views/demos/form/use-form/index.vue'),
          },
          {
            path: 'custom-form',
            name: `${moduleName}-form-custom`,
            meta: {
              title: '自定义表单组件',
              icon: 'icon-zhuomian',
              keepAlive: true,
            },
            component: () => import('@/views/demos/form/custom-form/index.vue'),
          },
          {
            path: 'request-form',
            name: `${moduleName}-form-request`,
            meta: {
              title: '自定义请求表单',
              icon: 'icon-zhuomian',
              keepAlive: true,
            },
            component: () => import('@/views/demos/form/request-form/index.vue'),
          },
        ],
      },
      {
        path: 'table',
        name: `${moduleName}-table`,
        meta: {
          title: '表格演示',
          icon: 'icon-biaoge',
          keepAlive: true,
        },
        redirect: { name: `${moduleName}-table-lol` },
        component: RouterView,
        children: [
          {
            path: 'search-table',
            name: `${moduleName}-query-form`,
            meta: {
              title: '查询表格',
              icon: 'icon-zhuomian',
              keepAlive: false,
            },
            component: () =>
              import(
                /* webpackChunkName: "search-table" */ '@/views/demos/tables/search-table/index.vue'
              ),
          },
          {
            path: 'lol',
            name: `${moduleName}-table-lol`,
            meta: {
              title: '英雄联盟',
              icon: 'icon-zhuomian',
              keepAlive: true,
            },
            component: () =>
              import(
                /* webpackChunkName: "lol-table" */ '@/views/demos/tables/lol-table/index.vue'
              ),
          },
          {
            path: 'lol/:id',
            name: `${moduleName}-table-lol-info`,
            meta: {
              title: '英雄详情',
              icon: 'icon-zhuomian',
              hideInMenu: true,
              keepAlive: true,
              activeMenu: `${moduleName}-table-lol`,
            },
            component: () =>
              import(
                /* webpackChunkName: "lol-info-table" */ '@/views/demos/tables/lol-table/heroInfo.vue'
              ),
          },
          {
            path: 'edit-row-table',
            name: `${moduleName}-edit-row-table`,
            meta: {
              title: '可编辑行',
              icon: 'icon-zhuomian',
              keepAlive: false,
            },
            component: () =>
              import(
                /* webpackChunkName: "edit-row-table" */ '@/views/demos/tables/edit-row-table/index.vue'
              ),
          },
        ],
      },
      {
        path: 'icons',
        name: `${moduleName}-icons`,
        meta: {
          title: '自定义图标',
          icon: 'icon-zhuomian',
          keepAlive: true,
        },
        component: () =>
          import(/* webpackChunkName: "demos-button" */ '@/views/demos/icons/Iconfont.vue'),
      },
      {
        path: 'custom-modal',
        name: `${moduleName}-custom-modal`,
        meta: {
          title: '可拖拽弹窗',
          icon: 'icon-zhuomian',
          keepAlive: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "demos-custom-a-custom-modal" */ '@/views/demos/custom-modal.vue'
          ),
      },
      {
        path: 'nested-routes',
        name: `${moduleName}-nested-routes`,
        redirect: { name: `${moduleName}-nested-routes-one` },
        meta: {
          title: '嵌套路由',
          icon: 'icon-zhuomian',
          keepAlive: true,
          hideChildrenInMenu: true,
          transitionName: false,
        },
        component: () =>
          import(/* webpackChunkName: "nested-routes" */ '@/views/demos/nested-routes/index.vue'),
        children: [
          {
            path: 'route-one',
            name: `${moduleName}-nested-routes-one`,
            meta: {
              title: '路由一',
              icon: 'icon-zhuomian',
              hideInMenu: true,
              activeMenu: `${moduleName}-nested-routes`,
            },
            component: () => import('@/views/demos/nested-routes/route-one.vue'),
          },
          {
            path: 'route-two',
            name: `${moduleName}-nested-routes-two`,
            meta: {
              title: '路由二',
              icon: 'icon-zhuomian',
              hideInMenu: true,
              activeMenu: `${moduleName}-nested-routes`,
            },
            component: () => import('@/views/demos/nested-routes/route-two.vue'),
          },
          {
            path: 'route-three',
            name: `${moduleName}-nested-routes-three`,
            meta: {
              title: '路由三',
              icon: 'icon-zhuomian',
              hideInMenu: true,
              activeMenu: `${moduleName}-nested-routes`,
            },
            component: () => import('@/views/demos/nested-routes/route-three.vue'),
          },
        ],
      },
    ],
  },
];

export default routes;
