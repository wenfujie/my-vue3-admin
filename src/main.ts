import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { setupPlugins, setupApp } from './config/initApp';

const app = createApp(App);

setupPlugins(app)
setupApp(app)

app.mount('#app');
