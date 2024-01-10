import type { App } from "vue";
import { setupCustomComponents, setupGlobalMethods } from "./plugins";
// vite-plugin-svg-icons 依赖
import "virtual:svg-icons-register";
// unocss 依赖
import "uno.css";
// ant-design-vue 依赖
import "ant-design-vue/dist/reset.css";

export function setupPlugins(app: App) {
  // 全局自定义组件
  setupCustomComponents(app);

  // 全局方法
  setupGlobalMethods(app);
}
