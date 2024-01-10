import { createApp } from "vue";
import App from "./App.vue";
import { setupPlugins } from "@/config/setupApp";
import { setupStore } from "@/store";
import { setupRouter } from "./router";
import "@/styles/index.less";

const app = createApp(App);

setupPlugins(app);

setupStore(app);

await setupRouter(app);

app.mount("#app");
