import type { Plugin } from "vite";
import { resolve } from "node:path";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import UnoCSS from "unocss/vite";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

export function createVitePlugins(isBuild: boolean) {
  const CWD = process.cwd();
  const vitePlugins: (Plugin | Plugin[])[] = [
    vue(),
    vueJsx({}),
    UnoCSS(),
    Components({
      dirs: ["src/components"],
      dts: "types/components.d.ts",
      types: [
        {
          from: "vue-router",
          names: ["RouterLink", "RouterView"],
        },
      ],
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    }),
    createSvgIconsPlugin({
      iconDirs: [resolve(CWD, "src/assets/icons")],
      symbolId: "svg-icon-[dir]-[name]",
    }),
  ];

  if (isBuild) {
    // 构建处理
  }

  return vitePlugins;
}
