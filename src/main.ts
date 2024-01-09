import { createApp } from "vue";
import App from "./App.vue";
import { setupPlugins } from "@/config/initApp";
import { setupStore } from "@/store";
import { setupRouter } from "./router";

const app = createApp(App);

setupPlugins(app);

setupStore(app);

await setupRouter(app);

app.mount("#app");
