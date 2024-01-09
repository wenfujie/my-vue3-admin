import type { App } from 'vue';
import 'ant-design-vue/dist/reset.css';
import { Button } from 'ant-design-vue';

export function setupAntd(app: App<Element>) {
  app.component('AButton', Button);
}
