import type { App } from "vue";
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