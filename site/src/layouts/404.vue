<template>
  <div
    class="fullscreen bg-primary text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div style="font-size: 25vh">404</div>

      <div class="text-h5" style="opacity: 0.4">
        {{ t('Не найдена страница по данному адресу') }}
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="primary"
        unelevated
        @click="router.back()"
        :label="t('Вернуться назад')"
        no-caps
      />
    </div>
  </div>
</template>

<script setup>
import { mt } from '../njs/boot/i18n.js'
const router = useRouter()

const messages = mt({
  'Не найдена страница по данному адресу':
    'Не знайдена сторінка за цією адресою',
  'Вернуться назад': 'Повернутися назад'
})

const { t } = useI18n({ messages })
</script>
