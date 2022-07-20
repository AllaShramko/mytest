import { i18n } from './boot/i18n.js'

const { t } = i18n.global

export const getMenu = () => {
  const menu = [
    {
      icon: 'account_tree',
      title: t('Главная'),
      url: '/'
    },
    {
      icon: 'exit_to_app',
      title: t('Выход'),
      url: '/logout'
    }
  ]

  return menu
}
