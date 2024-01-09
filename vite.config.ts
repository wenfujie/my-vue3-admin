import { resolve } from 'node:path';
import vue from '@vitejs/plugin-vue'
import type { UserConfig, ConfigEnv } from 'vite';
import { loadEnv } from 'vite';

const CWD = process.cwd();

export default ({ command, mode }: ConfigEnv): UserConfig => {
  // 环境变量
  const { VITE_BASE_URL } = loadEnv(mode, CWD);

  const isBuild = command === 'build';

  return {
    base: VITE_BASE_URL,
    server: {
      host: '0.0.0.0',
      port: 5173,
      proxy: {
        '/api': {
          // target: 'https://nest-api.buqiyuan.site/api/',
          target: 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, './src'),
        },
      ],
    },
    plugins: [
      vue(),
    ],
    build: {
      target: 'es2017',
      minify: 'esbuild',
      cssTarget: 'chrome79',
      chunkSizeWarningLimit: 2000,
    },
  };
};