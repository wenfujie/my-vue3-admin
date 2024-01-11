import { createApp } from "vue";
import App from "./App.vue";
import { setupPlugins } from "@/plugins";
import { setupStore } from "@/store";
import { setupRouter } from "./router";
import "@/styles/index.less";

const app = createApp(App);

setupPlugins(app);

setupStore(app);

await setupRouter(app);

app.mount("#app");
