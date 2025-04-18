import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) console.error('[GraphQL error]', graphQLErrors)
  if (networkError) console.error('[Network error]', networkError)
})

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
})

if (typeof window !== 'undefined') {
  console.log('GraphQL endpoint:', process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT)
}

const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
})

export default client
