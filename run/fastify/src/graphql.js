import checkEnv from '@47ng/check-env'
import { GraphQLClient } from 'graphql-request'
export { gql } from 'graphql-request'

checkEnv.default({
  required: ['QL', 'X_HASURA_ADMIN_SECRET']
})

export const graphQLClient = new GraphQLClient(process.env.QL, {
  headers: {
    'X-Hasura-Admin-Secret': process.env.X_HASURA_ADMIN_SECRET
  }
})
