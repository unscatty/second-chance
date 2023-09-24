import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { presetForms } from '@julr/unocss-preset-forms'

export default defineConfig({
  shortcuts: [
    {
      // alert
      info: 'text-blue-700 bg-blue-100 dark:bg-blue-200 dark:text-blue-800',
      success:
        'text-green-700 bg-green-100 dark:bg-green-200 dark:text-green-800',
      failure:
        'text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800',
      warning:
        'text-yellow-700 bg-yellow-100 dark:bg-yellow-200 dark:text-yellow-800',
      'alert-container': 'absolute z-10 top-0 left-1/2 transform -translate-x-1/2 mt-2 max-w-1/2 w-full sm:max-w-1/4',
      'alert-wrapper': 'p-4 rounded-lg font-rajdhani font-semibold text-lg ',
      'alert-icon': 'flex-shrink-0 inline w-6 h-6',
    },
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
    presetForms(),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  safelist: 'prose m-auto text-left info success failure warning'.split(' '),
})
