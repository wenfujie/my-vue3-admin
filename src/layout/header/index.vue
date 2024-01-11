<template>
  <Layout.Header :style="headerStyle" class="layout-header">
    <Space :size="20">
      <slot>
        <Space :size="20">
          <span class="menu-fold" @click="() => emit('update:collapsed', !collapsed)">
            <component :is="collapsed ? MenuUnfoldOutlined : MenuFoldOutlined" />
          </span>
          <Breadcrumb>
            <template v-for="(routeItem, rotueIndex) in menus" :key="routeItem?.name">
              <Breadcrumb.Item>
                <span>{{ routeItem?.meta?.title }}</span>
                <template v-if="routeItem?.children?.length" #overlay>
                  <Menu :selected-keys="getSelectKeys(rotueIndex)">
                    <template v-for="childItem in routeItem?.children" :key="childItem.name">
                      <Menu.Item
                        v-if="!childItem.meta?.hideInMenu && !childItem.meta?.hideInBreadcrumb"
                        :key="childItem.name"
                        @click="clickMenuItem(childItem)"
                      >
                        <span>{{ childItem.meta?.title }}</span>
                      </Menu.Item>
                    </template>
                  </Menu>
                </template>
              </Breadcrumb.Item>
            </template>
          </Breadcrumb>
        </Space>
      </slot>
    </Space>
    <Space :size="20">
      <Search />
      <FullScreen />
      <Dropdown placement="bottomRight">
        <Avatar :src="userInfo.headImg" :alt="userInfo.name">{{ userInfo.name }}</Avatar>
        <template #overlay>
          <Menu>
            <Menu.Item>
              <div @click.prevent="doLogout">
                <poweroff-outlined />
                退出系统
              </div>
            </Menu.Item>
          </Menu>
        </template>
      </Dropdown>
      <ProjectSetting />
    </Space>
  </Layout.Header>
</template>

<script lang="tsx" setup>
  import { computed, nextTick, type CSSProperties } from 'vue';
  import { useRouter, useRoute, type RouteRecordRaw } from 'vue-router';
  import {
    QuestionCircleOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PoweroffOutlined,
    LockOutlined,
  } from '@ant-design/icons-vue';
  import {
    Layout,
    message,
    Modal,
    Dropdown,
    Menu,
    Space,
    Breadcrumb,
    Avatar,
    type MenuTheme,
  } from 'ant-design-vue';
  import { Search, FullScreen, ProjectSetting } from './components/';
  import { useUserStore } from '@/store/modules/user';
  import { useKeepAliveStore } from '@/store/modules/keepAlive';
  import { LOGIN_NAME } from '@/router/constant';
  import { useLayoutSettingStore } from '@/store/modules/layoutSetting';

  defineProps({
    collapsed: {
      type: Boolean,
    },
    theme: {
      type: String as PropType<MenuTheme>,
    },
  });
  const emit = defineEmits(['update:collapsed']);
  const userStore = useUserStore();
  const layoutSettingStore = useLayoutSettingStore();
  const keepAliveStore = useKeepAliveStore();

  const router = useRouter();
  const route = useRoute();
  const userInfo = computed(() => userStore.userInfo);
  const headerStyle = computed<CSSProperties>(() => {
    const { navTheme, layout } = layoutSettingStore.layoutSetting;
    const isDark = navTheme === 'dark' && layout === 'topmenu';
    return {
      backgroundColor: navTheme === 'realDark' || isDark ? '' : 'rgba(255, 255, 255, 0.85)',
      color: isDark ? 'rgba(255, 255, 255, 0.85)' : '',
    };
  });

  const menus = computed(() => {
    if (route.meta?.namePath) {
      let children = userStore.menus;
      const paths = route.meta?.namePath?.map((item) => {
        const a = children.find((n) => n.name === item);
        children = a?.children || [];
        return a;
      });
      return [
        {
          name: '__index',
          meta: {
            title: '首页',
          },
          children: userStore.menus,
        },
        ...paths,
      ];
    }
    return route.matched;
  });

  const getSelectKeys = (rotueIndex: number) => {
    return [menus.value[rotueIndex + 1]?.name] as string[];
  };

  const findLastChild = (route?: RouteRecordRaw) => {
    if (typeof route?.redirect === 'object') {
      const redirectValues = Object.values(route.redirect);
      if (route?.children?.length) {
        const target = route.children.find((n) =>
          redirectValues.some((m) => [n.name, n.path, n.meta?.fullPath].some((v) => v === m)),
        );
        return findLastChild(target);
      }
      return redirectValues.find((n) => typeof n === 'string');
    } else if (typeof route?.redirect === 'string') {
      if (route?.children?.length) {
        const target = route.children.find((n) =>
          [n.name, n.path, n.meta?.fullPath].some((m) => m === route?.redirect),
        );
        return findLastChild(target);
      }
      return route?.redirect;
    }
    return route;
  };
  const getRouteByName = (name: string) => router.getRoutes().find((n) => n.name === name);

  // 点击菜单
  const clickMenuItem = (menuItem: RouteRecordRaw) => {
    const lastChild = findLastChild(menuItem);
    console.log('lastChild', menuItem, lastChild);

    const targetRoute = getRouteByName(lastChild?.name);
    const { isExt, openMode } = targetRoute?.meta || {};
    if (isExt && openMode !== 2) {
      window.open(lastChild?.name);
    } else {
      router.push({ name: lastChild?.name });
    }
  };

  // 退出登录
  const doLogout = () => {
    Modal.confirm({
      title: '您确定要退出登录吗？',
      icon: <QuestionCircleOutlined />,
      centered: true,
      onOk: async () => {
        await userStore.logout();
        keepAliveStore.clear();
        // 移除标签页
        localStorage.clear();
        message.success('成功退出登录');
        await nextTick();
        router.replace({
          name: LOGIN_NAME,
          query: {
            redirect: route.fullPath,
          },
        });
      },
    });
  };
</script>

<style lang="less" scoped>
  .layout-header {
    display: flex;
    position: sticky;
    z-index: 10;
    top: 0;
    align-items: center;
    justify-content: space-between;
    height: @header-height;
    padding: 0 20px;

    * {
      cursor: pointer;
    }
  }
</style>
./components
