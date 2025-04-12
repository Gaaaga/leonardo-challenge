'use client'

import { useUserInfo } from '@/context/UserInfoContext'
import { Spinner, Center, Text } from '@chakra-ui/react'
import { useEffect, useState, ComponentType } from 'react'

export function withUserGuard<P extends Record<string, unknown>>(
  Component: ComponentType<P>
): ComponentType<P> {
  const Guarded = (props: P) => {
    const { userInfo } = useUserInfo()
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
      setHasMounted(true)
    }, [])

    if (!hasMounted) return null

    if (userInfo === null) {
      return (
        <Center py={20}>
          <Spinner size="lg" />
        </Center>
      )
    }

    if (!userInfo) {
      return (
        <Center py={20}>
          <Text color="gray.500" fontSize="lg">
            Please log in to view this page.
          </Text>
        </Center>
      )
    }

    return <Component {...props} />
  }

  Guarded.displayName = `WithUserGuard(${Component.displayName || Component.name || 'Component'})`
  return Guarded
}
