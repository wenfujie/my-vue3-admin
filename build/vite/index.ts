import type { Plugin } from 'vite';
import { resolve } from 'node:path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import UnoCSS from 'unocss/vite';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { viteMockServe } from 'vite-plugin-mock';
import checker from 'vite-plugin-checker';

export function createVitePlugins(isBuild: boolean) {
  const CWD = process.cwd();
  const vitePlugins: (Plugin | Plugin[])[] = [
    vue(),
    vueJsx({}),
    UnoCSS(),
    Components({
      //  自动导入目录，例如 "src/components"
      dirs: [],
      dts: 'types/components.d.ts',
      types: [
        {
          from: 'vue-router',
          names: ['RouterLink', 'RouterView'],
        },
      ],
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    }),
    // eslint 代码校验
    checker({
      typescript: true,
      vueTsc: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{.vue,ts,tsx}"', // for example, lint .ts & .tsx
      },
    }),
    createSvgIconsPlugin({
      iconDirs: [resolve(CWD, 'src/assets/icons')],
      symbolId: 'svg-icon-[dir]-[name]',
    }),
    viteMockServe({
      ignore: /^_/,
      mockPath: 'mock',
      localEnabled: !isBuild,
      prodEnabled: isBuild,
      logger: true,
      injectCode: `
        import { setupProdMockServer } from '../mock/_createProductionServer';

        setupProdMockServer();
        `,
    }),
  ];

  if (isBuild) {
    // 构建处理
  }

  return vitePlugins;
}
