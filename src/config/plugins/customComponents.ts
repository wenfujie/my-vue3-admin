import type { App } from "vue";

import { IconFont } from "@/components/basic/iconfont";

/**
 * 全局注册自定义组件
 * @param app
 */
export function setupCustomComponents(app: App) {
  app.component(IconFont.name, IconFont);
}
