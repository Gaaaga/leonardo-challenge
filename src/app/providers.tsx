'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { ApolloProvider } from '@apollo/client'
import client from '@/lib/apollo-client'
import { UserInfoProvider } from '@/context/UserInfoContext'
import { UserModalProvider } from '@/context/UserModalContext'
import { GlobalModals } from './GlobalModals'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <UserInfoProvider>
          <UserModalProvider>
            {children}
            <GlobalModals />
          </UserModalProvider>
        </UserInfoProvider>
      </ChakraProvider>
    </ApolloProvider>
  )
}
