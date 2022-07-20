import fastify from 'fastify'
import fastifySensible from 'fastify-sensible'
import fastifyFormbody from 'fastify-formbody'
import qs from 'qs'
import { isDev, isProd } from '@nitra/isenv'

import consola from '@nitra/consola'
import checkEnv from '@47ng/check-env'
import github from './actions/github.js'
import bitrix from './actions/bitrix.js'
import sentry from './actions/sentry.js'
import gtTaskActiveUpdate from './actions/gt-task-active-update.js'

checkEnv.default({
  required: ['QL', 'X_HASURA_ADMIN_SECRET']
})

consola.debug(`START ${import.meta.url} in DEBUG MODE`)

const PORT = Number(process.env.PORT) || 8080

const app = fastify({
  logger: isDev,
  http2: isProd
})
app.register(fastifySensible)
// Для Bitrix
app.register(fastifyFormbody, { parser: str => qs.parse(str) })

// Обрабатываем только POST
app.post('/*', async (req, reply) => {
  consola.debug('req.url: ', req.url)

  let resp = {}

  try {
    switch (req.url) {
      // case '/only-log': {
      //   // Для перегляду що в запиті
      //   console.log(req.body)
      //   break
      // }
      case '/github': {
        // На гітхаб змінилась задача
        resp = await github(req)
        break
      }
      case '/bitrix': {
        // В bitrix змінилась задача
        resp = await bitrix(req.body)
        break
      }
      case '/sentry': {
        // В sentry змінилась задача
        resp = await sentry(req)
        break
      }
      case '/gt-task-active-update': {
        // Змінився активний час по користувачу
        resp = await gtTaskActiveUpdate(req)
        break
      }
      default: {
        resp.error = `Not found url: ${req.url} ...`
        return
      }
    }
  } catch (err) {
    req.log.error(err)
    resp.error = err
    consola.error(err)
  } finally {
    reply.send(resp)
  }
})

// Запускаем сервер
app.listen(PORT, '0.0.0.0')
