import { defineStore } from 'pinia'

// Мовне налаштування браузеру користувача
let defaultLocale = navigator.language.split('-')[0]
// Якщо э перевага ru чи uk
defaultLocale = ['ru', 'uk'].includes(defaultLocale) ? defaultLocale : 'ru'

export const persistStore = defineStore('persist', {
  state: () => {
    return {
      locale: defaultLocale
    }
  },
  persist: true
})
