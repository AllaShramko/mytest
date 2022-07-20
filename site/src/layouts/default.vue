<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated class="bg-grey-2 text-primary">
      <q-toolbar class="q-px-none">
        <q-btn @click="leftDrawerOpen = !leftDrawerOpen" icon="menu" color="secondary" stretch flat />

        <img src="/logo.png" style="max-height: 25px" />

        <q-separator vertical />

        <!-- языки -->
        <q-btn
          stretch
          :color="locale === 'ru' ? 'secondary' : 'primary'"
          label="RU"
          no-caps
          @click="setLang('ru')"
          flat />
        <q-btn
          stretch
          :color="locale === 'uk' ? 'secondary' : 'primary'"
          label="UA"
          no-caps
          @click="setLang('uk')"
          flat />
        <q-separator vertical />

        <!-- нотификации -->
        <q-btn stretch flat icon="notifications" />
        <!-- домой -->
        <q-btn stretch flat icon="home" />
        <!-- выход -->
        <q-btn stretch flat no-caps icon-right="exit_to_app" color="secondary" @click="router.push('/logout')" />
      </q-toolbar>
    </q-header>

    <!-- ЛЕВАЯ КОЛОНКА -->
    <q-drawer v-model="leftDrawerOpen" content-class="column" class="shadow-2">
      <q-list separator bordered class="n-menu">
        <!-- меню -->
        <n-side-menu :menu="menu" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { apolloClient } from '@nitra/vite-boot/apollo'
import { getMenu } from '../njs/menu.js'
import { provideApolloClient } from '@vue/apollo-composable'
import { useI18n } from 'petite-vue-i18n'
import { mt, updGlobalLocale } from '../njs/boot/i18n.js'
import NSideMenu from '../components/NSideMenu.vue'

provideApolloClient(apolloClient) // apollo
const router = useRouter()

const leftDrawerOpen = ref(false) // левая колонка
let menu = $ref([])

const messages = mt({
  Главная: 'Головна',
  Выход: 'Вийти'
})

const { locale } = useI18n({
  useScope: 'global',
  messages
})

// Блокируем загрузку шаблона
onBeforeMount(() => {
  menu = getMenu()

  // // загружаем данные по пользователю
  // await bootUser()
})

// Зміна мови
const setLang = async lang => {
  updGlobalLocale(lang)

  menu = getMenu()
}
</script>

<style lang="scss">
.n-menu {
  .q-item > .q-item__section--side {
    width: 35px;
    min-width: 35px;
  }
}
</style>
