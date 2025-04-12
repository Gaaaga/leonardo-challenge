'use client'

import { Box, Button, Heading, Text, VStack, Stack, useColorModeValue } from '@chakra-ui/react'
import { useUserInfo } from '@/context/UserInfoContext'
import { useUserModal } from '@/context/UserModalContext'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const { userInfo, clearUserInfo } = useUserInfo()
  const { open } = useUserModal()
  const router = useRouter()
  const cardBg = useColorModeValue('white', 'gray.800')

  const handleViewCharacters = () => {
    if (!userInfo) return
    router.push('/information/1')
  }

  return (
    <Box
      maxW="lg"
      mx="auto"
      mt={{ base: 8, md: 16 }}
      px={{ base: 4, md: 8 }}
      py={{ base: 6, md: 8 }}
      borderRadius="xl"
      boxShadow="lg"
      bg={cardBg}
    >
      <Heading mb={6} textAlign="center" size={{ base: 'md', md: 'lg' }}>
        {userInfo ? `Welcome, ${userInfo.username} 👋` : 'Welcome to Leonardo Challenge'}
      </Heading>

      {userInfo ? (
        <VStack spacing={4} align="stretch">
          <Box textAlign="center">
            <Text fontSize="md" color="gray.700">
              💼 <strong>Job:</strong> {userInfo.jobTitle}
            </Text>
          </Box>

          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Button onClick={open} minH="36px" colorScheme="blue" flex={1}>
              Edit Info
            </Button>
            <Button onClick={handleViewCharacters} minH="36px" colorScheme="teal" flex={1}>
              View Characters
            </Button>
            <Button
              onClick={clearUserInfo}
              minH="36px"
              colorScheme="red"
              variant="outline"
              flex={1}
            >
              Log Out
            </Button>
          </Stack>
        </VStack>
      ) : (
        <VStack spacing={5} textAlign="center">
          <Text fontSize="md" color="gray.600">
            You are not logged in yet.
          </Text>
          <Button onClick={open} colorScheme="blue" size="md">
            Enter Your Info
          </Button>
        </VStack>
      )}
    </Box>
  )
}
