import { App } from "vue";
import { setupAntd } from "./plugins/antd";

export function setupPlugins(app: App) {
  // 注册全局常用的ant-design-vue组件
  setupAntd(app);
  // 引入静态资源
  // setupAssets();
  // 注册全局自定义组件,如：<svg-icon />
  // setupCustomComponents(app);
  // 注册全局自定义指令，如：v-permission权限指令
  // setupDirectives(app);
  // 注册全局方法，如：app.config.globalProperties.$message = message
  // setupGlobalMethods(app);
}

export async function setupApp(app: App) {
  // 挂载vuex状态管理
  // setupStore(app);
  // Multilingual configuration
  // Asynchronous case: language files may be obtained from the server side
  // await setupI18n(app);
  // 挂载路由
  // await setupRouter(app);
}
