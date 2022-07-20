// import routes from '~pages'
import { createRouter, createWebHistory } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'

const routes = setupLayouts(generatedRoutes)

// Шлях за умовчанням
// routes.push({ path: '', redirect: '/task' })

// Функція виходу
routes.push({
  path: '/logout',
  redirect: () => {
    localStorage.removeItem('token')
    return '/login'
  }
})

// Make sure to _use_ the router instance to make the
// whole app router-aware.
export const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes
})

async function canUserAccess(to) {
  // Якщо 404 то дозволяємо завжди
  if (to.meta?.layout === 404 || to.meta?.layout === 'blank') {
    return true
  }

  // Якщо э токен
  const token = localStorage.getItem('token')
  return !!token
}

router.beforeEach(async (to, from) => {
  // canUserAccess() returns `true` or `false`
  const canAccess = await canUserAccess(to)
  if (!canAccess) {
    return '/login'
  }
})
