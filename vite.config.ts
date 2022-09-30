import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import copy from 'rollup-plugin-copy'
import { terser } from 'rollup-plugin-terser'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig, loadEnv } from 'vite'
import viteCompression from 'vite-plugin-compression'
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
  react(),
  copy({
    targets: [
      { src: 'src/manifest.json', dest: 'dist' },
      { src: 'src/assets', dest: 'dist' },
    ],
    hook: 'writeBundle',
  }),
  // viteCompression({
  //   verbose: true,
  //   disable: false,
  //   threshold: 10240,
  //   algorithm: 'gzip',
  //   ext: '.gz',
  // }),
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
      terser({
        compress: {
          defaults: false,
          // drop_console: true,
        },
        mangle: {
          eval: true,
          module: true,
          toplevel: true,
          safari10: true,
          properties: false,
        },
        output: {
          comments: false,
        },
      }),
      visualizer(),
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
        },
      },
    },
  }
})
