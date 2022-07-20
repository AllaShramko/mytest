import { createI18n } from 'petite-vue-i18n'
import { persistStore } from '../../stores/persist.js'
import { createLogger } from '@nitra/consola'
const consola = createLogger(import.meta.url)

export const i18n = createI18n({
  locale: 'ru',
  fallbackLocale: 'ru',
  legacy: false
})

/**
 * Переводимо з варіанту:
 * { "индекс": "індекс" }
 * в
 * {
 *  "ru": { "индекс": "индекс" },
 *  "uk": { "индекс": "індекс" }
 * }
 *
 * @param {Object} uk
 * @returns {Object}
 */
export const mt = uk => {
  const ukP = { uk: uk }

  ukP.ru = Object.assign({}, ...Object.keys(uk).map(key => ({ [key]: key })))

  return ukP
}

export const updGlobalLocale = lang => {
  const persist = persistStore()
  if (lang) {
    persist.locale = lang
  }
  i18n.global.locale.value = persist.locale
}

consola.debug('End i18n boot')
