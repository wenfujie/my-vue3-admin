import type { App } from 'vue';
import { IconFont } from '@/components/basic/iconfont';
import { SvgIcon } from '@/components/basic/svg-icon';

/**
 * 全局注册自定义组件
 * @param app
 */
export function setupCustomComponents(app: App) {
  app.component(IconFont.name, IconFont);
  app.component(SvgIcon.name, SvgIcon);
}
