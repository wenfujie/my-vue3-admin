import { createApp } from 'vue';
import App from './App.vue';
import { setupRouter } from './router';
import { setupPlugins } from '@/plugins';
import { setupStore } from '@/store';
import '@/styles/index.less';

const app = createApp(App);

setupPlugins(app);

setupStore(app);

await setupRouter(app);

app.mount('#app');
