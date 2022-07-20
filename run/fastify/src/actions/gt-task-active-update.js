import { cfSecurity } from '@nitra/cf-security'
import { graphQLClient, gql } from '../graphql.js'
import { createLogger } from '@nitra/consola'
const consola = createLogger(import.meta.url)

// Запрос на запись данных без ответственного пользователя
const addTimeLogQuery = gql`
  mutation insert_gt_time_log_one($obj: gt_time_log_insert_input!) {
    insert_gt_time_log_one(object: $obj) {
      id
    }
  }
`

export default async req => {
  try {
    consola.debug('gt-task-active-update')

    if (!cfSecurity(req)) {
      return { error: 'Nitra security not passed' }
    }

    // Destruct POST params
    const { old } = req.body.event.data

    if (!old.task_id) {
      return
    }

    const obj = {
      task_id: old.task_id,
      user_id: old.user_id,
      seconds: Math.ceil((new Date() - new Date(old.time)) / 1000)
    }
    const insData = await graphQLClient.request(addTimeLogQuery, { obj })

    consola.debug(obj, insData)
  } catch (err) {
    consola.error(err)
    return err
  }
}
