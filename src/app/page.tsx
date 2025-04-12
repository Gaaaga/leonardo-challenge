'use client'

import { Box, Button, Heading, Text, HStack } from '@chakra-ui/react'
import { useUserInfo } from '@/context/UserInfoContext'
import { useUserModal } from '@/context/UserModalContext'

export default function HomePage() {
  const { userInfo, clearUserInfo } = useUserInfo()
  const { open } = useUserModal()

  return (
    <Box p={8}>
      <Heading mb={4}>Home</Heading>

      {userInfo ? (
        <Box>
          <Text mb={2}>👤 {userInfo.username}</Text>
          <Text mb={4}>💼 {userInfo.jobTitle}</Text>
          <HStack spacing={4}>
            <Button onClick={open} colorScheme="blue">
              Edit Info
            </Button>
            <Button onClick={clearUserInfo} colorScheme="red" variant="outline">
              Log Out
            </Button>
          </HStack>
        </Box>
      ) : (
        <Text color="gray.500">Not logged in</Text>
      )}
    </Box>
  )
}
