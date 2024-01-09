import { resolve } from "node:path";
import vue from "@vitejs/plugin-vue";
import type { UserConfig, ConfigEnv } from "vite";
import { loadEnv } from "vite";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import UnoCSS from "unocss/vite";

const CWD = process.cwd();

export default ({ command, mode }: ConfigEnv): UserConfig => {
  // 环境变量
  const { VITE_BASE_URL } = loadEnv(mode, CWD);

  const isBuild = command === "build";

  return {
    base: VITE_BASE_URL,
    server: {
      host: "0.0.0.0",
      port: 5173,
      proxy: {
        "/api": {
          // target: 'https://nest-api.buqiyuan.site/api/',
          target: "http://localhost:3000",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {},
          additionalData: `
            @primary-color: #00b96b; 
            @header-height: 60px; 
          `,
        },
      },
    },
    resolve: {
      alias: [
        {
          find: "@",
          replacement: resolve(__dirname, "./src"),
        },
      ],
    },
    plugins: [
      vue(),
      vueJsx({}),
      UnoCSS(),
      Components({
        dirs: ["src/components"],
        dts: "types/components.d.ts",
        types: [
          {
            from: "./src/components/basic/button/",
            names: ["AButton"],
          },
          {
            from: "vue-router",
            names: ["RouterLink", "RouterView"],
          },
        ],
        resolvers: [
          AntDesignVueResolver({
            importStyle: false, // css in js
            exclude: ["Button"],
          }),
        ],
      }),
      createSvgIconsPlugin({
        iconDirs: [resolve(CWD, "src/assets/icons")],
        symbolId: "svg-icon-[dir]-[name]",
      }),
    ],
    build: {
      target: "es2017",
      minify: "esbuild",
      cssTarget: "chrome79",
      chunkSizeWarningLimit: 2000,
    },
  };
};
