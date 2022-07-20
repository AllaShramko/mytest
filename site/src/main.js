import { createApp } from 'vue'
import { Quasar } from 'quasar'
import quasarLang from 'quasar/lang/ru'
import { isProd } from '@nitra/isenv'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'
// import 'css/app.scss'

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from './App.vue'

import { i18n, updGlobalLocale } from './njs/boot/i18n.js'
import { router } from './njs/boot/router.js'
import { pinia } from './njs/boot/pinia.js'
import { bootSentry } from '@nitra/vite-boot/sentry'

const myApp = createApp(App)

myApp.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
  lang: quasarLang
  /*
  config: {
    brand: {
      // primary: '#e46262',
      // ... or all other brand colors
    },
    notify: {...}, // default set of options for Notify Quasar plugin
    loading: {...}, // default set of options for Loading Quasar plugin
    loadingBar: { ... }, // settings for LoadingBar Quasar plugin
    // ..and many more (check Installation card on each Quasar component/directive/plugin)
  }
  */
})
if (isProd) {
  bootSentry(myApp, router)
}

myApp.use(router)

myApp.use(pinia)

myApp.use(i18n)
updGlobalLocale()

// Assumes you have a <div id="app"></div> in your index.html
myApp.mount('#app')
