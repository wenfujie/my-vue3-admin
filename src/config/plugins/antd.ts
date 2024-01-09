import type { App } from 'vue';
import 'ant-design-vue/dist/reset.css';
import { Button, Input } from 'ant-design-vue';

export function setupAntd(app: App<Element>) {
  app.component('AButton', Button);
  app.component('AInput', Input);
}
