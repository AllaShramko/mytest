import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createLogger } from '@nitra/consola'
const consola = createLogger(import.meta.url)

export const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

consola.debug('End Pinia boot')
