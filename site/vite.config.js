import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import { vueI18n } from '@intlify/vite-plugin-vue-i18n'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true,
      template: { transformAssetUrls }
    }),
    vueI18n({
      include: resolve('/src/i18n/**')
    }),
    AutoImport({
      imports: [
        // presets
        'vue',
        'vue-router',
        'quasar',
        'pinia',
        // custom
        {
          'petite-vue-i18n': [
            // named imports
            'useI18n' // import { useI18n } from 'petite-vue-i18n'
          ],
          '@apollo/client/core': [
            // named imports
            'gql' // import { gql } from '@apollo/client/core'
          ],
          '@vue/apollo-composable': [
            // named imports
            'useQuery' // import { useQuery } from '@vue/apollo-composable
          ]
        }
      ]
    }),
    Pages(),
    Layouts(),
    quasar({
      // css: ['src/css/app.scss'],
      sassVariables: 'src/css/quasar-variables.scss'
    })
  ],
  resolve: {
    alias: {
      components: resolve('./src/components'),
      src: resolve('./src')
    }
  },
  build: {
    target: 'esnext',
    chunkSizeWarningLimit: 2000,
    sourcemap: 'hidden'
  },
  define: {
    __GITHUB_SHA__: JSON.stringify(process.env.GITHUB_SHA),
    __SENTRY_DSN__: JSON.stringify('https://ingest.sentry.io/6162886'),
    __HASURA_ROLE__: JSON.stringify('vite'),
    __CONSOLA_LEVEL_DEBUG__: JSON.stringify('true')
  },
  server: {
    proxy: {
      '/otp-email': 'https://dev-run-auth-cqhcc4k3fq-lz.a.run.app',
      '/otp-code': 'https://dev-run-auth-cqhcc4k3fq-lz.a.run.app',
      '/send-login-pass': 'https://dev-run-auth-cqhcc4k3fq-lz.a.run.app'
    }
  }
})
