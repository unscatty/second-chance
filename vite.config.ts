import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import generateSitemap from 'vite-ssg-sitemap'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Markdown from 'unplugin-vue-markdown/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import { VitePWA } from 'vite-plugin-pwa'
import VueDevTools from 'vite-plugin-vue-devtools'
import LinkAttributes from 'markdown-it-link-attributes'
import Unocss from 'unocss/vite'
import Shiki from 'markdown-it-shiki'
import WebfontDownload from 'vite-plugin-webfont-dl'
import { HeadlessUiResolver } from 'unplugin-vue-components/resolvers'
import { transformShortVmodel } from '@vue-macros/short-vmodel'

export default defineConfig(({ command, mode }) => {
  let base = '/'

  if (command === 'build' && mode === 'gh-pages') {
    const env = loadEnv(mode, process.cwd())
    base = env.VITE_REPO_NAME

    console.log(`Base url is ${base}`)
  }

  return {
    base,
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
      },
    },

    plugins: [
      VueMacros({
        plugins: {
          vue: Vue({
            include: [/\.vue$/, /\.md$/],
            script: {
              defineModel: true,
              propsDestructure: true,
            },
            template: {
              compilerOptions: {
                nodeTransforms: [
                  transformShortVmodel({
                    prefix: '$',
                  }),
                ],
              },
            },
          }),
        },
      }),

      // https://github.com/hannoeru/vite-plugin-pages
      Pages({
        extensions: ['vue', 'md'],
      }),

      // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
      Layouts(),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'vue-i18n',
          '@vueuse/head',
          '@vueuse/core',
          'pinia',
        ],
        dts: 'src/auto-imports.d.ts',
        dirs: ['src/composables', 'src/stores'],
        vueTemplate: true,
        eslintrc: {
          enabled: true, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
      }),

      // https://github.com/antfu/unplugin-vue-components
      Components({
        // AutoImport HeadlessUI components
        resolvers: [HeadlessUiResolver()],
        // allow auto load markdown components under `./src/components/`
        extensions: ['vue', 'md'],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: 'src/components.d.ts',
      }),

      // https://github.com/antfu/unocss
      // see uno.config.ts for config
      Unocss(),

      // https://github.com/unplugin/unplugin-vue-markdown
      // Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite
      Markdown({
        wrapperClasses: 'prose prose-sm m-auto text-left',
        headEnabled: true,
        markdownItSetup(md) {
          // https://prismjs.com/
          md.use(Shiki, {
            theme: {
              light: 'vitesse-light',
              dark: 'vitesse-dark',
            },
          })
          md.use(LinkAttributes, {
            matcher: (link: string) => /^https?:\/\//.test(link),
            attrs: {
              target: '_blank',
              rel: 'noopener',
            },
          })
        },
      }),

      // https://github.com/antfu/vite-plugin-pwa
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'safari-pinned-tab.svg'],
        manifest: {
          name: 'Second Chance',
          short_name: 'Second Chance',
          theme_color: '#ffffff',
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            },
          ],
        },
      }),

      // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
      VueI18n({
        runtimeOnly: true,
        compositionOnly: true,
        fullInstall: true,
        include: [path.resolve(__dirname, 'locales/**')],
      }),

      // https://github.com/feat-agency/vite-plugin-webfont-dl
      WebfontDownload(),

      // https://github.com/webfansplz/vite-plugin-vue-devtools
      VueDevTools(),
    ],

    // https://github.com/vitest-dev/vitest
    test: {
      include: ['test/**/*.test.ts'],
      environment: 'jsdom',
      deps: {
        inline: ['@vue', '@vueuse', 'vue-demi'],
      },
    },

    // https://github.com/antfu/vite-ssg
    ssgOptions: {
      script: 'async',
      formatting: 'minify',
      crittersOptions: {
        reduceInlineStyles: false,
      },
      onFinished() {
        generateSitemap()
      },
    },

    ssr: {
      // TODO: workaround until they support native ESM
      noExternal: ['workbox-window', /vue-i18n/],
    },
  }
})
