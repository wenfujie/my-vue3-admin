import type { App } from "vue";
// vite-plugin-svg-icons 依赖
import "virtual:svg-icons-register";
// unocss 依赖
import "uno.css";
// ant-design-vue 依赖
import "ant-design-vue/dist/reset.css";
import { setupCustomComponents } from "./customComponents";
import { setupGlobalMethods } from "./globalMethods";

export function setupPlugins(app: App) {
  // 全局自定义组件
  setupCustomComponents(app);

  // 全局方法
  setupGlobalMethods(app);
}
