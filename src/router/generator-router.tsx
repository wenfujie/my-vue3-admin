import staticRoutes from './modules';
import { REDIRECT_ROUTE } from './modules/besidesLayout';
import { notFound, errorRoute } from './modules/error';
import outsideLayout from './outsideLayout';
import type { RouteRecordRaw } from 'vue-router';
import router, { routes } from '@/router';

// 需要放在所有路由之后的路由
const endRoutes: RouteRecordRaw[] = [REDIRECT_ROUTE, errorRoute, notFound];

/**
 * 动态生成菜单
 * @param token
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter = () => {
  // TODO: 接受接口菜单数据，处理动态菜单

  try {
    const layout = routes.find((item) => item.name == 'Layout')!;
    // 给公共路由添加namePath
    generatorNamePath(staticRoutes);
    const menus = [...staticRoutes, ...endRoutes];
    layout.children = menus;
    const removeRoute = router.addRoute(layout);
    // 获取所有没有包含children的路由，上面addRoute的时候，vue-router已经帮我们拍平了所有路由
    const filterRoutes = router
      .getRoutes()
      .filter(
        (item) =>
          (!item.children.length || Object.is(item.meta?.hideChildrenInMenu, true)) &&
          !outsideLayout.some((n) => n.name === item.name),
      );
    // 清空所有路由
    removeRoute();
    layout.children = [...filterRoutes];
    // 重新添加拍平后的路由
    router.addRoute(layout);
    console.log('所有路由', router.getRoutes());

    return Promise.resolve({
      menus,
      routes: layout.children,
    });
  } catch (error) {
    console.error('生成路由时出错', error);
    return Promise.reject(`生成路由时出错: ${error}`);
  }
};

/**
 * 主要方便于控制a-menu的open-keys，即控制左侧菜单应当展开哪些菜单
 * @param {RouteRecordRaw[]} routes 需要添加namePath的路由
 * @param {string[]} namePath
 */
export const generatorNamePath = (
  routes: RouteRecordRaw[],
  namePath?: string[],
  parent?: RouteRecordRaw,
) => {
  routes.forEach((item) => {
    if (item.meta && typeof item.name === 'string') {
      item.meta.namePath = Array.isArray(namePath) ? namePath.concat(item.name) : [item.name];
      item.meta.fullPath = parent?.meta?.fullPath
        ? [parent.meta.fullPath, item.path].join('/')
        : item.path;
      // item.meta.fullPath = uniqueSlash(item.meta.fullPath);

      if (item.children?.length) {
        generatorNamePath(item.children, item.meta.namePath, item);
      }
    }
  });
};
