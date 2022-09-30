import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import copy from 'rollup-plugin-copy'
import { defineConfig, loadEnv } from 'vite'
import vitePluginImp from 'vite-plugin-imp'
import styleImport from 'vite-plugin-style-import'

const plugins = [
  // styleImport({
  //   libs: [
  //     {
  //       libraryName: 'antd',
  //       esModule: true,
  //       resolveStyle: (name) => `antd/es/${name}/style/css`,
  //     },
  //   ],
  // }),
  vitePluginImp({
    libList: [
      {
        libName: 'antd',
        style: (name) => `antd/es/${name}/style`,
      },
    ],
  }),
  react(),
  copy({
    targets: [
      { src: 'src/manifest.json', dest: 'dist' },
      { src: 'src/assets', dest: 'dist' },
    ],
    hook: 'writeBundle',
  }),
]
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  if (env.need_build) {
    plugins.push(
      vitePluginImp({
        libList: [
          {
            libName: 'antd',
            style: (name) => `antd/es/${name}/style`,
          },
        ],
      }),
    )
  }
  return {
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    plugins,
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {
            // 在这里自定义主题色等样式
            '@primary-color': '#9013fe', //设置antd主题色
          },
        },
      },
      modules: {
        localsConvention: 'camelCase',
      },
    },
    build: {
      rollupOptions: {
        input: ['index.html', 'src/background.ts', 'src/contentScript.ts'],
        output: {
          chunkFileNames: '[name].[hash].js',
          assetFileNames: '[name].[hash].[ext]',
          entryFileNames: '[name].js',
          dir: 'dist',
        },
      },
    },
  }
})
